import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faShop, } from '@fortawesome/free-solid-svg-icons';


const Navbars = () => {

    const [searchBarWidth, setSearchBarWidth] = useState('500px')
    const [searchQuery, setSearchQuery] = useState("")

    function handleSearchChange(){
        setSearchQuery(searchQuery)
    }

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 900){
                setSearchBarWidth('370px')
            }
            else{
                setSearchBarWidth('500px')
            }
        }
        
        window.addEventListener('resize', handleResize)

        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return(
        <Navbar expand="md" className='nav'>
            <Navbar.Brand>       
                <Link to="/" className="nav-link px-0 logo"><FontAwesomeIcon className="pl-1" icon={faShop} /> B-commerce</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Form className="mx-auto my-2 my-lg-0 searchbar">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: searchBarWidth }} onChange={handleSearchChange} />
                </Form>
                <Nav className="ml-auto">
                    <Link to="/categories/all" className="nav-link">Categories</Link>

                    <Link to="/" className="nav-link">Sign In</Link>
                    <Link to="/" className="nav-link px-0"><FontAwesomeIcon icon={faCartShopping} /></Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navbars