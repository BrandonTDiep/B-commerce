import React from 'react'
import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
const OffCanvas = ({ show, onShow, onClose, ...props }) => {
  return (
    <>
    
      <FontAwesomeIcon className='px-2' icon={faCartShopping} onClick={onShow}/>
      <span className='bag-quantity'>1</span>

      <Offcanvas show={show} onHide={onClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Shopping Cart (0)</Offcanvas.Title>
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