// const mongoose = require('mongoose');

// const OrderSchema = mongoose.Schema(
//     {
//         ProductId:{
//             type:Number,
//             required:true
//         },
//         CustomerEmail:{
//             type:String,
//             required:true
//         },
//         CustomerAddress:{
//             type:String,
//             required:true
//         },
//         SellingPrice:{
//             type:Number,
//             required:true
//         },
//         Size:{
//             type:String,
//             required:true
//         },
//         AmountBought:{
//             type:Number,
//             required:true
//         }
//     },
//     {
//         timestamps:true,

//     }
// );

// module.exports = mongoose.model("OrderSchema",OrderSchema,"Orders")
const mongoose = require('mongoose');

// Schema for address information
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  }
});

// Schema for individual order items
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  size: {
    type: String,
    required: false
  },
  productImg: {
    type: String,
    required: false
  }
});

// Main order schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      email: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: false
      }
    },
    items: [orderItemSchema],
    shippingAddress: addressSchema,
    payment: {
      method: {
        type: String,
        default: 'razorpay'
      },
      amount: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        default: 'INR'
      },
      razorpayOrderId: {
        type: String,
        required: false
      },
      razorpayPaymentId: {
        type: String,
        required: false
      },
      razorpaySignature: {
        type: String,
        required: false
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
      }
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);