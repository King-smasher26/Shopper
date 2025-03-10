import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplays/ProductDisplay";


const Product = (props) => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const {getAllProductData} = useContext(ShopContext);


  const product = getAllProductData().find((currElem) => currElem._id === productId);
  console.log(props.mode);
  return (
    <div>
       <Breadcrum product = {product} mode = {props.mode}/>
       <ProductDisplay product={product} mode={props.mode} />                
    </div>
  );
};

export default Product;
