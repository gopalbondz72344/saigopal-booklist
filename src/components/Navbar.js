import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/firebase';

const MyNav = () => {
    const { user, logout } = useFirebase();

    const handleLogout = async () => {
        await logout();
        window.location.reload();  // Refresh the page to update the UI
    };

    return (
        <Navbar expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Mepstra</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {user && <Nav.Link href="/book/list">Add Listing</Nav.Link>}
                    {user && <Nav.Link href="/users">List of all Users</Nav.Link>}
                </Nav>
                {user ? (
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                ) : (
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
}

export default MyNav;
