import { useCart } from '../context/CartContext'
import { formatUSD } from '../utils/helpers';
import QuantityUpdater from "./QuantityUpdater";
import { hasDiscount } from '../utils/pricing'
const CartItems = ({ cartItems, cartImg }) => {
    const { addToCart, removeFromCart, deleteFromCart } = useCart()

    const handleIncrease = (product) => {
        addToCart(product, 1)
    }
    
    const handleDecrease = (product) => {
        removeFromCart(product, 1)
    }

    const handleDelete = (product) => {
        deleteFromCart(product)
    }


    return (
        <ul className='cart-items'>
                {cartItems.map((item) => {
                    const discountApplied = hasDiscount(item.product)
                
                    return (
                        <li key={item.product.id} className='cart-product d-flex py-2'>
                            <img className={cartImg} src={item.product.images[0]} alt={item.product.title} />
                            <div className='d-flex flex-column justify-content-evenly flex-grow-1 px-2'>
                            <span className='cart-product-title d-flex justify-content-between'>{item.product.title}
                                <button type="button" className="btn-close cart" aria-label="Close" onClick={() => handleDelete(item.product)} ></button>
                            </span>
                            <span className='cart-product-price'>{formatUSD(item.quantity * item.product.finalPrice)}</span>
                            <QuantityUpdater 
                                productId={item.product.id}
                                quantity={item.quantity} 
                                handleIncrease={() => handleIncrease(item.product)} 
                                handleDecrease={() => handleDecrease(item.product)} 
                                size={'small'}
                            />
                            </div>       
                        </li>)
                })}
        </ul> 
    )
}

export default CartItems