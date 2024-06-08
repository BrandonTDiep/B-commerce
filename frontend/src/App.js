import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages & components
import Home from './views/Home'
import Categories from './pages/Categories'

import Navbars from './components/Navbar'
// BroswerRouter wraps everywhere we want to use the router
// routes compoenents wraps all of individual routes and then the individual route component to create a single route and all of that comes from react router dom
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header><Navbars /></header>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/categories" element={<Categories />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
