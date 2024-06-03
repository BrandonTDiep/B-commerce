import Card from 'react-bootstrap/Card';
const ProductDetails = ({ product }) => {


  return (
    <Card className='mt-5' style={{ width: '15rem' }}>
      <Card.Img variant="top" src={product.images[0]} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
        {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
    
  )
}

export default ProductDetails

// one using right now is rafce
