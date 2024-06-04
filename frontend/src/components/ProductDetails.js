import Card from 'react-bootstrap/Card';
import { formatUSD } from '../utils/helpers';
const ProductDetails = ({ product }) => {
  return (
    <Card className='mt-5' style={{ width: '15rem' }}>
      <Card.Img variant="top" className='productImg' src={product.images[0]} />
      <Card.Body>
        <Card.Text className='mb-0 product'>{product.brand}</Card.Text>
        <Card.Text className='product'>{product.title}</Card.Text>
        <Card.Text className='price mb-0'>${product.price}</Card.Text>
        <Card.Text className='text-danger sale'>Sale {formatUSD(product.discountedPrice)}</Card.Text>
      </Card.Body>
    </Card>
    
  )
}

export default ProductDetails

// one using right now is rafce
