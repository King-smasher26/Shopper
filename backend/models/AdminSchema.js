const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        designation:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true,

    }
);

module.exports = mongoose.model("AdminInfoModel",AdminSchema,"Admins")