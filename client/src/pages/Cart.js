import CartItems from "../components/CartItems";
import { useCart } from '../context/CartContext'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { formatUSD } from '../utils/helpers';
import paypal from "../assets/paypal.svg"


const Cart = () => {

  const { cartItems, cartQuantity, cartTotalPrice } = useCart()


  return (
    <div className='row mt-4'>
      <section className='col'>
        <h2>Your Cart</h2>
        <div className='cart-options mt-5 d-flex'>
          <h4 className='flex-fill cart-in p-3 mb-0'>In Cart ({cartQuantity})</h4>
          <h4 className='flex-fill cart-save p-3 mb-0'>Saved For Later (0)</h4>
        </div>
        <CartItems cartItems={cartItems} cartImg={'cart-product-img-small'}/>

      </section>
      <section className='col-4'>
        <span className="order-summary mb-3">Order Summary</span>

        <div className='d-flex justify-content-between'>
            <span>Subtotal</span>
            <span>{formatUSD(cartTotalPrice)}</span>
        </div>
        <div className='d-flex justify-content-between'>
            <span>Shipping Cost</span>
            <span>Free</span>
        </div>
        <div className='mt-3 pb-2 d-flex justify-content-between checkout-total'>
            <h5>Total</h5>
            <span className='cart-total-price'>{formatUSD(cartTotalPrice)}</span>
        </div>

        <Link to='/cart' className='mt-3 checkout d-grid gap-3'>
          <Button variant="danger" size="lg">Checkout</Button>
          <button type="button" class="btn btn-outline-secondary btn-lg"><img className="paypal-btn" src={paypal} alt="paypal" /></button>
        </Link>
      </section>

      
      
    </div>
  )
}

export default Cart