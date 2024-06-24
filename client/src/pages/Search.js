import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'

// components
import ProductList from '../components/ProductList'


const Search = () => {

  const { searchQuery } = useParams()
  const [searchedProducts, setSearchedProducts] = useState([])

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try{
          const response = await axios.get(`/api/searches/${searchQuery}`)
          setSearchedProducts(response.data)
      }
      catch(error){
          console.log(error)
      }
    }
    fetchSearchedProducts()

  }, [searchQuery])

  if(searchedProducts.length === 0){
    return(
      <div>
        <h1>No Results Found</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>Search Results:</h1>
      <ProductList filteredProducts={searchedProducts}/>
    </div>
  )
}

export default Search