import { useState, useEffect } from "react"
import axios from 'axios' 

// components
import ProductDetails from '../components/ProductDetails'
import ProductForm from '../components/ProductForm'

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
        <div className="home">
            <div className="products">
                {/* only if we have a value for 'products', we'll start to map through them */}
                {products.map((product) => (
                    
                    <ProductDetails key={product.id} product = {product}/>
                ))}
            </div>
            <ProductForm />
        </div>
    )
}

export default Home