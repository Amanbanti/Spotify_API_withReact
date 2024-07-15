import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import logo from '../assets/logo.png'
import  {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand >
                        <img src={logo} alt='ProShop' />
                        Famous Classical Songs
                    </Navbar.Brand>
                </LinkContainer>
             

                <Navbar.Toggle aria-controls='basic-navbar-nav' />

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'> 

                        <LinkContainer to='/about'>
                                <Nav.Link>
                                    <FaInfoCircle />
                                    About
                                </Nav.Link>
                        </LinkContainer>
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header;
