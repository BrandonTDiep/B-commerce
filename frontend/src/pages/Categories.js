import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'

import axios from 'axios' 

const Categories = () => {

  const [categories, setCategories] = useState([])
  const [categoryProducts, setCategoryProducts] = useState([])
  const { category } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
        try{
            const response = await axios.get('/api/categories')
            setCategories(response.data)
        }
        catch(error){
            console.log(error)
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

  return (
    <div>
      <header className="d-flex justify-content-center flex-column">
        <h1 className="mx-auto category-title">{category}</h1>
        <nav className="categories-nav">
          <ul className="categories-list">
          <Link to={`/categories/all`}><li>All</li></Link>
          {categories.slice(0,7).map((category, index) => (
              <Link key={index} to={`/categories/${category}`}><li key={index}>{category.replace('-', ' ')}</li></Link>
            ))}
          </ul>
        </nav>
      </header>
      
      <div>
        {categoryProducts
            .map((product) => {
                let discountedPrice =  (product.price) - (product.price * (product.discountPercentage / 100))

                return(
                    <li key={product.id}><ProductDetails key={product.id} product = {{...product, discountedPrice}} sale = {false}/></li>
                )
            })}
      </div>
      
    </div>
  )
}

export default Categories