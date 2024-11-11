import React from "react";
import { HomeIcon, UserIcon, CogIcon, QuestionMarkCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

function Sidebar() {
    return (
        <div className="bg-purple-800 text-white w-64 p-5">
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
    );
}

export default Sidebar;
