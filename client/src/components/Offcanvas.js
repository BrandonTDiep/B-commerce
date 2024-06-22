import { Offcanvas, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { formatUSD } from '../utils/helpers';
import CartItems from "./CartItems";

const OffCanvas = ({ show, onClose, ...props }) => {

  const { cartItems, cartQuantity, cartTotalPrice } = useCart()

  return (
    <>
      <Offcanvas show={show} onHide={onClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Shopping Cart ({cartQuantity})</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? 
          <p>Your cart is empty!</p> 
          :
          <CartItems cartItems={cartItems} cartImg={'cart-product-img'}/>
          }       
        </Offcanvas.Body>
        <div className='offcanvas-footer'>
          <div className='mx-3 mt-3 pb-2 d-flex justify-content-between offcanvas-subtotal'>
            <h5>Subtotal</h5>
            <span className='cart-total-price'>{formatUSD(cartTotalPrice)}</span>
          </div>
          
          <Link to='/cart' className='cart-link d-grid mx-3 mt-5 mb-3 '>
            <Button variant="danger" size="lg">View Cart</Button>
          </Link>
        </div>
        
       
      </Offcanvas>
    </>  
  )
}

export default OffCanvas