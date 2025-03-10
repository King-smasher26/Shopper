const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        ProductId:{
            type:Number,
            required:true
        },
        CustomerEmail:{
            type:String,
            required:true
        },
        CustomerAddress:{
            type:String,
            required:true
        },
        SellingPrice:{
            type:Number,
            required:true
        },
        Size:{
            type:String,
            required:true
        },
        AmountBought:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true,

    }
);

module.exports = mongoose.model("OrderSchema",OrderSchema,"Orders")