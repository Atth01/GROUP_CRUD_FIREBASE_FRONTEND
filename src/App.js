import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);

            // Ambil email dari token atau dari API jika tersedia
            const storedEmail = localStorage.getItem("userEmail");
            if (storedEmail) {
                setUserEmail(storedEmail);
            }
        }
    }, []);

    const handleLogin = (token, email) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        setUserEmail(email);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserEmail('');
    };

    return (
        <div className='App'>
            {isLoggedIn ? (
                <DashboardPage onLogout={handleLogout} userEmail={userEmail} />
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
