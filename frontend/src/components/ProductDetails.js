import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const ProductDetails = ({ product }) => {


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.images[0]} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
        <strong>Amount: </strong>{product.price}
        </Card.Text>
        <Button variant="primary">Buy</Button>
      </Card.Body>
    </Card>
    
  )
}

export default ProductDetails

// one using right now is rafce
