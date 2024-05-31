import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure you import BrowserRouter as Router
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import MyNav from './components/Navbar';

// Pages
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/List';
import HomePage from './pages/Home';
import UserPage from './pages/UserPage';
import UserDetails from './pages/UserDetails';
import BookDetailPage from './pages/Details';

function App() {
    return (
        <Router> {/* Wrap your routes with Router */}
            <div>
                <MyNav />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/book/list" element={<ListingPage />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/user/:userId" element={<UserDetails />} />
                    <Route path="/books/view/:bookId" element={<BookDetailPage />} />
                    {/* Ensure your routes are properly defined */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
