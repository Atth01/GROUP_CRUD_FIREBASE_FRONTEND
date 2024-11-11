import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Cek token di localStorage saat komponen pertama kali dimuat
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem("token", token); // Simpan token ke localStorage
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Hapus token dari localStorage
        setIsLoggedIn(false);
    };

    return (
        <div className='App'>
            {isLoggedIn ? (
                <DashboardPage onLogout={handleLogout} />
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
