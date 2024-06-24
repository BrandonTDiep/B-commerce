import ProductList from '../components/ProductList'

const ProductCard = ({filteredProducts, productHeading, productBanner}) => {
  return (
    <section>
        <img className="d-flex banner" src={productBanner} alt={`${productHeading} banner`} />
        <h3 className="mt-5 mb-4">{productHeading}</h3>
        <ProductList filteredProducts={filteredProducts}/>
    </section>
    
  )
}

export default ProductCard