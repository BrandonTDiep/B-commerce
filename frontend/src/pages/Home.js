import { useState, useEffect } from "react"
import axios from 'axios' 
import mainBanner from "../assets/banner.jpg"
import furnitureBanner from "../assets/furniture.png"
import groceries from "../assets/groceries.jpg"

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
            <section>
                <img className="d-flex banner" src={mainBanner} alt="ecommerce banner" />
                <h3 className="mt-5 mb-4">Featured Items</h3>
                <ul className="product-items">
                    {products.filter((product) => product.category==='beauty')
                    .map((product) => {
                        let discountedPrice =  (product.price) - (product.price * (product.discountPercentage / 100))

                        return(
                            <li key={product.id}><ProductDetails key={product.id} product = {{...product, discountedPrice}} sale = {false}/></li>
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
                            <li key={product.id}><ProductDetails key={product.id} product = {{...product, discountedPrice}} sale = {true}/></li>
                        )
                    })}
                </ul>
            </section>

            <section>
                <section className="d-flex groceries">
                    <section className="groceries-text">
                        <div>
                            <h2>Groceries</h2>
                            <p>B-commerce has everything you need for groceries whether it be meat, vegetables, fruits, and more.</p>
                        </div>
                    </section>
                    <section className="groceries-image">
                        <img className="groceries-img" src={groceries} alt="groceries" />
                    </section>
                </section>
                <h3 className="mt-5 mb-4">Groceries</h3>
                <ul className="product-items">
                    {products.filter((product) => product.category==='groceries')
                    .map((product) => {
                        let discountedPrice =  (product.price) - (product.price * (product.discountPercentage / 100))
                        return(
                            <li key={product.id}><ProductDetails key={product.id} product = {{...product, discountedPrice}} sale = {false}/></li>
                        )
                    })}
                </ul>
            </section>
        </div>
    )
}

export default Home