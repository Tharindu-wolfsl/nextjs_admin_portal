'use client'
import { MdHome,MdAddTask } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { PiLinkSimpleBold } from "react-icons/pi";


import Link from 'next/link'
import { useState } from 'react'
import {AiOutlineClose, AiOutlineDashboard, AiOutlineLogout, AiOutlineMenu, AiOutlineSetting, AiOutlineUser} from 'react-icons/ai'
import '/src/app/css/common.css'
const navElements = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: <MdHome className='w-6 h-6 mr-2' />
    },
    {
        title: 'Account activation',
        href: '/admin/accountActivation',
        icon: <MdAddTask className='w-6 h-6 mr-2' />,
    },
    {
        title: 'Transactions',
        href: '/admin/transactions',
        icon: <GrTransaction className='w-6 h-6 mr-2' />
    },
    {
        title: 'Payment links',
        href: '/admin/paymentLinks',
        icon: <PiLinkSimpleBold className='w-6 h-6 mr-2' />
    },
    {
        title: 'QR payment',
        href: '/admin/qaPayments',
        icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    },
    {
        title: 'Integrations',
        href: '/admin/integrations',
        icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    },
    {
        title: 'Teams',
        href: '/admin/teams',
        icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    },
    {
        title: 'Audit log',
        href: '/admin/auditLog',
        icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    },
    {
        title: 'Settings',
        href: '/admin/settings',
        icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    },
    // {
    //     title: 'Settings',
    //     href: '/admin/settings',
    //     icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    // },
    // {
    //     title: 'Settings',
    //     href: '/admin/settings',
    //     icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    // },
    // {
    //     title: 'Settings',
    //     href: '/admin/settings',
    //     icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    // }, {
    //     title: 'Settings',
    //     href: '/admin/settings',
    //     icon: <AiOutlineUser className='w-6 h-6 mr-2' />
    // },


]

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <div className={`h-screen bg-slate-800 text-slate-50 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
            <div className="flex items-center justify-between h-20 bg-slate-800 p-4">
                {
                    !isCollapsed && (
                        <h1 className="text-lg md:text-2xl font-bold italic lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#04334D] to-[#01ACED]">
                            PayPlus
                        </h1>
                    )
                }
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className='text-gray-900 focus:outline-none'
                >
                    {isCollapsed ? <AiOutlineMenu size={24} /> : <AiOutlineClose size={24} />}
                </button>
            </div>
            <div className='flex-1 flex flex-col justify-between overflow-y-auto'>
                <nav className='mt-10'>
                    {
                        navElements.map((navElement) => (
                            <Link href={navElement.href} key={navElement.title}>
                                <div className={`flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-blue-200 ${isCollapsed ? 'justify-center' : ''}`}>
                                    {navElement.icon}
                                    <span className={`ml-2 transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                        {!isCollapsed && navElement.title}
                                    </span>
                                </div>
                            </Link>
                        ))
                    }
                </nav>
                <div className='mb-10 transition-opacity duration-300 delay-300'>
                    <button className='flex items-center py-2.5 px-4 w-full text-left rounder transition duration-300 hover:bg-red-700 hover:text-white'>
                        <AiOutlineLogout className='w-6 h-6 mr-2' />
                        <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            {
                                !isCollapsed && "Log Out"
                            }
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar