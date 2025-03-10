import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WarningIcon from '@mui/icons-material/Warning';
import "./Analyze.css";

const Analyze = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [loadingChart, setLoadingChart] = useState(false);

  axios.defaults.withCredentials = true;

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: selectedProduct ? `Order Analysis for ${selectedProduct.ProductName}` : 'Product Analysis',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Order Count',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    p: 4
  };

  // Load products on component mount
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

  const fetchProductAnalysis = async (product) => {
    setSelectedProduct(product);
    setOpen(true);
    setLoadingChart(true);
    setChartData(null);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/ProductAnalysis/${product.ProductId}`);
      
      if (response.data.length > 0) {
        setChartData({
          labels: response.data.map(obj => obj.date),
          datasets: [{
            label: "Orders",
            data: response.data.map(obj => obj.count),
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.5)',
            borderWidth: 2,
            pointBackgroundColor: '#2980b9',
            pointRadius: 4,
            tension: 0.2,
            fill: true
          }]
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingChart(false);
    }
  };

  const handleClose = () => setOpen(false);

  const getStockLevelClass = (stockSize) => {
    if (stockSize < 10) return 'critical-stock';
    if (stockSize < 25) return 'low-stock';
    if (stockSize > 100) return 'high-stock';
    return 'normal-stock';
  };

  return (
    <div className="analyze-content">
      <div className="analyze-header">
        <div className="header-content">
          <AnalyticsIcon className="header-icon" />
          <h1>Product Analysis Dashboard</h1>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<RefreshIcon />}
          onClick={fetchProducts}
          disabled={loading}
        >
          Refresh
        </Button>
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
            <p>Showing {products.length} products. Click "Analyze" to view order trends.</p>
          </div>
          
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.ProductId}>
                    <td style={{ color: '#2c3e50', fontWeight: '500' }}>{product.ProductId}</td>
                    <td style={{ color: '#333', fontWeight: '500' }}>{product.ProductName}</td>
                    <td>
                      <span className={`stock-badge ${getStockLevelClass(product.stockSize)}`}>
                        {product.stockSize}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => fetchProductAnalysis(product)}
                      >
                        Analyze
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="product-analysis-modal"
      >
        <Box sx={modalStyle}>
          <div className="modal-header">
            <Typography variant="h6" component="h2">
              {selectedProduct ? `Analysis for ${selectedProduct.ProductName}` : 'Product Analysis'}
            </Typography>
            <Button variant="outlined" onClick={handleClose}>Close</Button>
          </div>
          
          <div className="chart-container">
            {loadingChart ? (
              <div className="loading-container">
                <CircularProgress />
                <p>Loading chart data...</p>
              </div>
            ) : chartData ? (
              <Line options={options} data={chartData} height={300} />
            ) : (
              <div className="no-data-container">
                <WarningIcon fontSize="large" />
                <Typography variant="body1">
                  No order data available for this product.
                </Typography>
              </div>
            )}
          </div>
          
          {selectedProduct && (
            <div className="product-details">
              <Typography variant="subtitle1">
                <strong>ID:</strong> {selectedProduct.ProductId}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Stock Level:</strong> {selectedProduct.stockSize} units
                {selectedProduct.stockSize < 25 && (
                  <span className="stock-warning">Low stock warning!</span>
                )}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Analyze;