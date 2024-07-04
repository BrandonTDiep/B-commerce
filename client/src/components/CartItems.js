import axios from 'axios'
import { useState } from "react"
import { Alert} from 'react-bootstrap';

import { useCart } from '../context/CartContext'
import { formatUSD } from '../utils/helpers';
import QuantityUpdater from "./QuantityUpdater";
import { hasDiscount } from '../utils/pricing'
import { useAuthContext } from "../hooks/useAuthContext"

const CartItems = ({ cartProducts, cartImg, cartOption }) => {
    const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart()
    const {user} = useAuthContext()
    const [showSuccess, setShowSucess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [productTitle, setProductTitle] = useState('')

    const handleIncrease = (product) => {
        addToCart(product, 1)
    }
    
    const handleDecrease = (product) => {
        removeFromCart(product, 1)
    }

    const handleDelete = (product) => {
        deleteFromCart(product)
    }

    const handleSaveItem = async (product) => {
        try {
     
            const response = await axios.post('/api/products/', product, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              }
            });
            console.log(response.data.message)
          
        }
        catch (error) {
          console.log(error)
        }
    }

    const handleAddToCart = (product) => {
        const existingCartItem = cartItems.find((item) => item.product.id === product.id)
        if(existingCartItem && (existingCartItem.quantity + 1 > 6)){
            setProductTitle(product.title)
          setShowError(true)
          setTimeout(() => setShowError(false), 1000)
        }
        else{
          addToCart(product, 1)
          setProductTitle(product.title)
          setShowSucess(true)
          setTimeout(() => setShowSucess(false), 1000)
        }
      }


    return (
        <ul className='cart-items'>
                {cartProducts.map((item) => {
                    const discountApplied = hasDiscount(item.product)
                    return (
                        <li key={item.product.id} className='cart-product d-flex py-2'>
                            <img className={cartImg} src={item.product.images[0]} alt={item.product.title} />
                            <div className='d-flex flex-column justify-content-evenly flex-grow-1 px-2'>
                            <span className='cart-product-title d-flex justify-content-between'>{item.product.title}
                                <button type="button" className="btn-close cart" aria-label="Close" 
                                onClick={cartOption !== 'savedProducts' ? () => handleDelete(item.product) : () => handleSaveItem(item.product)} ></button>
                            </span>
                            {discountApplied ? 
                            <div>
                                <span className='cart-sale-price sale'>Sale {formatUSD((cartOption !== 'savedProducts' ? item.quantity : 1) * item.product.finalPrice)}</span> 
                                <span className='cart-cut-price size-big mb-0 ms-3'>{formatUSD((cartOption !== 'savedProducts' ? item.quantity : 1) * item.product.price)}</span>
                            </div>
                            : 
                            <span className='cart-product-price'>{formatUSD((cartOption !== 'savedProducts' ? item.quantity : 1) * item.product.finalPrice)}</span>
                            }
                            
                            {cartOption !== 'savedProducts' ?
                                <QuantityUpdater 
                                    productId={item.product.id}
                                    quantity={item.quantity} 
                                    handleIncrease={() => handleIncrease(item.product)} 
                                    handleDecrease={() => handleDecrease(item.product)} 
                                    size={'small'}
                                /> 
                                :
                                <div>
                                    <button type="button" className="btn btn-danger btn-sm cartitem-button" onClick={() => handleAddToCart(item.product)}>Add to cart</button>
                                </div>
                            }
                            </div>       
                        </li>)
                })}
                {showSuccess && (
                    <Alert variant="success" className='mt-3' onClose={() => setShowSucess(false)} dismissible>
                            ✔️ {productTitle} added to cart!
                    </Alert>
                )}
                {showError && (
                    <Alert variant="danger" className='mt-3' onClose={() => setShowError(false)} dismissible>
                    ❗ You've reach the limit for {productTitle}!
                    </Alert>
                )}
        </ul> 
    )
}

export default CartItems