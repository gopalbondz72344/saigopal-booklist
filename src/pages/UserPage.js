// UserPage.js
import React, { useState, useEffect } from 'react';
import { Container, Table,Button } from 'react-bootstrap';
import { useFirebase } from '../context/firebase';
import { Link } from 'react-router-dom';

const UserPage = () => {
    const firebase = useFirebase();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.listAllUsers().then((users) => setUsers(users));
    }, [firebase]);

    return (
        <Container className="mt-5">
            <h2>Users</h2>
            {users.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Book List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`/user/${user.userId}`}>
                                            <Button variant="primary">View</Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div>No users available.</div>
            )}
        </Container>
    );
}

export default UserPage;
