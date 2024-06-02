import React , {createContext, useEffect} from "react"
import all_product from "../Components/Images/all_product"
import { useState, useMemo } from "react";
import axios, { all } from "axios";
export const ShopContext = createContext(null);


const getDefaultCart = () => {
    let cart = {};
    for(let index = 0; index < all_product.length+1 ; index++){
        cart[index]= 0;
    }
    return cart;
}



const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [size, setSize] = useState();
    const [arr, setArr] = useState([]);
    let [productDataArray, setProductDataArray] = useState([]);
    // let [popularWomenArray, setPopularWomenArray] = useState([]);



  const [productItemArray,setProductItemArray]=useState([]);
  axios.defaults.withCredentials = true;

  useMemo(()=>{
    return sendreq();
  },[])


  async function sendreq(){
    setProductItemArray( await axios.get('http://localhost:5000/products').then((res)=>{
      console.log(res.data.data)
      getProductApiArray(res.data.data);
      return res.data.data;
    }).catch((e)=>{
      alert('an error has occured')
      console.log(e)
    }))
  }

//   {console.log(productItemArray)}


let allProductArrayData ;
const getAllProductData=(productId)=>{
    allProductArrayData = [...productDataArray];
    console.log(allProductArrayData);
    return allProductArrayData;
}


  let popularWomenArray ;
  const getPopularWomenData=()=>{
    popularWomenArray = [...productItemArray];
    // console.log(popularWomenArray);
    popularWomenArray = popularWomenArray.filter((currElem, index)=>{
        if(currElem.tags[0] === "Women" && currElem.ProductId % 2==0){
            return currElem;
        };
    })
    console.log(popularWomenArray);
    return popularWomenArray;
  }




  let newCollectionArray ;
  const getNewCollectionData=()=>{
    newCollectionArray = [...productItemArray];

    newCollectionArray = newCollectionArray.filter((currElem, index)=>{
        if(currElem.ProductId % 5 === 0){
            return currElem;
        }
    })
    console.log(newCollectionArray);
    return newCollectionArray;
  }

  
    const getProductApiArray=(productArray)=>{
        console.log(productArray);
        setProductDataArray([...productArray]);
        // return [...productDataArray]
    }


    // {console.log(productDataArray)}

    const addToCart = (productItem, size) => {
        setCartItems([...cartItems, {...productItem, size}]);
        return cartItems;
    }

    let cartInfo;
    const cartInfoSection=()=>{
        cartInfo = [...cartItems];
        console.log(cartInfo);
        return cartInfo;
    }
    
    
    console.log(cartItems);


    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter((currElem)=>{
            return currElem._id !== itemId;
        }))
        console.log(cartItems);
    }

    const cartArrayLength=()=>{
        console.log(cartItems.length);
        return cartItems.length;
    }


// This is the function for the cart count 
    const getTotalCartItems=()=>{
        console.log(cartItems);
       let total = cartItems.reduce((accum, currElem)=>{
            return accum + currElem.discountedPrice;
       }, 0)

       console.log(total);
       return total
    }

    
    const getSizeFunction=(val)=>{
            setSize(val);
            return size;
    }


// This is the function for the total amount of the cart 
    // const getTotalCartAmount = ()=>{
    //     let totalAmount = 0;
    //     for ( const item in cartItems)
    //     {
    //         if(cartItems[item]>0)
    //         {
    //             let itemInfo = all_product.find((product)=>product.id===Number(item))
    //             totalAmount += itemInfo.new_price * cartItems[item];
    //         }
    //     }
    //     return totalAmount;
    // }

    let obj = {
        email : "abc123@gmail.com",
        address : "142 Street",
        productInfo : {},
    }

    console.log(obj);

    const getProductInfo=(val)=>{
        setArr([...arr, val])
        console.log(arr);
    //     obj.productInfo = [...arr];
    // // //    setArr(arr=> [...arr, val]);
    }
    
    
    const contextValue = {getTotalCartItems, all_product, cartItems, addToCart, removeFromCart, getTotalCartItems, getSizeFunction, getProductInfo, getProductApiArray, getPopularWomenData, getNewCollectionData, getAllProductData, cartInfoSection, cartArrayLength};

    return(
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;