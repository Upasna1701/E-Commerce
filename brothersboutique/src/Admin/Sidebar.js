import React from 'react';
import {FaHome,FaProductHunt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

export const Sidebar =[
    {
        title: 'User Details',
        path: '/Admin/Logindetails',
        icon:<FaProductHunt/>,
        cName:'nav-text'
    },
    {
        title: 'Home',
        path: '/Admin/Dashboard',
        icon:<FaHome/>,
        cName:'nav-text'
    },
    {
        title: 'Product',
        path: '/Admin/Product',
        icon:<FaProductHunt/>,
        cName:'nav-text'
    },
    {
        title: 'Sub category',
        path: '/Admin/Subcategory',
        icon:<FaHome/>,
        cName:'nav-text'
    },
    {
        title: 'Order Details',
        path: '/Admin/Orderdetails',
        icon:<BsFillPersonFill/>,
        cName:'nav-text'
    },
    {
        title: 'Order',
        path: '/',
        icon:<FaProductHunt/>,
        cName:'nav-text'
    },
    {
        title: 'Return & Exchange',
        path: '/Admin/Returnexchange',
        icon:<FaProductHunt/>,
        cName:'nav-text'
    },
]