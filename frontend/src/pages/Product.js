import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import loadingSpinner from "../assets/loadingSpinner.svg"
import Button from 'react-bootstrap/Button';

const Product = () => {

  const { productId } = useParams()
  const [product, setProduct] = useState([])
  const [displayedImg, setDisplayedImg] = useState()
  const [previousImg, setPreviousImg] = useState()
  const [selectedImg, setSelectedImg] = useState()
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

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
    setQuantity(prevCount => Math.min(prevCount + 1, 6))
  }

  const handleDecrease = () => {
    setQuantity(prevCount => Math.max(prevCount - 1, 1))
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

        <span className='main-price'>${quantity * product.price}</span>

        
        <div className="quantity-btn my-5">
          <button className="quantity-button-minus" onClick={handleDecrease} aria-label="Decrease Quantity" disabled="">-</button>
          <input type="number" disabled id="quantity" name="quantity" title="Qty" className="quantity-selector-input" value={quantity} min="1" max="6"/>
          <label className="qty-label" htmlFor='quantity'>Qty</label>
          <button className="quantity-button-plus" onClick={handleIncrease} aria-label="Increase Quantity" >+</button>
        </div>


        <div className="d-grid gap-3">
          <Button variant="danger" size="lg">Add To Cart</Button>
          <Button variant="outline-secondary" size="lg">Buy Now</Button>{' '}
        </div>

      </div>
      
    </div>
  )
}

export default Product
