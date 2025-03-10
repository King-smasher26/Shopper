const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        // orderHistory:{
        //     type:Array,
        //     OrderId:{
        //         type:String,
        //         required:true
        //     },
        //     ProductId:{
        //         type:Number,
        //         required:true
        //     },
        //     SellingPrice:{
        //         type:Number,
        //         required:true
        //     },
        //     size:{
        //         type:String,
        //         required:true
        //     },
        //     AmountBought:{
        //         type:Number,
        //         required:true
        //     }
            
        // }
    },
    {
        timestamps:true,

    }
);

module.exports = mongoose.model("UsersInfoModel",userSchema,"MyUsers")