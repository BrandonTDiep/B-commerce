import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

// components
import ProductList from '../components/ProductList'
import LoadingSpinner from '../components/LoadingSpinner'

// utils & assets
import axiosInstance from '../utils/axiosInstance'

const Search = () => {

  const { searchQuery } = useParams()
  const [searchedProducts, setSearchedProducts] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try{
          const response = await axiosInstance.get(`/api/searches/${searchQuery}`)
          setSearchedProducts(response.data)
      }
      catch(error){
          console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchSearchedProducts()

  }, [searchQuery])
  

  if(loading === true){
    return(
      <LoadingSpinner />
    );
  }

  if(searchedProducts.length === 0){
    return(
      <div>
        <h1>No Results Found</h1>
      </div>
    )
  }
  return (
    <div className="mt-4">
      <h1>Search Results:</h1>
      <ProductList filteredProducts={searchedProducts}/>
    </div>
  )
}

export default Search