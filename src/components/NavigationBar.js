import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavigationBar = () => {
  return (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Adam's Sizzle and Serve</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/page2">New Recipes</Nav.Link>
              <Nav.Link href="/page3">Saved Recipes</Nav.Link>
              <Nav.Link href="/page4">Kitchen tips</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
  );
};

export default NavigationBar;