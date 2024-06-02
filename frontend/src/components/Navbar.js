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
        <Navbar bg="light" expand="md" className='px-5'>
            <Navbar.Brand>
                <Link to="/" className="nav-link">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Form className="mx-auto my-2 my-lg-0 searchbar">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: searchBarWidth }} />
                </Form>
                <Nav className="ml-auto">
                    <Link to="/" className="nav-link">Sign In</Link>
                    <Link to="/" className="nav-link"><FontAwesomeIcon icon={faCartShopping} /></Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navbars