import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Categories from './pages/Categories'
import Product from './pages/Product'
import Search from './pages/Search'
import Cart from './pages/Cart'
import Navbars from './components/Navbar'


// BroswerRouter wraps everywhere we want to use the router
// routes compoenents wraps all of individual routes and then the individual route component to create a single route and all of that comes from react router dom
function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <header className='header-nav'><Navbars /></header>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/categories/:category" element={<Categories />}/>
            <Route path="/categories/product/:productId" element={<Product />}/>
            <Route path="/search/:searchQuery" element={<Search />}/>
            <Route path="/cart" element={<Cart />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
