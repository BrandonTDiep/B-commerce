// react context is a way that we can provide kind of global state to many diff components in the app

import { createContext, useState, useContext } from 'react'

// create a context object
export const CartContext = createContext()

// create a custom hook for consuming the context
export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {

    const [cartQuantity, setCartQuantity] = useState(0) 

    const addToCart = (quantity) => {
        setCartQuantity(prevQuantity => prevQuantity + quantity)
    }

    const removeFromCart = (quantity) => {
        setCartQuantity(prevQuantity => prevQuantity - quantity)
    }

    
    return( 
        <CartContext.Provider value={{cartQuantity, addToCart, removeFromCart}}>
            { children } 
        </CartContext.Provider>
    )   
}

