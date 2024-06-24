import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import loadingSpinner from "../assets/loadingSpinner.svg"
import Button from 'react-bootstrap/Button';
import { formatUSD } from '../utils/helpers';
import { getPrice, hasDiscount } from '../utils/pricing'
import { useCart } from '../context/CartContext'

// components
import QuantityUpdater from "../components/QuantityUpdater";

const Product = () => {

  const { productId } = useParams()
  const [product, setProduct] = useState([])
  const [displayedImg, setDisplayedImg] = useState()
  const [previousImg, setPreviousImg] = useState()
  const [selectedImg, setSelectedImg] = useState()
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { cartItems, addToCart } = useCart() // get the addToCart function from context
  const finalPrice = getPrice(product)
  const discountApplied = hasDiscount(product)

  useEffect(() => {
    const fetchProduct = async () => {
      try{
          const response = await axios.get(`/api/products/${productId}`)
          setProduct(response.data)
          setDisplayedImg(response.data.images[0])
          setPreviousImg(response.data.images[0]) 
      }
      catch(error){
          console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchProduct()

  }, [productId])

  if(loading === true){
    return(
        <div className="loading-container">
            <img src={loadingSpinner} alt="loading.." />
        </div>
    );
  }


  const handleMouseClick = (image) => {
    setSelectedImg(image)
    setPreviousImg(image)
  }

  const handleMouseEnter = (image) => {
    setDisplayedImg(image) // hovered over img
  }

  const handleMouseLeave = () => {
    setDisplayedImg(previousImg)
  }

  const handleIncrease = () => {
    setQuantity(prevCount => prevCount + 1)
  }

  const handleDecrease = () => {
    setQuantity(prevCount => prevCount - 1)
  } 

  const handleAddToCart = () => {
    const existingCartItem = cartItems.find((item) => item.product.id === product.id)
    if(existingCartItem && (existingCartItem.quantity + quantity > 6)){
      return
    }
    else{
      addToCart({...product, finalPrice}, quantity)
    }
  }


  return (
    <div className="row mt-4">
      <aside className="product-mini-images-container">
        {product.images.map((image, index) => (
           (image === selectedImg) ? 
           <img key={index} className='product-mini-img rounded border border-dark' src={image} alt='product' 
           onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
            : 
            <img key={index} className='product-mini-img' src={image} alt='product' 
            onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
        ))}
      </aside>

      <h2 className="mobile-product-name">{product.title}</h2>

      <div className="col">
        <img className='product-main-img' src={displayedImg} alt='product'/>
      </div>

      <aside className="mobile-view-mini-products mb-5">
        {product.images.map((image, index) => (
           (image === selectedImg) ? 
           <img key={index} className='product-mini-img rounded border border-dark' src={image} alt='product' 
           onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
            : 
            <img key={index} className='product-mini-img' src={image} alt='product' 
            onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
        ))}
      </aside>

      <div className="col">
        <div className="product-name">
          <h5>{product.brand}</h5>
          <h2>{product.title}</h2>
        </div>

        <p className="mt-4">{product.description}</p>

        {discountApplied ? 
          <div>
            <span className='main-price sale'>Sale {formatUSD(quantity * finalPrice)}</span> 
            <span className='cut-price size-big mb-0 ms-3'>{formatUSD(quantity * product.price)}</span>
          </div>
        : 
        <span className='main-price'>{formatUSD(quantity * finalPrice)}</span> 
        }
        <QuantityUpdater productId={product.id} quantity={quantity} handleIncrease={handleIncrease} handleDecrease={handleDecrease} size = {'big'}/>

        <div className="d-grid gap-3 mb-5">
          <Button variant="danger" size="lg" onClick={handleAddToCart}>Add To Cart</Button>
          <Button variant="outline-secondary" size="lg">Buy Now</Button>{' '}
        </div>

      </div>
      
    </div>
  )
}

export default Product
