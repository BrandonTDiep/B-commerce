import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'
import loadingSpinner from "../assets/loadingSpinner.svg"

import axios from 'axios' 

const Categories = () => {

  const [categories, setCategories] = useState([])
  const [categoryProducts, setCategoryProducts] = useState([])
  const { category } = useParams();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
        try{
            const response = await axios.get('/api/categories')
            setCategories(response.data)
        }
        catch(error){
            console.log(error)
        }
        finally{
          setLoading(false)
        }
    }
    const fetchCategory = async () => {
      try{
          const response = await axios.get(`/api/categories/${category}`)
          setCategoryProducts(response.data)
          
      }
      catch(error){
          console.log(error)
      }
    }
    fetchCategories()
    fetchCategory()

  }, [category])

  if(loading === true){
    return(
        <div className="loading-container">
            <img src={loadingSpinner} alt="loading.." />
        </div>
    );
  }

  return (
    <div>
      <header className="d-flex justify-content-center flex-column">
        <h1 className="mx-auto category-title">{category}</h1>
        <nav className="categories-nav">
          <ul className="categories-list">
          <li><Link to={`/categories/all`} className="mt-5">All</Link></li>
          {categories.slice(0,7).map((category, index) => (
              <li key={index}><Link key={index} to={`/categories/${category}`} className="mt-5">{category.replace('-', ' ')}</Link></li>
            ))}
          </ul>
        </nav>
      </header>
      
      <ul className="product-items">
        {categoryProducts
            .map((product) => {
                let discountedPrice =  (product.price) - (product.price * (product.discountPercentage / 100))

                return(
                  <li key={product.id}>
                    <Link key={product.id} to={`/categories/product/${product.id}`} className="mt-5">
                        <ProductDetails key={product.id} product = {{...product, discountedPrice}} sale = {false}/>
                    </Link>
                  </li>
                )
            })}
      </ul>
      
    </div>
  )
}

export default Categories