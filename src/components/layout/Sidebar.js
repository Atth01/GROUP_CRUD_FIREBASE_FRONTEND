import React, { useState } from "react";
import {
    HomeIcon,
    UserIcon,
    CogIcon,
    QuestionMarkCircleIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon, // Ikon menu untuk buka/tutup sidebar
    XMarkIcon  // Ikon untuk menutup sidebar
} from "@heroicons/react/24/solid";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false); // State untuk membuka atau menutup sidebar

    return (
        <div className="relative">
            {/* Tombol untuk membuka sidebar */}
            <button
                className="p-2 text-white bg-purple-800 fixed top-4 left-4 z-20"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                ) : (
                    <Bars3Icon className="w-6 h-6" />
                )}
            </button>

            {/* Sidebar */}
            <div
                className={`bg-purple-800 text-white w-64 p-5 fixed top-0 left-0 h-full transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <h2 className="text-xl font-bold mb-5">Menu</h2>
                <ul>
                    <li className="mb-4 flex items-center hover:text-purple-300">
                        <HomeIcon className="w-5 h-5 mr-2" />
                        <a href="#">Dashboard</a>
                    </li>
                    <li className="mb-4 flex items-center hover:text-purple-300">
                        <UserIcon className="w-5 h-5 mr-2" />
                        <a href="#">Profile</a>
                    </li>
                    <li className="mb-4 flex items-center hover:text-purple-300">
                        <CogIcon className="w-5 h-5 mr-2" />
                        <a href="#">Settings</a>
                    </li>
                    <li className="mb-4 flex items-center hover:text-purple-300">
                        <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
                        <a href="#">Help</a>
                    </li>
                    <li className="mb-4 flex items-center hover:text-purple-300">
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        <a href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
