// react context is a way that we can provide kind of global state to many diff components in the app

import { createContext, useState, useEffect, useContext } from 'react'

// create a context object
export const CartContext = createContext()

// create a custom hook for consuming the context
export const useCart = () => useContext(CartContext)

// create a provider component
export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems')
        return savedCartItems ? JSON.parse(savedCartItems) : []
    }) 

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product, quantity) => {
        setCartItems(
            prevItems => {
                const existingItem = prevItems.find(item => item.product.id === product.id)
                if(existingItem){ // if exists, update quantity of product
                    return prevItems.map(item => 
                        item.product.id === product.id ? {...item, quantity: item.quantity + quantity } : item
                    )
                }
                else{ // if not, create new array with existing items and add new product with its quantity
                    return [...prevItems, {product, quantity}]
                }
            }
        )
    }

    const removeFromCart = (product, quantity) => {
        setCartItems(
            prevItems => {
                return prevItems.map(item => 
                    item.product.id === product.id ? {...item, quantity: item.quantity - quantity } : item
                )
            }
        )
    }

    const deleteFromCart = (product) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== product.id))
    }


    // total=0: accumulator, item: current item in 'cartItems' array
    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
    const cartTotalPrice = cartItems.reduce((total, item) => total + (item.product.finalPrice * item.quantity), 0)

    return( 
        <CartContext.Provider value={{cartItems, cartQuantity, cartTotalPrice, addToCart, removeFromCart, deleteFromCart}}>
            { children } 
        </CartContext.Provider>
    )   
}

