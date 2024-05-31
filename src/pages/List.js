import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useFirebase } from "../context/firebase";

const ListingPage = () => {
    const firebase = useFirebase();
    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
            setAlertMessage("The book is added to the database.");
            setShowAlert(true);
            setName("");
            setIsbnNumber("");
            setPrice("");
            setCoverPic(null);
        } catch (error) {
            setAlertMessage(`Failed to add book: ${error.message}`);
            setShowAlert(true);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col xs={12} md={6} className="mx-auto">
                    <h2 className="text-center mb-4">Add Book List</h2>
                    {showAlert && (
                        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                            {alertMessage}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBookName">
                            <Form.Label>Enter Book Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Book Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formIsbnNumber">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                onChange={(e) => setIsbnNumber(e.target.value)}
                                value={isbnNumber}
                                type="text"
                                placeholder="ISBN Number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                type="text"
                                placeholder="Enter Price"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCoverPic">
                            <Form.Label>Cover Pic</Form.Label>
                            <Form.Control
                                onChange={(e) => setCoverPic(e.target.files[0])}
                                type="file"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ListingPage;
