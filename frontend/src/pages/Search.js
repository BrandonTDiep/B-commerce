import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ProductDetails from '../components/ProductDetails'
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

  return (
    <div>
      <h1>Search Results:</h1>
      <ul className="product-items">
        {searchedProducts
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

export default Search