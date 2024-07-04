import axios from 'axios'
import { useState, useEffect } from "react"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

// hooks & context
import { useAuthContext } from "../hooks/useAuthContext"
import { useCart } from '../context/CartContext'

// utils & assets
import { formatUSD } from '../utils/helpers'
import { getPrice } from '../utils/pricing'
import paypal from "../assets/paypal.svg"

// components
import CartItems from "../components/CartItems"
import LoadingSpinner from '../components/LoadingSpinner'

const Cart = () => {

  const { cartItems, cartQuantity, cartTotalPrice } = useCart()
  const [activeTab, setActiveTab] = useState('inCart')
  const [loading, setLoading] = useState(true)

  const [savedProducts, setSavedProducts] = useState([])
  const {user} = useAuthContext()


  useEffect(() => {
    const fetchSavedProducts = async () => {
      try{
          if (user) {
            const response = await axios.get(`/api/products/savedProducts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const productsWithFinalPrice = response.data.savedProducts.map(item => ({
              ...item,
              product: {
                ...item.product,
                finalPrice: getPrice(item.product)
              }            
            }));
            setSavedProducts(productsWithFinalPrice);
        }
      }
      catch(error){
          console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchSavedProducts()

  }, [user, savedProducts])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  if(loading === true){
    return(
      <LoadingSpinner />
    );
  }


  return (
    <div className='row mt-4 mb-5'>
      <section className='col'>
        <h2>Your Cart</h2>
        <div className='cart-options mt-5 d-flex'>
          <button 
            className={`flex-fill cart-in p-3 mb-0 ${activeTab === 'inCart' ? 'activeTab' : 'hoverTab'}`} 
            onClick={() => handleTabClick('inCart')}>
            In Cart ({cartQuantity})
          </button>
          <button 
            className={`flex-fill cart-in p-3 mb-0 ${activeTab === 'savedForLater' ? 'activeTab' : 'hoverTab'}`} 
            onClick={() => handleTabClick('savedForLater')}>
            Saved For Later ({savedProducts.length})
          </button>
        </div>
        
        {activeTab === 'inCart' ? (
          <CartItems cartProducts={cartItems} cartImg={'cart-product-img-small'} />
        ) : (
          user ? (
            <CartItems cartProducts={savedProducts} cartImg={'cart-product-img-small'} cartOption='savedProducts' /> 
          ) : (
            <span className='mt-4 signin-message'><Link to="/login" className="signin-link">Sign in</Link> to your account to see saved for later items.</span>
          )
        )}


      </section>
      <section className='col-12 col-lg-4 mt-4 pt-3 ps-5'>
        <span className="order-summary mb-3">Order Summary</span>

        <div className='d-flex justify-content-between'>
            <span>Subtotal</span>
            <span>{formatUSD(cartTotalPrice)}</span>
        </div>
        <div className='d-flex justify-content-between'>
            <span>Shipping Cost</span>
            <span>Free</span>
        </div>
        <div className='mt-3 pt-3 pb-2 d-flex justify-content-between checkout-total'>
            <h5>Total</h5>
            <span className='cart-total-price'>{formatUSD(cartTotalPrice)}</span>
        </div>

        <Link to='/cart' className='mt-3 checkout d-grid gap-3'>
          <Button variant="danger" size="lg">Checkout</Button>
          <button type="button" className="btn btn-outline-secondary btn-lg"><img className="paypal-btn" src={paypal} alt="paypal" /></button>
        </Link>
      </section>

      
      
    </div>
  )
}

export default Cart