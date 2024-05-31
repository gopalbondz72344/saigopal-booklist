// BookCard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useFirebase } from '../context/firebase';

const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url));
      }, [firebase,props.imageURL]);
    console.log(props);
    return (
        <Card style={{ margin: '5px', textAlign: 'left' }}>
            <Card.Img variant="top" src={url} style={{ objectFit: 'cover', height: '200px' }} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    <span style={{ fontWeight: 'bold' }}>Author Name:</span> {props.displayName}<br />
                    <span style={{ fontWeight: 'bold' }}>Price:</span> Rs. {props.price}
                </Card.Text>
                <Button id={props.id} onClick={() => navigate(`/books/view/${props.id}`)} variant="primary">Book view</Button>
            </Card.Body>
        </Card>
    );
};

export default BookCard;
