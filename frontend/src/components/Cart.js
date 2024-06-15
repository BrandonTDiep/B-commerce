import React from 'react'
import { Offcanvas } from 'react-bootstrap';
import { useCart } from '../context/CartContext'

const OffCanvas = ({ show, onClose, ...props }) => {

  const { cartItems, cartQuantity } = useCart()

  return (
    <>
      <Offcanvas show={show} onHide={onClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Shopping Cart ({cartQuantity})</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>  
  )
}

export default OffCanvas