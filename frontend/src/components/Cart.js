import { Offcanvas } from 'react-bootstrap';
import { useCart } from '../context/CartContext'
import QuantityUpdater from "../components/QuantityUpdater";

const OffCanvas = ({ show, onClose, ...props }) => {

  const { cartItems, cartQuantity, addToCart, removeFromCart } = useCart()

  const handleIncrease = (product) => {
    addToCart(product, 1)
  }

  const handleDecrease = (product) => {
    removeFromCart(product, 1)
  } 
 

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
          <ul>
            {cartItems.map((item) => (
              <li key={item.product.id} className='cart-product d-flex'>
                <img className='cart-product-img' src={item.product.images[0]} alt={item.product.title} />
                <div className='d-flex flex-column justify-content-evenly flex-grow-1 px-2'>
                  <span className='cart-product-title'>{item.product.title}</span>
                  <span className='cart-product-price'>{item.product.price}</span>
                  <QuantityUpdater quantity = {item.quantity} handleIncrease = {() => handleIncrease(item.product)} handleDecrease = {() => handleDecrease(item.product)} />
                </div>       
              </li>
            ))}
          </ul> 
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>  
  )
}

export default OffCanvas