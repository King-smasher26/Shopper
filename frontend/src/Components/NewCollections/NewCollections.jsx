import React, { useContext } from 'react'
import "./NewCollections.css"
import new_collection from '../Images/new_collections'
import Item from "../Items/Item"
import { ShopContext } from '../../Context/ShopContext'

const NewCollections = (props) => {

  const {getNewCollectionData} = useContext(ShopContext)

  const changeTheme = {
    color : (props.mode==="black")?"yellow":"black"
  }
  

  return (
    <>

    <div className="new-collections">

      <div className="new_collection_heading">
        <h1 style={changeTheme}>NEW COLLECTIONS</h1>
        {/* {getNewCollectionData()} */}
      </div>

      <div className="new_collection_dash">
        <hr style={{backgroundColor: (props.mode === "black")?"yellow":"black"}}/>
      </div>

        <div className="collections">
          <div className="collection_item">
            {getNewCollectionData().map((item, index)=>{
                return <Item key={index} id={item._id} name={item.ProductName} image={item.ProductImg} new_price={item.discountedPrice}  old_price={item.Price} />
            })}
          </div>

        </div>
    </div>
      

    </>
  )
}

export default NewCollections
