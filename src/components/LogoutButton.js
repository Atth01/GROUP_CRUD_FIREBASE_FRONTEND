import React from "react";

function LogoutButton({ onLogout }) {
    const handleLogout = () => {
        // Hapus token dari localStorage
        localStorage.removeItem("token");

        // Panggil fungsi onLogout untuk memperbarui status login di aplikasi
        onLogout();
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
            Logout
        </button>
    );
}

export default LogoutButton;
