const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        ProductName:{
            type:String,
            required:true
        },
        ProductImg:{
            type:String,
            required:true

        },
        ProductId:{
            type:Number,
            required:true
        },
        productDescription:{
            type:String,
            required:true
        },
        Price:{
            type:Number,
            required:true
        },
        discountedPrice:{
            type:Number,
            required:true
        },
        sizes:{
            type:Array,
            required:true
        },
        tags:{
         type:Array,   
        },
        stockSize:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true,

    }
);

module.exports = mongoose.model("ProductsModel",productSchema,"MyProducts")