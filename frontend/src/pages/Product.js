import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import loadingSpinner from "../assets/loadingSpinner.svg"
import Button from 'react-bootstrap/Button';

const Product = () => {

  const { productId } = useParams()
  const [product, setProduct] = useState([])
  const [displayedImg, setDisplayedImg] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try{
          const response = await axios.get(`/api/products/${productId}`)
          setProduct(response.data)
          setDisplayedImg(response.data.images[0])
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

  return (
    <div className="row mt-4">
      <div className="col-1 d-flex flex-column">
        {product.images.map((image, index) => (
          <img key={index} className='product-mini-img' src={image} alt='product' onMouseEnter={()=>setDisplayedImg(image)}/>
        ))}
      </div>

      <div className="col">
        <img className='product-main-img' src={displayedImg} alt='product'/>
      </div>

      <div className="col">
        <h5>{product.brand}</h5>
        <h2>{product.title}</h2>
        <p className="mt-4">{product.description}</p>

        <span className='main-price'>${product.price}</span>

        
        <div className="quantity-btn my-5">
          <button className="quantity-button-minus" aria-label="Decrease Quantity" disabled="">-</button>
          <input type="number" id="quantity" disabled min="1" max="6" name="quantity" title="Qty" className="quantity-selector-input" value='5' />
          <label className="qty-label" htmlFor='quantity'>Qty</label>
          <button className="quantity-button-plus" aria-label="Increase Quantity">+</button>
        </div>


        <div className="d-grid gap-3">
          <Button variant="danger"  size="lg">Add To Cart</Button>
          <Button variant="outline-secondary" size="lg">Buy Now</Button>{' '}
        </div>

      </div>
      
    </div>
  )
}

export default Product
