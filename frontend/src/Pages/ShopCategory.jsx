import React, { useContext, useMemo, useState } from 'react'
import "./ShopCategory.css"
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Items/Item'
// import { RiArrowDropDownLine } from "react-icons/ri";

import axios from 'axios'




const ShopCategory = (props) => {
  const [sort, setSort] = useState("sort");
  const {all_product, getProductApiArray} = useContext(ShopContext);
  const changeTheme = {
    color : (props.mode==="black")?"yellow":"black",
  }

  const [products,setProducts]=useState([]);
  axios.defaults.withCredentials = true;


  useMemo(()=>{
    return sendreq();
  },[])


  
  async function sendreq(){
    setProducts( await axios.get(`${process.env.REACT_APP_API_URL}/products`).then((res)=>{
      console.log(res.data.data)
      getProductApiArray(res.data.data);
      return res.data.data;
    }).catch((e)=>{
      alert('an error has occured')
      console.log(e)
    }))
  }
    
  const getSelectValue=()=>{
    console.log(sort)
    if(sort === "asc"){
      all_product.sort((a, b)=> a.new_price - b.new_price);
 
    }
    else if(sort === "des"){
      all_product.sort((a, b)=> b.new_price - a.new_price);
    }
    else{
      all_product.sort((a, b)=>a.name[0] - b.name[0]);
    }
    
  }

  return ( 
    <>
    {/* {console.log(props.mode)} */}
    <div className="shop-category">
        <div className='shop-category-img'>
        <img src={props.banner} alt="" />
        </div>

        {/* <div className="shop-category-indexSort">
            <p style={changeTheme}> <span>Showing 1-12</span> out of 36 product </p>
          <div className="shopcategory-sort" style={changeTheme}>
             <p style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
              <div>
                <input type="radio" name="sort" id="asc" onClick={()=>{setSort("asc")}} /> <label htmlFor="asc"></label>
                <label htmlFor="asc">Price (Ascending Order)</label>
              </div>
              <div>
                <input type="radio" name="sort" id="des" onClick={()=>{setSort("des") }} /> <label htmlFor="asc"></label>
                <label htmlFor="des">Price (Descending Order)</label>
              </div>
              <div>
                <input type="radio" name="sort" id="name" onClick={()=>{setSort("name")}} /> <label htmlFor="asc"></label>
                <label htmlFor="name">Name</label>
              </div>
             </p>
             <div><RiArrowDropDownLine style={{fontSize: "3rem"}}/></div> 
             {getSelectValue()}
            
             {console.log(props.category)}
             {console.log(products)}
          </div>
        </div> */}

          <div className="shopcategory-products">
            <div className="shopcategory-products-item">

          {products.map((item, i)=>{
             if (props.category === item.tags[0]){
              return <Item key={i} id={item._id} name={item.ProductName} image={item.ProductImg} new_price={item.Price}  old_price={item.discountedPrice} />
             }
             
            // else{
            //   return null;
            // } 
          })}
          </div>
          </div>
          </div>
      
    </>
  )
}

export default ShopCategory
