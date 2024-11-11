import React, { useState } from "react";

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false); // State untuk menangani mode login atau register

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const url = isRegisterMode
                ? 'http://localhost:3003/api/auth/register'
                : 'http://localhost:3003/api/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(isRegisterMode ? 'Gagal mendaftarkan pengguna baru!' : 'Email atau Password salah!');
            }

            const data = await response.json();

            if (isRegisterMode) {
                alert('Registrasi berhasil! Silakan login.');
                setIsRegisterMode(false); // Kembali ke mode login setelah registrasi berhasil
            } else {
                // Simpan token yang diterima saat login
                localStorage.setItem('token', data.token);
                onLogin(true); // Panggil callback onLogin dengan status login true
                alert('Login berhasil!');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
                type="submit"
                className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition duration-200"
            >
                {isRegisterMode ? "Register" : "Login"}
            </button>
            <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-purple-500 underline"
            >
                {isRegisterMode ? "Sudah punya akun? Login" : "Belum punya akun? Register"}
            </button>
        </form>
    );
}

export default LoginForm;
