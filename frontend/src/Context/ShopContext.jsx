// import React, { createContext, useEffect, useState, useMemo } from "react";
// import all_product from "../Components/Images/all_product";
// import axios from "axios";
// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < all_product.length + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

// const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [size, setSize] = useState();
//   const [arr, setArr] = useState([]);
//   const [productDataArray, setProductDataArray] = useState([]);
//   const [productItemArray, setProductItemArray] = useState([]);
//   const [profileData, setProfileData] = useState(null); // Add state for profile data

//   axios.defaults.withCredentials = true;

//   // Fetch products
//   useMemo(() => {
//     return sendreq();
//   }, []);

//   async function sendreq() {
//     console.log('fetching products')
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
//       console.log(res.data.data);
//       getProductApiArray(res.data.data);
//       return setProductItemArray(res.data.data);
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   // Function to update profile data from any component
//   const updateProfileData = (data) => {
//     console.log("Updating profile data in context:", data);
//     setProfileData(data);
//   };

//   let allProductArrayData;
//   const getAllProductData = () => {
//     allProductArrayData = [...productDataArray];
//     console.log(allProductArrayData);
//     return allProductArrayData;
//   };

//   let popularWomenArray;
//   const getPopularWomenData = () => {
//     popularWomenArray = [...productItemArray];
//     popularWomenArray = popularWomenArray.filter((currElem) => {
//       if (currElem.tags[0] === "Women" && currElem.ProductId % 2 == 0) {
//         return currElem;
//       }
//     });
//     console.log(popularWomenArray);
//     return popularWomenArray;
//   };

//   let newCollectionArray;
//   const getNewCollectionData = () => {
//     newCollectionArray = [...productItemArray];
//     newCollectionArray = newCollectionArray.filter((currElem) => {
//       if (currElem.ProductId % 5 === 0) {
//         return currElem;
//       }
//     });
//     console.log(newCollectionArray);
//     return newCollectionArray;
//   };

//   const getProductApiArray = (productArray) => {
//     console.log(productArray);
//     setProductDataArray([...productArray]);
//   };

//   const addToCart = (productItem, size) => {
//     setCartItems([...cartItems, { ...productItem, size }]);
//     return cartItems;
//   };

//   let cartInfo;
//   const cartInfoSection = () => {
//     cartInfo = [...cartItems];
//     console.log(cartInfo);
//     return cartInfo;
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems(
//       cartItems.filter((currElem) => {
//         return currElem._id !== itemId;
//       })
//     );
//     console.log(cartItems);
//   };

//   const cartArrayLength = () => {
//     console.log(cartItems.length);
//     return cartItems.length;
//   };

//   const getTotalCartItems = () => {
//     console.log(cartItems);
//     let total = cartItems.reduce((accum, currElem) => {
//       return accum + currElem.discountedPrice;
//     }, 0);
//     console.log(total);
//     return total;
//   };

//   const getSizeFunction = (val) => {
//     setSize(val);
//     return size;
//   };

//   const getProductInfo = (val) => {
//     setArr([...arr, val]);
//     console.log(arr);
//   };

//   // Include profileData and the update function in the context value
//   const contextValue = {
//     getTotalCartItems,
//     all_product,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getSizeFunction,
//     getProductInfo,
//     getProductApiArray,
//     getPopularWomenData,
//     getNewCollectionData,
//     getAllProductData,
//     cartInfoSection,
//     cartArrayLength,
//     profileData, // Add the profile data to the context
//     updateProfileData, // Add the function to update profile data
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import React, { createContext, useEffect, useState, useMemo } from "react";
import all_product from "../Components/Images/all_product";
import axios from "axios";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [size, setSize] = useState();
  const [arr, setArr] = useState([]);
  const [productDataArray, setProductDataArray] = useState([]);
  const [productItemArray, setProductItemArray] = useState([]);
  const [profileData, setProfileData] = useState(null); // State for profile data

  axios.defaults.withCredentials = true;

  // Fetch products
  useMemo(() => {
    return sendreq();
  }, []);

  // Fetch profile data on initial load
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`);
        console.log("Profile data fetched in context:", response.data);
        setProfileData(response.data);
      } catch (error) {
        console.log("Error fetching profile in context:", error);
        setProfileData(null);
      }
    };
    
    fetchProfileData();
  }, []); // Empty dependency array means this runs once when provider mounts

  async function sendreq() {
    console.log('fetching products')
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      console.log(res.data.data);
      getProductApiArray(res.data.data);
      return setProductItemArray(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  // Function to update profile data from any component
  const updateProfileData = (data) => {
    console.log("Updating profile data in context:", data);
    setProfileData(data);
  };

  let allProductArrayData;
  const getAllProductData = () => {
    allProductArrayData = [...productDataArray];
    console.log(allProductArrayData);
    return allProductArrayData;
  };

  let popularWomenArray;
  const getPopularWomenData = () => {
    popularWomenArray = [...productItemArray];
    popularWomenArray = popularWomenArray.filter((currElem) => {
      if (currElem.tags[0] === "Women" && currElem.ProductId % 2 == 0) {
        return currElem;
      }
    });
    console.log(popularWomenArray);
    return popularWomenArray;
  };

  let newCollectionArray;
  const getNewCollectionData = () => {
    newCollectionArray = [...productItemArray];
    newCollectionArray = newCollectionArray.filter((currElem) => {
      if (currElem.ProductId % 5 === 0) {
        return currElem;
      }
    });
    console.log(newCollectionArray);
    return newCollectionArray;
  };

  const getProductApiArray = (productArray) => {
    console.log(productArray);
    setProductDataArray([...productArray]);
  };

  const addToCart = (productItem, size) => {
    setCartItems([...cartItems, { ...productItem, size }]);
    return cartItems;
  };

  let cartInfo;
  const cartInfoSection = () => {
    cartInfo = [...cartItems];
    console.log(cartInfo);
    return cartInfo;
  };

  const removeFromCart = (itemId) => {
    setCartItems(
      cartItems.filter((currElem) => {
        return currElem._id !== itemId;
      })
    );
    console.log(cartItems);
  };

  const cartArrayLength = () => {
    console.log(cartItems.length);
    return cartItems.length;
  };

  const getTotalCartItems = () => {
    console.log(cartItems);
    let total = cartItems.reduce((accum, currElem) => {
      return accum + currElem.discountedPrice;
    }, 0);
    console.log(total);
    return total;
  };

  const getSizeFunction = (val) => {
    setSize(val);
    return size;
  };

  const getProductInfo = (val) => {
    setArr([...arr, val]);
    console.log(arr);
  };

  // Include profileData and the update function in the context value
  const contextValue = {
    getTotalCartItems,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getSizeFunction,
    getProductInfo,
    getProductApiArray,
    getPopularWomenData,
    getNewCollectionData,
    getAllProductData,
    cartInfoSection,
    cartArrayLength,
    profileData, // Profile data in the context
    updateProfileData, // Function to update profile data
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;