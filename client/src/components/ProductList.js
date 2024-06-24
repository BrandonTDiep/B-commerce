import ProductDetails from '../components/ProductDetails'
import { getPrice, hasDiscount } from '../utils/pricing'
import { Link } from 'react-router-dom'

const ProductList = ({filteredProducts}) => {
  return (
    <ul className="product-items">
        {filteredProducts.map((product) => {
            const finalPrice = getPrice(product)
            const discountApplied = hasDiscount(product)

            return(
                <li key={product.id}>
                    <Link key={product.id} to={`/categories/product/${product.id}`} className="mt-5">
                        <ProductDetails key={product.id} product = {{...product, finalPrice}} sale = {discountApplied}/>
                    </Link>
                </li>
            )
        })}
    </ul>
  )
}

export default ProductList