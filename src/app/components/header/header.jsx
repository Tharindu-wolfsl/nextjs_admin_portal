'use client';

import { useState } from 'react';
import { FiSearch, FiSun, FiMoon } from 'react-icons/fi'; // Import icons
import profileImage from '/public/images/profile.png';
import '/src/app/css/common.css';

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <header className="flex items-center justify-between p-4 bg-slate-800 border-b border-gray-300">
            <div className="flex items-center px-4 py-2 shadow-md md:px-6 md:py-3 lg:px-8 lg:py-4">
                <FiSearch className="text-gray-400 mr-2" size={20}/>
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                />
            </div>

            <div className="flex items-center gap-4">
                {/* Toggle Button with Icons */}
                <button
                    onClick={toggleDarkMode}
                    className={`flex items-center justify-center w-16 h-8 rounded-full ${
                        darkMode ? 'bg-blue-600' : 'bg-gray-300'
                    } transition-all duration-300`}
                >
                    {darkMode ? (
                        <FiMoon className="text-white" size={20} />
                    ) : (
                        <FiSun className="text-yellow-500" size={20} />
                    )}
                </button>

                {/* Profile Image */}
                <img
                    src={profileImage.src}
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                />
            </div>
        </header>
    );
}
