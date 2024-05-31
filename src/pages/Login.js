import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFirebase } from '../context/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is imported

const LoginPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(firebase.isLoggedIn)
        {
            navigate("/")
        }
    }, [firebase,navigate])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in a user...");
        try {
            const result = await firebase.signinUserWithEmailAndPassword(email, password);
            console.log("Success!", result);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col xs={12} md={6} className="mx-auto">
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
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
                            Login
                        </Button>
                    </Form>
                    <div className="text-center mt-4 mb-4">OR</div>
                    <Button variant="danger" className="w-100 d-flex align-items-center justify-content-center" onClick={firebase.signinWithGoogle}>
                        <span className="material-icons" style={{ marginRight: '8px' }}>login</span> Sign in with Google
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
