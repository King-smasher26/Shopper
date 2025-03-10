import React from 'react'
import CartItems from '../Components/CartItems/CartItems'

const Cart = (props) => {
  return (
    <div>
      <CartItems mode = {props.mode} />
    </div>
  )
}

export default Cart
