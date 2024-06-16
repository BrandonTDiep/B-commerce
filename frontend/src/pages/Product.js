import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import loadingSpinner from "../assets/loadingSpinner.svg"
import Button from 'react-bootstrap/Button';
import { formatUSD } from '../utils/helpers';
import { useCart } from '../context/CartContext'
import QuantityUpdater from "../components/QuantityUpdater";

const Product = () => {

  const { productId } = useParams()
  const [product, setProduct] = useState([])
  const [displayedImg, setDisplayedImg] = useState()
  const [previousImg, setPreviousImg] = useState()
  const [selectedImg, setSelectedImg] = useState()
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart() // get the addToCart function from context

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
    addToCart(product, quantity)
  }


  return (
    <div className="row mt-4">
      <div className="col-1 d-flex flex-column">
        {product.images.map((image, index) => (
           (image === selectedImg) ? 
           <img key={index} className='product-mini-img rounded border border-dark' src={image} alt='product' 
           onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
            : 
            <img key={index} className='product-mini-img' src={image} alt='product' 
            onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
        ))}
      </div>

      <div className="col">
        <img className='product-main-img' src={displayedImg} alt='product'/>
      </div>

      <div className="col">
        <h5>{product.brand}</h5>
        <h2>{product.title}</h2>
        <p className="mt-4">{product.description}</p>

        <span className='main-price'>{formatUSD(quantity * product.price)}</span>

        <QuantityUpdater quantity = {quantity} handleIncrease = {handleIncrease} handleDecrease = {handleDecrease} />

        <div className="d-grid gap-3">
          <Button variant="danger" size="lg" onClick={handleAddToCart}>Add To Cart</Button>
          <Button variant="outline-secondary" size="lg">Buy Now</Button>{' '}
        </div>

      </div>
      
    </div>
  )
}

export default Product
