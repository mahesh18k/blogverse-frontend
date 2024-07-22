import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userData = {
    name: "John Doe"
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
    }
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
        <div>Name: {userData.name}</div>
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