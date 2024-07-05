import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Alert, Button} from 'react-bootstrap';

// components
import QuantityUpdater from "../components/QuantityUpdater";
import LoadingSpinner from '../components/LoadingSpinner'

// hooks & context
import { useAuthContext } from "../hooks/useAuthContext"
import { useCart } from '../context/CartContext'

// utils & assets
import { formatUSD } from '../utils/helpers';
import { getPrice, hasDiscount } from '../utils/pricing'
import axiosInstance from '../utils/axiosInstance'



const Product = () => {

  const { productId } = useParams()
  const [product, setProduct] = useState([])
  const [isSavedProduct, setSavedProduct] = useState('false')
  const [displayedImg, setDisplayedImg] = useState()
  const [previousImg, setPreviousImg] = useState()
  const [selectedImg, setSelectedImg] = useState()
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSucess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showNotification, setshowNotification] = useState(false)
  const { cartItems, addToCart } = useCart() // get the addToCart function from context
  const finalPrice = getPrice(product)
  const discountApplied = hasDiscount(product)
  const {user} = useAuthContext()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try{
          const response = await axiosInstance.get(`/api/products/${productId}`)
          setProduct(response.data)
          setDisplayedImg(response.data.images[0])
          setPreviousImg(response.data.images[0]) 

          if (user) {
            const savedResponse = await axiosInstance.get(`/api/products/saved/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setSavedProduct(savedResponse.data.saved);
        }
      }
      catch(error){
          console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchProduct()

  }, [productId, user])

  if(loading === true){
    return(
      <LoadingSpinner />
    );
  }


  const handleMouseClick = (image) => {
    setSelectedImg(image)
    setPreviousImg(image)
  }

  const handleMouseEnter = (image) => {
    setDisplayedImg(image) // hovered over img
  }

  const handleMouseLeave = () => {
    setDisplayedImg(previousImg)
  }

  const handleIncrease = () => {
    setQuantity(prevCount => prevCount + 1)
  }

  const handleDecrease = () => {
    setQuantity(prevCount => prevCount - 1)
  } 

  const handleAddToCart = () => {
    const existingCartItem = cartItems.find((item) => item.product.id === product.id)
    if(existingCartItem && (existingCartItem.quantity + quantity > 6)){
      setShowError(true)
      setTimeout(() => setShowError(false), 1000)
    }
    else{
      addToCart({...product, finalPrice}, quantity)
      setShowSucess(true)
      setTimeout(() => setShowSucess(false), 1000)
    }
  }

  const handleBuyToCart = () => {    
    const existingCartItem = cartItems.find((item) => item.product.id === product.id)
    if(existingCartItem && (existingCartItem.quantity + 1 > 6)){
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
    else{
      addToCart({...product, finalPrice}, quantity)
      navigate(`/cart`)
    }
  }

  const handleSaveItem = async () => {
    try {
      if(!user){
        navigate(`/signup`)
      }
      else{
        const response = await axiosInstance.post('/api/products/', product, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        console.log(response.data.message)
        setshowNotification(true)
        setSavedProduct(!isSavedProduct)
        setTimeout(() => setshowNotification(false), 3000)
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="row mt-4">
      <aside className="product-mini-images-container">
        {product.images.map((image, index) => (
           (image === selectedImg) ? 
           <img key={index} className='product-mini-img rounded border border-dark' src={image} alt='product' 
           onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
            : 
            <img key={index} className='product-mini-img' src={image} alt='product' 
            onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
        ))}
      </aside>

      <h2 className="mobile-product-name">{product.title}</h2>
      
      <div className="col image-container">
        <i className={`bi bi-suit-heart${isSavedProduct && user ? '-fill' : ''} save-item`} onClick={handleSaveItem}></i>
        <img className='product-main-img' src={displayedImg} alt='product'/>
          {showNotification && (
              <span className='save-notif'>{isSavedProduct ? 'Added to Saved List': 'Removed from Saved List'}</span>
          )}
      </div>

      <aside className="mobile-view-mini-products mb-5">
        {product.images.map((image, index) => (
           (image === selectedImg) ? 
           <img key={index} className='product-mini-img rounded border border-dark' src={image} alt='product' 
           onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
            : 
            <img key={index} className='product-mini-img' src={image} alt='product' 
            onClick={()=>handleMouseClick(image)} onMouseEnter={()=>handleMouseEnter(image)} onMouseLeave={handleMouseLeave}/>
        ))}
      </aside>

      <div className="col">
        <div className="product-name">
          <h5>{product.brand}</h5>
          <h2>{product.title}</h2>
        </div>

        <p className="mt-4">{product.description}</p>

        {discountApplied ? 
          <div>
            <span className='main-price sale'>Sale {formatUSD(quantity * finalPrice)}</span> 
            <span className='cut-price size-big mb-0 ms-3'>{formatUSD(quantity * product.price)}</span>
          </div>
        : 
        <span className='main-price'>{formatUSD(quantity * finalPrice)}</span> 
        }
        <QuantityUpdater productId={product.id} quantity={quantity} handleIncrease={handleIncrease} handleDecrease={handleDecrease} size = {'big'}/>

        <div className="d-grid gap-3 mb-5">

          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSucess(false)} dismissible>
              ✔️ {product.title} added to cart!
            </Alert>
          )}
          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            ❗ You've reach the limit for {product.title}!
            </Alert>
          )}

          <Button variant="danger" size="lg" onClick={handleAddToCart}>Add To Cart</Button>
          <Button variant="outline-secondary" size="lg" onClick={handleBuyToCart}>Buy Now</Button>{' '}
        </div>

      </div>
      
    </div>
  )
}

export default Product
