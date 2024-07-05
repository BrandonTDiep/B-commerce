import { useState, useEffect } from "react"

// components
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'

// utils & assets
import mainBanner from "../assets/banner.jpg"
import furnitureBanner from "../assets/furniture.png"
import groceries from "../assets/groceries.png"
import axiosInstance from '../utils/axiosInstance'



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
                console.log(process.env.NODE_ENV)
                const response = await axiosInstance.get('/api/products')
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
            <LoadingSpinner />
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