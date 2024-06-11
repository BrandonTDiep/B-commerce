import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ProductDetails from '../components/ProductDetails'
const Product = () => {


  const { productId } = useParams()
  const [product, setProduct] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try{
          const response = await axios.get(`/api/products/${productId}`)
          setProduct(response.data)
      }
      catch(error){
          console.log(error)
      }
    }
    fetchProduct()

  }, [])

  return (
    <div>
      <h1>{product.title}</h1>
      
    </div>
  )
}

export default Product
