import Card from 'react-bootstrap/Card';
import { formatUSD } from '../utils/helpers';
const ProductDetails = ({ product, sale }) => {
  return (
    <Card className='mb-5' style={{ width: '15rem' }}>
      <Card.Img variant="top" className='product-img' src={product.images[0]} alt='product'/>
      <Card.Body>
        <Card.Text className='mb-0 product'>{product.brand}</Card.Text>
        <Card.Text className='product'>{product.title}</Card.Text>
        { sale ? <Card.Text className='cut-price mb-0'>${product.price}</Card.Text> : <Card.Text className='price mb-0'>${product.price}</Card.Text>}
        <Card.Text className='text-danger sale'>{ sale && `Sale ${formatUSD(product.discountedPrice)}`}</Card.Text>
      </Card.Body>
    </Card>
    
  )
}

export default ProductDetails

// one using right now is rafce
