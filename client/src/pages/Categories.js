import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'

// components
import ProductList from '../components/ProductList'
import LoadingSpinner from '../components/LoadingSpinner'

// utils & assets
import axiosInstance  from '../utils/axiosInstance'

const Categories = () => {

  const [categories, setCategories] = useState([])
  const [categoryProducts, setCategoryProducts] = useState([])
  const { category } = useParams();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
        try{
            const response = await axiosInstance.get('/api/categories')
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
          const response = await axiosInstance.get(`/api/categories/${category}`)
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
        <LoadingSpinner />
    );
  }

  return (
    <div className="mt-4">
      <header className="d-flex justify-content-center flex-column">
        <h1 className="mx-auto category-title">{category.replace('-', ' ')}</h1>
        <nav className="categories-nav">
          <ul className="categories-list">
          <Link to={`/categories/all`} className="mt-5 category-links"><li>All</li></Link>
          {categories.slice(0,7).map((category, index) => (
              <Link key={index} to={`/categories/${category}`} className="mt-5 category-links"><li key={index}>{category.replace('-', ' ')}</li></Link>
            ))}
          </ul>
        </nav>
      </header>
      <ProductList filteredProducts={categoryProducts}/>
    </div>
  )
}

export default Categories