import React, { useState, useEffect } from "react";

const Students = () => {
    // State untuk menyimpan data mahasiswa dan status loading
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editStudent, setEditStudent] = useState(null); // Untuk mengedit data mahasiswa
    const [isModalOpen, setIsModalOpen] = useState(false); // Untuk modal
    const [newStudent, setNewStudent] = useState({
        npm: '',
        name: '',
        major: ''
    }); // Untuk form mahasiswa baru

    // Mengambil data mahasiswa dari API
    const fetchStudents = async () => {
        try {
            const response = await fetch("http://localhost:3003/api/students");
            const data = await response.json();
            console.log("Data yang diterima:", data);
            setStudents(data.mahasiswa);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching students:", error);
            setIsLoading(false);
        }
    };

    // Memanggil fetchStudents saat komponen pertama kali dimuat
    useEffect(() => {
        fetchStudents();
    }, []);

    // Menghapus data mahasiswa
    const deleteStudent = async (id) => {
        try {
            const response = await fetch(`http://localhost:3003/api/students/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchStudents();
            }
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    // Menangani perubahan input pada form tambah/edit mahasiswa
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Menangani submit form untuk menambahkan atau mengedit mahasiswa
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editStudent ? 'PUT' : 'POST';
            const endpoint = editStudent
                ? `http://localhost:3003/api/students/${editStudent.npm}`
                : "http://localhost:3003/api/students";

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            if (response.ok) {
                fetchStudents();
                setIsModalOpen(false);
                setNewStudent({ npm: '', name: '', major: '' });
                setEditStudent(null); // Reset edit mode
            }
        } catch (error) {
            console.error("Error submitting student:", error);
        }
    };

    // Menangani klik tombol "Update" dan membuka modal dengan data yang dipilih
    const handleEditClick = (student) => {
        setEditStudent(student); // Set mahasiswa yang akan diedit
        setNewStudent(student); // Isi form dengan data mahasiswa yang dipilih
        setIsModalOpen(true); // Buka modal
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-4">Daftar Mahasiswa</h1>

            {/* Tombol untuk membuka modal tambah data */}
            <button
                onClick={() => {
                    setIsModalOpen(true);
                    setEditStudent(null); // Reset edit mode untuk tambah data
                    setNewStudent({ npm: '', name: '', major: '' }); // Reset form
                }}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200 mb-4"
            >
                Tambah Data Mahasiswa
            </button>

            {/* Tampilkan indikator loading jika data belum ada */}
            {isLoading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full border-4 border-t-4 border-gray-300 w-16 h-16 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-500">Loading...</p>
                </div>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-700">NPM</th>
                            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-700">Nama</th>
                            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-700">Jurusan</th>
                            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-700">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b text-sm text-gray-700">{student.npm}</td>
                                    <td className="py-3 px-4 border-b text-sm text-gray-700">{student.name}</td>
                                    <td className="py-3 px-4 border-b text-sm text-gray-700">{student.major}</td>
                                    <td className="py-3 px-4 border-b">
                                        <button
                                            onClick={() => handleEditClick(student)}
                                            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200 mr-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteStudent(student.npm)}
                                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">
                                    Tidak ada data mahasiswa
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Modal untuk tambah/edit mahasiswa */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            {editStudent ? "Edit Mahasiswa" : "Tambah Mahasiswa Baru"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">NPM:</label>
                                <input
                                    type="text"
                                    name="npm"
                                    value={newStudent.npm}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                    disabled={!!editStudent} // NPM tidak bisa diubah saat edit
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newStudent.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Jurusan:</label>
                                <input
                                    type="text"
                                    name="major"
                                    value={newStudent.major}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 w-full"
                            >
                                {editStudent ? "Update Mahasiswa" : "Tambah Mahasiswa"}
                            </button>
                        </form>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-200 w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;
