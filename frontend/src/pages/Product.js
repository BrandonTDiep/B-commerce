import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import loadingSpinner from "../assets/loadingSpinner.svg"

const Product = () => {


  const { productId } = useParams()
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try{
          const response = await axios.get(`/api/products/${productId}`)
          setProduct(response.data)
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
          <img key={index} className='product-mini-img' src={image} alt='product' />
        ))}
      </div>

      <div className="col">
        <img className='product-main-img' src={product.images[0]} alt='product' />
      </div>

      <div className="col">
        <h5>{product.brand}</h5>
        <h2>{product.title}</h2>
       
        <span className='main-price'>${product.price}</span>
        
        
        <div className="quantity-btn my-5">
          <button className="quantity-button-minus" aria-label="Decrease Quantity" disabled="">-</button>
          <input type="number" disabled min="1" max="6" name="quantity" title="Qty" className="quantity-selector-input" value='5' />
          <label className="qty-label">Qty</label>
          <button className="quantity-button-plus" aria-label="Increase Quantity">+</button>
        </div>

        <hr />
        <p>{product.description}</p>
      </div>
      
    </div>
  )
}

export default Product
