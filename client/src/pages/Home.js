import { useState, useEffect } from "react"
import axios from 'axios' 
import mainBanner from "../assets/banner.jpg"
import furnitureBanner from "../assets/furniture.png"
import groceries from "../assets/groceries.png"
import loadingSpinner from "../assets/loadingSpinner.svg"
// components
import ProductCard from '../components/ProductCard'


const Home = () => {
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const beautyProducts = products.filter((product) => product.category==='beauty')
    const furnitureProducts = products.filter((product) => product.category==='furniture')
    const groceryProducts = products.filter((product) => product.category==='groceries')
    
    
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
            finally{
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if(loading === true){
        return(
            <div className="loading-container">
                <img src={loadingSpinner} alt="loading.." />
            </div>
        );
    }
    return(
        <div>
            <ProductCard filteredProducts={beautyProducts} productHeading={'Featured Items'} productBanner={mainBanner}/>
            <ProductCard filteredProducts={furnitureProducts} productHeading={'On Sale'} productBanner={furnitureBanner}/>
            <ProductCard filteredProducts={groceryProducts} productHeading={'Groceries'} productBanner={groceries}/>
        </div>
    )
}

export default Home