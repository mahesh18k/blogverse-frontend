import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './NavigationBar.css';


const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Unknown User');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
    }

    const fetchUserName = async () => {
      try {
        if (storedUserId) {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/username/${storedUserId}`);
          if (response.status === 200) {
            setUserName(response.data.userName);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserName();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const profilePopover = (
    <Popover id="popover-basic" className="profile-popover">
      <Popover.Header as="h3">Profile</Popover.Header>
      <Popover.Body className='popover-body-text'>
        <div>Name: {userName}</div>
        <Button href='/profile' className='mt-4' variant="outline-secondary"> My Blogs </Button>
        <Button className='mt-3' variant="danger" onClick={handleLogout}>Logout</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">BlogVerse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/blog">All Blogs</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/createblog">Create a Blog</Nav.Link>
                <OverlayTrigger trigger="click" placement="bottom" overlay={profilePopover} rootClose>
                  <Button variant="link" style={{ color: 'white', padding: 0, marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                  </Button>
                </OverlayTrigger>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;