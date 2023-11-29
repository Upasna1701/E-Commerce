import React, { Component , useState } from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link, NavLink} from 'react-router-dom';
import {FaSignOutAlt,FaAlignLeft,FaHome,FaProductHunt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {Sidebar} from './Sidebar';
import { useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import './admincss.css';

 function AdminNavbar() {
     const [sidebar, setSidebar] = useState(false);
     const [adminloggedIn, setadminloggedIn] = useState(false);
     const showSidebar = () => setSidebar(!sidebar);


     const token = localStorage.getItem("admintoken")

    // console.log(token);
    if(token == null){
        setadminloggedIn(false)
    }   

    const history = useHistory();

    const logout =() =>{
        localStorage.clear();
        history.push('/Admin/')
    }

    return (
            <div>
                <IconContext.Provider value={{color:"#fff"}}>
                <div className='navbar admin-navbar'>
                <div className='header-top'>
                    <Link to ='#' className='menu-bars'>
                        {/* <FaAlignLeft onClick={showSidebar} /> */}
                    </Link>
                    
                    {/* <h5 className='logo'>Brothers Boutique</h5> */}
                    
                    </div>
                    <div className='top-icons'>
                    <BsFillPersonFill className='menu-bars'/>
                    <FaSignOutAlt className='menu-bars' onClick={() => logout()}/>
                    </div>
                </div>
      
                 
                <nav className={sidebar ? 'nav-menu ' : 'nav-menu active'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle'>
                    <h5 className='logo'>Brothers Boutique</h5>
                        </li>
                        {Sidebar.map((item, index) => {
                            return(
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>    
                                </li>
                            )                        
                        })}
                     
                    </ul>
                </nav>
                </IconContext.Provider>
      </div>
    )
  }
export default AdminNavbar;
