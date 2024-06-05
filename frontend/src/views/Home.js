import { useState, useEffect } from "react"
import axios from 'axios' 
import banner from "../assets/banner.jpg"
// components
import ProductDetails from '../components/ProductDetails'

const Home = () => {
    
    const [products, setProducts] = useState([])
    
    // useEffect will fire a component when rendered, want to only fire once, dependency array empty means fire only once
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await axios.get('/api/products')
                setProducts(response.data)
            }
            catch(error){
                console.log(error)
            }
            
        }
        fetchProducts()
    }, [])
    return(
        <div>
            <img className="d-flex banner" src={banner} alt="ecommerce banner" />
            <h3 className="my-5">Featured Items</h3>
            <ul className="d-flex flex-wrap justify-content-between productItems">
                {products.map((product) => {
                    let discountedPrice =  (product.price) - (product.price * (product.discountPercentage / 100))

                    return(
                        <li key={product.id}><ProductDetails key={product.id} product = {{...product, discountedPrice}}/></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home