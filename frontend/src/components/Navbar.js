import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


const Navbars = () => {

    const [searchBarWidth, setSearchBarWidth] = useState('500px');

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 610){
                setSearchBarWidth('100%')
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
                <Link to="/" className="nav-link px-0 logo">B-commerce</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Form className="mx-auto my-2 my-lg-0 searchbar">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: searchBarWidth }} />
                </Form>
                <Nav className="ml-auto">
                    <Link to="/" className="nav-link">Sign In</Link>
                    <Link to="/" className="nav-link px-0"><FontAwesomeIcon icon={faCartShopping} /></Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navbars