// UserDetailsPage.js
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useFirebase } from '../context/firebase';
import { useParams } from 'react-router-dom';
import BookCard from '../components/Card'; // Ensure the correct import path

const UserDetails = (props) => {
    const firebase = useFirebase();
    const [userDetails, setUserDetails] = useState(null);
    const [userBooks, setUserBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useParams();
    console.log(props)
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const details = await firebase.getUserDetails(userId);
                setUserDetails(details);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchUserBooks = async () => {
            try {
                setLoading(true);
                const books = await firebase.getUserBooks(userId);
                setUserBooks(books);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserDetails();
            fetchUserBooks();
        }
    }, [firebase, userId]);
    console.log(userDetails)
    return (
        <Container className="mt-5">
            {loading && <p>Loading user details...</p>}
            {error && <p>Error: {error}</p>}
            {userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p>User ID: {userDetails.userId}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>First Name: {userDetails.firstName}</p>
                    <p>Last Name: {userDetails.lastName}</p>
                </div>
            )}
            <h2>User Books</h2>
            {userBooks.length > 0 ? (
                <div className="d-flex flex-wrap justify-content-start">
                    {userBooks.map((book, index) => (
                        <BookCard key={index} {...book} />
                    ))}
                </div>
            ) : (
                <p><strong>Author did not add any books!</strong></p>
            )}
        </Container>
    );
};

export default UserDetails;
