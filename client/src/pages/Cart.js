import CartItems from "../components/CartItems";
import { useCart } from '../context/CartContext'

const Cart = () => {

  const { cartItems, cartQuantity, cartTotalPrice } = useCart()


  return (
    <div className='row mt-4'>
      <section className='col'>
        <h2>Your Cart</h2>
        <div className='cart-options mt-5 d-flex'>
          <h4 className='flex-fill cart-in p-3'>In Cart ({cartQuantity})</h4>
          <h4 className='flex-fill cart-save p-3'>Saved For Later (0)</h4>
        </div>
        <CartItems cartItems={cartItems} cartImg={'cart-product-img-small'}/>

      </section>
      <section className='col-4'>
       <h1>che c</h1>
      </section>
      
    </div>
  )
}

export default Cart