import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookDetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);
    console.log(data);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, [params.bookId, firebase]);

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data, firebase]);

    if (data == null) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" />
        </Container>
    );

    return (
        <Container className="mt-5">
            <Row>
                <Col md={8} className="mx-auto">
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title as="h1" className="mb-4">{data.name}</Card.Title>
                            <div className="d-flex justify-content-center">
                                <Card.Img 
                                    variant="top" 
                                    src={url} 
                                    alt="Book Cover" 
                                    style={{ width: '600px', height: '600px', objectFit: 'cover', borderRadius: '10px' }} 
                                />
                            </div>
                            <Card.Text as="h2" className="mt-4">Details</Card.Text>
                            <span style={{ fontWeight: 'bold' }}>Price:</span> Rs. {data.price} <br />
                            <span style={{ fontWeight: 'bold' }}>ISBN Number:</span> {data.isbn}<br />
                            <Card.Text as="h2">Owner Details</Card.Text>
                            <span style={{ fontWeight: 'bold' }}>Name:</span> {data.displayName}<br/>
                            <span style={{ fontWeight: 'bold' }}>Email:</span> {data.userEmail}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetailPage;
