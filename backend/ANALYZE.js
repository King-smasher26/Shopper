const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();
const moment = require('moment');
const User = require('./models/UsersInfoModel');
const Orders = require('./models/OrderSchema');
const Produts = require('./models/ProductsModel');
const dateFrom7 = moment(Date.now()).subtract(0,'months').format('YYYY-MM-DD'); 
const dateFrom6 = moment(Date.now() - 1 * 24 * 3600 * 1000).subtract(0,'months').format('YYYY-MM-DD'); 
const dateFrom5 = moment(Date.now() - 2 * 24 * 3600 * 1000).subtract(0,'months').format('YYYY-MM-DD'); 
const dateFrom4 = moment(Date.now() - 3 * 24 * 3600 * 1000).subtract(0,'months').format('YYYY-MM-DD'); 
const dateFrom3 = moment(Date.now() - 4 * 24 * 3600 * 1000).subtract(0,'months').format('YYYY-MM-DD'); 
const dateFrom2 = moment(Date.now() - 5 * 24 * 3600 * 1000).subtract(0,'months').format('YYYY-MM-DD'); 
const dateFrom1 = moment(Date.now() - 6 * 24 * 3600 * 1000).subtract(0,'months').format('YYYY-MM-DD'); 
const today = moment().startOf('day');
const todayFormatted = moment(today).format("YYYY-MM-DD")
// const dateFrom7 = moment(Date.now() - 7 * 24 * 3600 * 1000).subtract(1,'months').format('YYYY-MM-DD'); 

const newarray=[];
newarray.push(dateFrom1,dateFrom2,dateFrom3,dateFrom4,dateFrom5,dateFrom6,dateFrom7)
console.log(newarray)
async function analyzeProduct(ProductId){
    console.log('date searching at between',dateFrom4,dateFrom3)
    console.log('productId recieved',ProductId)
    const productAnalysis=[];
    // const order = await Orders.find({createdAt : { $gte : new Date(2024,4,26),$lt : new Date(2024,4,27)}, ProductId:ProductId});
    const day1 = await Orders.find({createdAt : { $gte : new Date(dateFrom1),$lt : new Date(dateFrom2)}, ProductId:ProductId});
    const day2 = await Orders.find({createdAt : { $gte : new Date(dateFrom2),$lt : new Date(dateFrom3)}, ProductId:ProductId});
    const day3 = await Orders.find({createdAt : { $gte : new Date(dateFrom3),$lt : new Date(dateFrom4)}, ProductId:ProductId});
    const day4 = await Orders.find({createdAt : { $gte : new Date(dateFrom4),$lt : new Date(dateFrom5)}, ProductId:ProductId});
    const day5 = await Orders.find({createdAt : { $gte : new Date(dateFrom5),$lt : new Date(dateFrom6)}, ProductId:ProductId});
    const day6 = await Orders.find({createdAt : { $gte : new Date(dateFrom6),$lt : new Date(dateFrom7)}, ProductId:ProductId});
    const day7 = await Orders.find({createdAt : { $gte : today.toDate(),$lt : moment(today).endOf('day').toDate()}, ProductId:ProductId});

    let sum1=0;
    let sum2=0;
    let sum3=0;
    let sum4=0;
    let sum5=0;
    let sum6=0;
    let sum7=0;
    day1.map((obj)=>{
        sum1=sum1+obj.AmountBought;
        console.log(obj.AmountBought)
        return sum1;
    })
    day2.map((obj)=>{
        sum2=sum2+obj.AmountBought;
        console.log(obj.AmountBought)
        return sum2;
    })
    day3.map((obj)=>{
        sum3=sum3+obj.AmountBought;
        console.log(obj.AmountBought)
        return sum3;
    })
    day4.map((obj)=>{
        sum4=sum4+obj.AmountBought;
        console.log(obj.AmountBought)
        return sum4;
    })
    day5.map((obj)=>{
        sum5=sum5+obj.AmountBought;
        console.log(obj.AmountBought)
        return sum5;
    })
    day6.map((obj)=>{
        sum6=sum6+obj.AmountBought;
        console.log(obj.AmountBought)
        return sum6;
    })
    day7.map((obj)=>{
        sum7=sum7+obj.AmountBought;
        console.log(obj.AmountBought)
        return sum7;
    })
    console.log(sum1,)
    const myanalysis = [
        {date:dateFrom1,count:sum1},
        {date:dateFrom2,count:sum2},
        {date:dateFrom3,count:sum3},
        {date:dateFrom4,count:sum4},
        {date:dateFrom5,count:sum5},
        {date:dateFrom6,count:sum6},
        {date:todayFormatted,count:sum7},

    ]

    console.log(dateFrom1)
    console.log('the analysis is ',myanalysis)
    return myanalysis;
    // console.log(order);

}
module.exports = {analyzeProduct}