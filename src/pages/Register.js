import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFirebase } from '../context/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is imported

const RegisterPage = () => {
    const firebase = useFirebase();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Signing up a user...');
        try {
            const result = await firebase.signupUserWithEmailAndPassword(email, password);
            await firebase.addUserDetails(result.user.uid, {
                firstName,
                lastName,
                email
            });
            console.log("Successful", result);
            alert('Registration successful!');
            // Reset form
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            // Manually set user to null to reflect the registration state
            firebase.setUser(null);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col xs={12} md={6} className="mx-auto">
                    <h2 className="text-center mb-4">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                type="text"
                                placeholder="Enter First Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                type="text"
                                placeholder="Enter Last Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            <span className="material-icons" style={{ marginRight: '8px' }}>person_add</span> Create Account
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
