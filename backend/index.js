const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const MyProducts = require('./models/ProductsModel')
const MyUsers = require('./models/UsersInfoModel')
const app = express();
// using cors
const DB='mongodb+srv://yoab100203:oDvzreSjvyoNWByj@cluster0.6u58haf.mongodb.net/ecommerse?retryWrites=true&w=majority'; 
mongoose.connect(DB).then(()=>console.log('database connected')).catch((e)=>console.log(e))
app.use(express.json());
app.use(cors());

// login api


app.get('/',async (req,res)=>{
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
app.post('/registration',async (req,res)=>{
    const {email}= req.body;
    const userexists = await MyUsers.findOne({email:email});
    if(!req.body.email||
        !req.body.password
        ){
            return res.status(400).json(`enter all values`)
        }
        else if(userexists){
            return res.status(400).json(`user already exists`)
        }
        else{

            async function createUser(){
                try{
                    const myuser = new MyUsers({email:req.body.email,password:req.body.password}) 
                    await myuser.save();
                    console.log(myuser)
                }catch(e){
                    console.log(e)
                }
            }
            createUser()
            return res.status(200).send(`user created`)
        }
        
    })
    app.get('/login',async (req,res)=>{
        const {email,password}= req.body;
        
        if(!req.body.email||
            !req.body.password
            ){
                return res.status(400).json(`Enter email and password`)
                
            }
            
            MyUsers.findOne({email:email}).then((user)=>{
                if(user){
                    if(user.password==password){
                        
                        return res.status(200).json(`User found here `)
                    }
                    else{
                        
                        return res.status(200).json(`User found here but password doesn't match`)
                    }
                }
                else{
                    return res.status(200).json(`User not found here `)
                    
                }
            }
            ).catch((e)=>{
                return res.status(400).json(`Enter right email`)
                console.log(e)
                
            })
            
        })

        // products api

        // Get all Products
        app.get('/products',async (req,res)=>{
            try{
                const Products = await MyProducts.find({});
                return res.status(200).json({
                    count:Products.length,
                    data:Products
                })
            }catch(e){
                console.log(e);
                res.status(500).send({message:e.message})
            }            
        })

        // Create a new Product
        app.post('/products',async (req,res)=>{
    
    
            if(!req.body.email||
                !req.body.password
                ){
                    return res.status(400).json(`enter all values`)
                }
                async function createUser(){
                    try{
                        const myProduct = new MyProducts({ProductName:req.body.ProductName,Price:req.body.Price,discount:req.body.discount,availability:req.body.availability,productDescription:req.body.productDescription
                        }) 
                        await myProduct.save();
                        console.log(myProduct)
                    }catch(e){
                        console.log(e)
                    }
                }
                createUser()
                return res.status(200).send(`Product created`)
                
            })

            // Delete a Product

            app.delete('/products/:id',async (req,res)=>{
                try{
                        
                        const {id}=req.params;
                        const result = await MyProducts.findByIdAndDelete(id);
                        if(!result){
                            return res.status(400).send('Product not found')
                            
                        }
                        return res.status(200).send('Product Deleted successfully')
                        
            }catch(e){
                console.log(e)
                res.status(500).send({message:e.message})
        
            }
        })


        app.listen(5000,()=>{

    
    console.log(`App is listening at 5000`)
})




