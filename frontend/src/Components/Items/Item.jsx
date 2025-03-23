// import React, { useEffect, useState } from "react";
// import "./Item.css";
// import { Link } from 'react-router-dom'
// import { ShopContext } from "../../Context/ShopContext";

// const Item = (props) => { 
//   const [mode, setMode] = useState();

//   useEffect(()=>{
//     setMode(props.mode);
//   })
//   // const [mode,setMode]=useState(true)
//   // console.log('mode at items is',props.abc)
//   return (
//     (props.id)?<div className="item">
//             <div className="item-img">
//                   <Link to={`/product/${props.id}`}> <img src={props.image} alt="" onClick={()=>{ window.scrollTo(0, 0)}} /> </Link>
//             </div>
//             <div className="item-heading">
//                   <Link to={`/product/${props.id}`}>  <p id="title" style={{color:"#777"}}>{(props.name.length > 40)?props.name.substring(0, 40 - 3) + "..." : props.name}</p>  </Link>
//             </div>
            

//             {/* {console.log(`Hello I am the ${mode}`)} */}
//             <div className="item-prices">
//                   <div className="item-price-new"> &#8377;{props.new_price}</div>

//                   <div className="item-price-old"> &#8377;{props.old_price}</div>
//             </div>
        
//     </div>:null

//   );
// };

// export default Item;
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Item.css";

const Item = (props) => { 
  const [mode, setMode] = useState(props.mode || "light");

  useEffect(() => {
    setMode(props.mode);
  }, [props.mode]);

  if (!props.id) return null;

  // Determine theme colors based on mode
  const themeColors = {
    cardBg: mode === "light" ? "#ffffff" : "#1e1e1e",
    cardHoverBg: mode === "light" ? "#f8f9fa" : "#2a2a2a",
    titleColor: mode === "light" ? "#555555" : "#cccccc",
    newPriceColor: mode === "light" ? "#ff4757" : "#ff6b81",
    oldPriceColor: mode === "light" ? "#777777" : "#999999",
    shadow: mode === "light" 
      ? "rgba(0, 0, 0, 0.05) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 2px 4px" 
      : "rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 4px 8px",
    shadowHover: mode === "light"
      ? "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"
      : "rgba(0, 0, 0, 0.4) 0px 4px 16px, rgba(0, 0, 0, 0.3) 0px 8px 32px"
  };

  // Trim product name if too long
  const displayName = props.name.length > 35 
    ? props.name.substring(0, 32) + "..." 
    : props.name;

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((props.old_price - props.new_price) / props.old_price) * 100
  );

  return (
    <div 
      className="product-card" 
      style={{
        width: "280px",
        backgroundColor: themeColors.cardBg,
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: themeColors.shadow,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        margin: "0.5rem"
      }}
    >
      {/* Discount tag */}
      {discountPercentage > 0 && (
        <div 
          className="discount-tag"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: themeColors.newPriceColor,
            color: "#ffffff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
            zIndex: 1
          }}
        >
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <Link to={`/product/${props.id}`} style={{ display: "block" }}>
        <div 
          className="product-image"
          style={{
            width: "100%",
            height: "280px",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <img 
            src={props.image} 
            alt={props.name}
            onClick={() => window.scrollTo(0, 0)} 
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease"
            }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div 
        className="product-info"
        style={{
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        {/* Product Title */}
        <Link 
          to={`/product/${props.id}`}
          style={{ textDecoration: "none" }}
        >
          <h3 
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: themeColors.titleColor,
              margin: "0",
              lineHeight: "1.4",
              height: "40px",
              overflow: "hidden"
            }}
          >
            {displayName}
          </h3>
        </Link>

        {/* Price Section */}
        <div 
          className="price-container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "4px"
          }}
        >
          <span 
            className="current-price"
            style={{
              color: themeColors.newPriceColor,
              fontSize: "16px",
              fontWeight: "700"
            }}
          >
            ₹{props.new_price}
          </span>
          
          <span 
            className="original-price"
            style={{
              color: themeColors.oldPriceColor,
              fontSize: "14px",
              fontWeight: "400",
              textDecoration: "line-through"
            }}
          >
            ₹{props.old_price}
          </span>
        </div>
      </div>

      {/* Hover effect styles */}
      <style>
        {`
          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: ${themeColors.shadowHover};
          }
          
          .product-card:hover .product-image img {
            transform: scale(1.05);
          }
          
          @media screen and (max-width: 768px) {
            .product-card {
              width: 220px;
            }
            
            .product-image {
              height: 220px;
            }
          }
          
          @media screen and (max-width: 480px) {
            .product-card {
              width: 160px;
            }
            
            .product-image {
              height: 160px;
            }
            
            .product-info {
              padding: 8px 12px;
            }
            
            h3 {
              font-size: 12px;
              height: 34px;
            }
            
            .current-price {
              font-size: 14px;
            }
            
            .original-price {
              font-size: 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Item;