import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios' 
import mainBanner from "../assets/banner.jpg"
import furnitureBanner from "../assets/furniture.png"
import groceries from "../assets/groceries.png"
import loadingSpinner from "../assets/loadingSpinner.svg"
// components
import ProductDetails from '../components/ProductDetails'

const Home = () => {
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    
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
            <section>
                <img className="d-flex banner" src={mainBanner} alt="ecommerce banner" />
                <h3 className="mt-5 mb-4">Featured Items</h3>
                <ul className="product-items">
                    {products.filter((product) => product.category==='beauty')
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
            </section>
            
            <section>
                <img className="d-flex banner" src={furnitureBanner} alt="furniture banner" />
                <h3 className="mt-5 mb-4">On Sale</h3>
                <ul className="product-items">
                    {products.filter((product) => product.category==='furniture')
                    .map((product) => {
                        let discountedPrice =  (product.price) - (product.price * (product.discountPercentage / 100))

                        return(
                            <li key={product.id}>
                                <Link key={product.id} to={`/categories/product/${product.id}`} className="mt-5">
                                    <ProductDetails key={product.id} product = {{...product, discountedPrice}} sale = {true}/>
                                </Link>
                            </li>                        )
                    })}
                </ul>
            </section>

            <section>
                <img className="d-flex banner" src={groceries} alt="groceries banner" />
                <h3 className="mt-5 mb-4">Groceries</h3>
                <ul className="product-items">
                    {products.filter((product) => product.category==='groceries')
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
            </section>
        </div>
    )
}

export default Home