import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Button, 
  CircularProgress, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import LabelIcon from '@mui/icons-material/Label';
import "./ProductsAdmin.css";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    ProductName: '',
    ProductImg: '',
    ProductId: '',
    productDescription: '',
    Price: 0,
    discountedPrice: 0,
    sizes: [],
    tags: [],
    stockSize: 0
  });

  // Available sizes and tags for dropdowns
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableTags = ['New', 'Sale', 'Popular', 'Limited', 'Exclusive', 'Trending', 'Casual', 'Formal'];

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Delete confirmation state
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    productId: null
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert to number for numeric fields
    let parsedValue = value;
    if (name === 'stockSize' || name === 'Price' || name === 'discountedPrice' || name === 'ProductId') {
      parsedValue = parseFloat(value) || 0;
    }
    
    setCurrentProduct({
      ...currentProduct,
      [name]: parsedValue
    });
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (e, field) => {
    setCurrentProduct({
      ...currentProduct,
      [field]: e.target.value
    });
  };

  // Open dialog for creating a new product
  const handleAddNew = () => {
    setCurrentProduct({
      ProductName: '',
      ProductImg: '',
      ProductId: generateRandomId(),
      productDescription: '',
      Price: 0,
      discountedPrice: 0,
      sizes: [],
      tags: [],
      stockSize: 0
    });
    setIsEditing(false);
    setOpen(true);
  };

  // Generate a random ID between 1000-9999 for new products
  const generateRandomId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  // Open dialog for editing an existing product
  const handleEdit = (product) => {
    setCurrentProduct({
      _id: product._id, // Make sure to include the ID for updates
      ProductName: product.ProductName,
      ProductImg: product.ProductImg,
      ProductId: product.ProductId,
      productDescription: product.productDescription,
      Price: product.Price,
      discountedPrice: product.discountedPrice,
      sizes: product.sizes || [],
      tags: product.tags || [],
      stockSize: product.stockSize
    });
    setIsEditing(true);
    setOpen(true);
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['ProductName', 'ProductImg', 'ProductId', 'productDescription', 'Price', 'discountedPrice', 'stockSize'];
    const missingFields = requiredFields.filter(field => !currentProduct[field]);
    
    if (missingFields.length > 0 || currentProduct.sizes.length === 0) {
      setNotification({
        open: true,
        message: 'Please fill in all required fields and select at least one size',
        severity: 'error'
      });
      return;
    }

    try {
      if (isEditing) {
        // Update existing product
        await axios.put(`${process.env.REACT_APP_API_URL}/products/${currentProduct._id}`, currentProduct);
        setNotification({
          open: true,
          message: 'Product updated successfully!',
          severity: 'success'
        });
      } else {
        // Create new product
        await axios.post(`${process.env.REACT_APP_API_URL}/products`, currentProduct);
        setNotification({
          open: true,
          message: 'Product created successfully!',
          severity: 'success'
        });
      }
      
      setOpen(false);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: `Error: ${err.response?.data?.message || 'Something went wrong'}`,
        severity: 'error'
      });
    }
  };

  // Open delete confirmation dialog
  const handleDeleteConfirm = (productId) => {
    setDeleteDialog({
      open: true,
      productId
    });
  };

  // Handle product deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${deleteDialog.productId}`);
      setNotification({
        open: true,
        message: 'Product deleted successfully!',
        severity: 'success'
      });
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: `Error: ${err.response?.data?.message || 'Something went wrong'}`,
        severity: 'error'
      });
    }
    setDeleteDialog({ open: false, productId: null });
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Close notification
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // Get CSS class based on stock level
  const getStockLevelClass = (stockSize) => {
    if (stockSize < 10) return 'critical-stock';
    if (stockSize < 25) return 'low-stock';
    if (stockSize > 100) return 'high-stock';
    return 'normal-stock';
  };

  // Calculate discount percentage
  const calculateDiscount = (original, discounted) => {
    if (!original || !discounted || original <= discounted) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="products-content">
      <div className="products-header">
        <div className="header-content">
          <InventoryIcon className="header-icon" />
          <h1>Product Management</h1>
        </div>
        <div className="header-actions">
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<AddIcon />}
            onClick={handleAddNew}
          >
            Add Product
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={fetchProducts}
            disabled={loading}
          >
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <WarningIcon />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          <div className="products-info">
            <p>Showing {products.length} products. Manage your product inventory below.</p>
          </div>
          
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Sizes</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.ProductId}</td>
                      <td>
                        <div className="product-img-container">
                          <img 
                            src={product.ProductImg} 
                            alt={product.ProductName} 
                            className="product-thumbnail"
                            onError={(e) => {
                              e.target.src = "/placeholder-image.jpg";
                              e.target.alt = "Image not available";
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="product-name">
                          {product.ProductName}
                          {calculateDiscount(product.Price, product.discountedPrice) > 0 && (
                            <span className="discount-badge">
                              {calculateDiscount(product.Price, product.discountedPrice)}% OFF
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`stock-badge ${getStockLevelClass(product.stockSize)}`}>
                          {product.stockSize}
                        </span>
                      </td>
                      <td>
                        <div className="price-container">
                          <span className="current-price">₹{product.discountedPrice.toFixed(2)}</span>
                          {product.discountedPrice < product.Price && (
                            <span className="original-price">${product.Price.toFixed(2)}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="sizes-container">
                          {product.sizes && product.sizes.map(size => (
                            <span key={size} className="size-chip">{size}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="tags-container">
                          {product.tags && product.tags.map(tag => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small" 
                              icon={<LabelIcon />} 
                              className="tag-chip"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="actions-cell">
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEdit(product)}
                          title="Edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteConfirm(product._id)}
                          title="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No products found. Click "Add Product" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <div className="form-grid">
            <TextField
              autoFocus
              margin="dense"
              name="ProductName"
              label="Product Name"
              type="text"
              fullWidth
              variant="outlined"
              value={currentProduct.ProductName}
              onChange={handleInputChange}
              required
            />
            
            <TextField
              margin="dense"
              name="ProductImg"
              label="Product Image URL"
              type="text"
              fullWidth
              variant="outlined"
              value={currentProduct.ProductImg}
              onChange={handleInputChange}
              required
              helperText="Enter a valid image URL"
            />
            
            <TextField
              margin="dense"
              name="ProductId"
              label="Product ID"
              type="number"
              fullWidth
              variant="outlined"
              value={currentProduct.ProductId}
              onChange={handleInputChange}
              required
              inputProps={{ min: 1 }}
              disabled={isEditing}
            />
            
            <TextField
              margin="dense"
              name="stockSize"
              label="Stock Size"
              type="number"
              fullWidth
              variant="outlined"
              value={currentProduct.stockSize}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0 }}
            />
            
            <TextField
              margin="dense"
              name="Price"
              label="Original Price"
              type="number"
              fullWidth
              variant="outlined"
              value={currentProduct.Price}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0, step: 0.01 }}
            />
            
            <TextField
              margin="dense"
              name="discountedPrice"
              label="Discounted Price"
              type="number"
              fullWidth
              variant="outlined"
              value={currentProduct.discountedPrice}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0, step: 0.01 }}
              helperText={`Discount: ${calculateDiscount(currentProduct.Price, currentProduct.discountedPrice)}%`}
            />
            
            <FormControl fullWidth margin="dense" required>
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                multiple
                value={currentProduct.sizes}
                onChange={(e) => handleMultiSelectChange(e, 'sizes')}
                input={<OutlinedInput label="Sizes" />}
                renderValue={(selected) => (
                  <div className="chip-container">
                    {selected.map((value) => (
                      <Chip key={value} label={value} className="form-chip" />
                    ))}
                  </div>
                )}
              >
                {availableSizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    <Checkbox checked={currentProduct.sizes.indexOf(size) > -1} />
                    <ListItemText primary={size} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="dense">
              <InputLabel id="tags-label">Tags</InputLabel>
              <Select
                labelId="tags-label"
                multiple
                value={currentProduct.tags}
                onChange={(e) => handleMultiSelectChange(e, 'tags')}
                input={<OutlinedInput label="Tags" />}
                renderValue={(selected) => (
                  <div className="chip-container">
                    {selected.map((value) => (
                      <Chip key={value} label={value} icon={<LabelIcon />} className="form-chip" />
                    ))}
                  </div>
                )}
              >
                {availableTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={currentProduct.tags.indexOf(tag) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              margin="dense"
              name="productDescription"
              label="Product Description"
              type="text"
              fullWidth
              variant="outlined"
              value={currentProduct.productDescription}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              className="full-width-field"
            />
          </div>
          
          {currentProduct.ProductImg && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img 
                src={currentProduct.ProductImg} 
                alt="Preview" 
                className="preview-image"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                  e.target.alt = "Invalid image URL";
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ ...deleteDialog, open: false })} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleNotificationClose} 
          severity={notification.severity} 
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductsAdmin;