const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const MyProducts = require('./models/ProductsModel')
const cookieParser = require("cookie-parser")
const MyUsers = require('./models/UsersInfoModel')
const Orders = require('./models/OrderSchema')
const { createTokens, validateToken,validateAdmin ,createTokensAdmin } = require('./JWT')
const { analyzeProduct } = require('./ANALYZE')
const app = express();
const bcrypt = require('bcrypt')
const Admins = require('./models/AdminSchema')
const ProductsModel = require('./models/ProductsModel')
app.use(cors({ credentials: true, origin: `${process.env.Frontend_variable}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']},
));
// app.use(cors())
app.use(cookieParser());
// using cors
mongoose.connect(process.env.DB).then(() => console.log('database connected')).catch((e) => console.log(e))
app.use(express.json());
// login api


app.get('/', async (req, res) => {
    // try{
    //     const Users = await MyUsers.find({});
    //     return res.status(200).json({
    //         count:Users.length,
    //         data:Users
    //     })
    // }catch(e){
    //     console.log(e);
    //     res.status(500).send({message:e.message})
    // }
    res.send('HELLO WORLD')

})
app.post('/registration', async (req, res) => {
    console.log('registration hit')
    const { email, name, password } = req.body;
    const userexists = await MyUsers.findOne({ email: email });
    if (!(req.body.email && req.body.password && req.body.name)) {
        console.log('user already exists')
        return res.status(400).json(`enter all values`)
    } else if (userexists) {
        return res.status(400).json(`user already exists`)
    }
    else {
        bcrypt.hash(password, 10).then((hash) => {
            MyUsers.create({
                email: email,
                name: name,
                password: hash
            }).then(() => {
                res.status(200).json("User Registered")
                console.log(email, password, name)
            }).catch((err) => {
                if (err) {
                    res.status(400).json({ error: err })
                }
            })
        });
    }
})
app.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    console.log('login hit')
    if (!req.body.email ||
        !req.body.password
    ) {
        return res.status(400).json(`Enter email and password`)

    }
    MyUsers.findOne({ email: email }).then((user) => {
        if (user) {
            console.log('userfound')
            console.log(user)
            bcrypt.compare(password, user.password).then((match) => {
                if (!match) {
                    res.status(400).send("wrong password")
                }
                else {
                    console.log('password match')
                    const accessToken = createTokens(user)
                    res.cookie("access-token", accessToken, {
                        maxAge: 60 * 60 * 24 * 30 * 1000,
                        httpOnly: false,
                        secure: true, // For HTTPS
                        sameSite: 'none', // Important for cross-site requests
                        path: '/',
                    });
                    res.status(200).send('Logged in')
                }
            })
        }
        else {
            return res.status(200).json(`User not found here `)

        }
    }
    ).catch((e) => {
        return res.status(400).json(`Enter right email`)
        console.log(e)

    })

})

app.get('/Profile', validateToken, (req, res) => {
    res.json(req.user)
})
app.get('/AdminProfile', validateAdmin, (req, res) => {
    console.log(' we are at admin profile')
    res.json(req.admin)
})

// products api

// Get all Products
app.get('/products', async (req, res) => {
    try {
        const Products = await MyProducts.find({});
        return res.status(200).json({
            count: Products.length,
            data: Products
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message })
    }
})
app.get('/productsMen', async (req, res) => {
    try {
        const Products = await MyProducts.find({ tags: "Mens" });
        return res.status(200).json({
            count: Products.length,
            data: Products
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message })
    }
})
app.get('/productsWomen', async (req, res) => {
    try {
        const Products = await MyProducts.find({ tags: "Women" });
        return res.status(200).json({
            count: Products.length,
            data: Products
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message })
    }
})
app.get('/Kids', async (req, res) => {
    try {
        const Products = await MyProducts.find({ tags: "Kids" });
        return res.status(200).json({
            count: Products.length,
            data: Products
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message })
    }
})

app.get('/productStatus/:productid', async (req, res) => {
    const id = req.params;
    res.json({ id })
})
// Create a new Product
// app.post('/products', async (req, res) => {
//     async function createProduct() {
//         try {
//             const myProduct = new MyProducts({
//                 ProductName: "Office Shirt",
//                 ProductId: "33245",
//                 Price: 999,
//                 discountedPrice: 799,
//                 productDescription: "100% cotton office shirt",
//                 sizes: ["M", "S", "XXL"],
//                 tags: ["Mens", "Office"],
//                 stockSize: 280
//             })
//             await myProduct.save();
//             console.log(myProduct)
//         } catch (e) {
//             console.log(e)
//         }
//     }
//     createProduct()
//     return res.status(200).send(`Product created`)

// })

// Delete a Product

// app.delete('/products/:id', async (req, res) => {
//     try {

//         const { id } = req.params;
//         const result = await MyProducts.findByIdAndDelete(id);
//         if (!result) {
//             return res.status(400).send('Product not found')

//         }
//         return res.status(200).send('Product Deleted successfully')

//     } catch (e) {

//     }
// })


// product CRUD from admin

app.post('/products', async (req, res) => {
    try {
      // Validate required fields
      const requiredFields = ['ProductName', 'ProductImg', 'ProductId', 'productDescription', 'Price', 'discountedPrice', 'sizes', 'stockSize'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
      }
      
      // Check if product with same ProductId already exists
      const existingProduct = await ProductsModel.findOne({ ProductId: req.body.ProductId });
      if (existingProduct) {
        return res.status(409).json({ message: `Product with ID ${req.body.ProductId} already exists` });
      }
      
      // Create new product
      const newProduct = await ProductsModel.create(req.body);
      
      return res.status(201).json(newProduct);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e.message });
    }
  });
  
  // UPDATE a product
  app.put('/products/:id', validateAdmin,async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
      }
      
      // Check if product exists
      const existingProduct = await ProductsModel.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // If ProductId is being changed, check if the new ID already exists (except for the current product)
      if (req.body.ProductId && req.body.ProductId !== existingProduct.ProductId) {
        const duplicateProduct = await ProductsModel.findOne({ 
          ProductId: req.body.ProductId,
          _id: { $ne: id }
        });
        
        if (duplicateProduct) {
          return res.status(409).json({ message: `Product with ID ${req.body.ProductId} already exists` });
        }
      }
      
      // Update the product
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      
      return res.status(200).json(updatedProduct);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e.message });
    }
  });
  
  // DELETE a product
  app.delete('/products/:id', validateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
      }
      
      // Check if product exists
      const product = await ProductsModel.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Delete the product
      await ProductsModel.findByIdAndDelete(id);
      
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e.message });
    }
  });  


// app.get('/createorder', async (req, res) => {
//     try {
//         const myorder = {
//             // OrderId:"34512",
//             ProductId: "3",
//             CustomerEmail: "wala22@gmail.com",
//             CustomerAddress: "mohali ,Punjab",
//             SellingPrice: "1199",
//             Size: "L",
//             AmountBought: 1
//         }
//         const order = Orders(myorder)
//         await order.save();
//         console.log('order saved', order)
//         res.status(200).json({ order })
//     } catch (e) {
//         console.log(e)
//         res.status(500).send({ message: e.message })


//     }
// })

app.get('/ProductAnalysis/:ProductId', validateAdmin, async (req, res) => {
    try {
        console.log('middleware verified')
        const Pid = req.params.ProductId;
        const data = await analyzeProduct(Pid);
        res.status(200).json(data)

    } catch (e) {
        res.status(400).json(e)

    }
})
app.get('/ProductAnalysis', async (req, res) => {
    try {
        const currProduct = await MyProducts.find({ stockSize: { $lt: 300 } });


        if (!currProduct) {
            res.status(400).json("no product found")

        }
        else {
            res.status(200).json(currProduct)

        }
    } catch (e) {
        res.status(401).json(e)

    }
})
app.get('/LowStock', async (req, res) => {
    try {
        const LowStock = await MyProducts.find({ stockSize: { $lt: 25 } });


        if (!LowStock) {
            res.status(400).json("no product found")

        }
        else {
            const LowStockItems = {
                count: LowStock.length,
                data: LowStock
            }
            res.status(200).json(LowStockItems)

        }
    } catch (e) {
        res.status(401).json(e)

    }
})

app.post('/registerAdmin',validateAdmin, async (req, res) => {
    console.log('admin registration hit')
    const { email, name, password } = req.body;
    const userexists = await Admins.findOne({ email: email });
    if (!(req.body.email && req.body.password && req.body.name)) {
        return res.status(400).json(`enter all values`)
    } else if (userexists) {
        return res.status(400).json(`user already exists`)
    }
    else {
        bcrypt.hash(password, 10).then((hash) => {
            Admins.create({
                email: email,
                name: name,
                password: hash
            }).then(() => {
                res.status(200).json("User Registered")
                console.log(email, password, name)
            }).catch((err) => {
                if (err) {
                    res.status(400).json({ error: err })
                }
            })
        });
    }

})


app.post('/LoginAdmin', async (req, res) => {
    const { email, password } = req.body;
    console.log('login hit')
    if (!req.body.email ||
        !req.body.password
    ) {
        return res.status(400).json(`Enter email and password`)
    }

    Admins.findOne({ email: email }).then((user) => {
        if (user) {
            console.log('userfound')
            bcrypt.compare(password, user.password).then((match) => {
                if (!match) {
                    res.status(400).send("wrong password")
                }
                else {
                    console.log('password match')
                    const accessToken = createTokensAdmin(user)
                    res.cookie("access-token", accessToken, {
                        maxAge: 60 * 60 * 24 * 30 * 1000,
                        httpOnly: false,
                        secure: true, // For HTTPS
                        sameSite: 'none', // Important for cross-site requests
                        path: '/',
                    });
                    res.status(200).send('Logged in')
                }
            })
        }
        else {
            return res.status(200).json(`User not found here `)

        }
    }
    ).catch((e) => {
        return res.status(400).json(`Enter right email`)
        console.log(e)
    })

})
app.get('/getAdmins', async (req, res) => {
    try {
        // Find all admins but don't return the password field
        const adminList = await Admins.find({}, { password: 0 });
        return res.status(200).json(adminList);
    } catch (error) {
        console.error('Error fetching admins:', error);
        return res.status(500).json({ error: 'Failed to fetch admins' });
    }
});
app.post('/setAdmins', async (req, res) => {
    const { name, email, designation, password } = req.body;
    
    // Validate required fields
    if (!name || !email || !designation || !password) {
        return res.status(400).json({ error: 'Please provide name, email, designation, and password' });
    }
    
    try {
        // Check if admin with this email already exists
        const existingAdmin = await Admins.findOne({ email: email });
        
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new admin
        const newAdmin = new Admins({
            name,
            email,
            designation,
            password: hashedPassword
        });
        
        // Save the admin to database
        await newAdmin.save();
        
        return res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).json({ error: 'Failed to register admin' });
    }
});


app.listen(5000, () => {


    console.log(`App is listening at 5000`)
})




