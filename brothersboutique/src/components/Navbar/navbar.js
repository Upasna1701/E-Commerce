import React, { Component, useEffect, useState  } from 'react';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button,Container} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link, NavLink} from 'react-router-dom';
import Login from './Login';
import { useHistory } from 'react-router-dom';
import { FaHeart,FaRegHeart,FaShoppingBag,FaSignOutAlt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import './navElements.css';
import axios from "axios";

 function Navbarheader() {
    
    const [mensubcategory, setmensubcategory] = useState([]);
    const [womensubcategory, setwomensubcategory] = useState([]);
    const [kidssubcategory, setkidssubcategory] = useState([]);
    const [wishdatawish, setwishdatawish] = useState();
    const [checkcartdata, setcheckcartdata] = useState();
    const [username, setusername] = useState();

    const [token, settoken] = useState();

    const fetchsubcategory = async () => {
        const data={
            showallcat : "yes",
            userid:localStorage.getItem("userid"),
        }
        let response = await axios.post('http://localhost/E-Commerce/brothers/product.php',data)
        return  { 
                    success: true,
                    mendata: response.data.findsubman, 
                    womendata : response.data.findsubwomen, 
                    kidsdata :  response.data.findsubkids,
                    findusername :  response.data.findusername
                };
    }

    useEffect(() => {
        (async () => {
          let res = await fetchsubcategory();
          if (res.success) {
            console.log(res.mendata)
            setmensubcategory(res.mendata);
            setwomensubcategory(res.womendata);
            setkidssubcategory(res.kidsdata);
            setusername(res.findusername);
            settoken(localStorage.getItem('token'));
          }
        })();

        const data={
            userid:localStorage.getItem("userid"),
            checkwish:"yes",
        }
        axios.post('http://localhost/E-Commerce/brothers/wishlist.php',data)
        .then(res => {
            setwishdatawish(res.data.wishmatchwishlist.wishlist);
            console.log(res.data.wishmatchwishlist.wishlist);
        })

        const cartdata={
            userid:localStorage.getItem("userid"),
            checkcartdata:"yes",
        }
        axios.post('http://localhost/E-Commerce/brothers/cart.php',cartdata)
        .then(res => {
            setcheckcartdata(res.data.getcartcount);
            console.log(res.data.getcartcount);
        })
      }, []);

    const gotonewpage = (titlepage,subc,cat)=>{
        console.log(titlepage+"/"+subc+"/"+cat);
        history.push("/"+titlepage+"/"+subc+"/"+cat);
    };

    const [show, setShowmen] = useState(false);
    const [showwomen, setShowwomen] = useState(false);
    const [showkids, setShowkids] = useState(false);  
    const showDropdownmen = (e)=>{
        setShowmen(!show);
    }
    const hideDropdown = e => {
        setShowmen(false);
        setShowwomen(false);
        setShowkids(false);
    }
    const showDropdownwomen = (e)=>{
        setShowwomen(!showwomen);
    }
    const showDropdownkids = (e)=>{
        setShowkids(!showkids);
    }
    const history = useHistory();
    
    const logout =() =>{
        localStorage.clear();
        settoken(localStorage.getItem('token'));
        history.push('/')
    }
    const gotowishlist = () =>{ 
        var aa = localStorage.getItem('token');
        if(aa == "loggedIn"){
            history.push('/Wishlist')
            return
        }
        else{
            history.push('/Login')
            return
        }
    } 
       
    const gotocart =() =>{
        history.push('/Cart')
    }

    const gotoorderdetails = () =>{
        history.push('/Userorder')
    }

    const [myOptions, setMyOptions] = useState([])
    const [searchvalue, setsearchvalue] = useState([])
    const editsearch=(e)=>{
        setsearchvalue(e.target.value);
        console.log(e.target.value)
        if(e.target.value != ''){
            const searchdata={
                sd : searchvalue
            }
            axios.post('http://localhost/E-Commerce/brothers/appjs.php',searchdata)
            .then(res => {
                setMyOptions(res.data.searchresult);
                console.log(res.data.searchresult);
            })
        }
        else {
            setMyOptions([]);
        }
    }


    return (
        <div>
            <Navbar collapseOnSelect expand="lg" style={{padding:"5px",borderBottom:"1px solid grey"}}>
                <Container>
                    <Navbar.Brand  as={Link} to={'/'}>Brothers Boutique</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown className="navli"  title="MEN" show={show} onMouseEnter={showDropdownmen} onMouseLeave={hideDropdown}>
                            {
                                    mensubcategory.map((item,index)=>{
                                        return(                                
                                            <NavDropdown.Item key={index} value={item.subcategory_id} onClick={ () => gotonewpage(item.category+"/"+item.product_name,item.subcategory_id,item.product_for_id)}>{item.product_name}</NavDropdown.Item>
                                        )
                                    })
                                }
                            </NavDropdown>
                            <NavDropdown className="navli" title="WOMEN" show={showwomen} onMouseEnter={showDropdownwomen} onMouseLeave={hideDropdown}>
                                {
                                    womensubcategory.map((item,index)=>{
                                        return(
                                            <NavDropdown.Item key={index} value={item.subcategory_id} onClick={ () => gotonewpage(item.category+"/"+item.product_name,item.subcategory_id,item.product_for_id)}>{item.product_name}</NavDropdown.Item>
                                        )
                                    })
                                }
                            </NavDropdown>
                            <NavDropdown className="navli" title="KIDS" show={showkids} onMouseEnter={showDropdownkids} onMouseLeave={hideDropdown}>
                                {
                                    kidssubcategory.map((item,index)=>{
                                        return(
                                            <NavDropdown.Item key={index} value={item.subcategory_id} onClick={ () => gotonewpage(item.category+"/"+item.product_name,item.subcategory_id,item.product_for_id)}>{item.product_name}</NavDropdown.Item>
                                        )
                                    })
                                }
                            </NavDropdown>
                        </Nav>
                        <Nav style={{alignItems:"center"}}>
                            <Form className="filterBlock" style={{height:"40px"}}>
                                <FormControl
                                    type="search"
                                    onChange={editsearch}
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchvalue}
                                />
                            <ul>
                                {
                                    myOptions.map((item,index) => {
                                        return (
                                            <li key={index} onClick={ () => gotonewpage(item.category+"/"+item.product_name,item.subcategory_id,item.product_for_id)}>{item.product_name}<span style={{color:"grey",cursor:"pointer"}}>for <b>{item.category}</b></span></li>
                                        )
                                    })
                                }
                            </ul>
                            </Form> 
                            <div style={{display:"flex"}}>
                                { token ?
                                <>
                                <Navbar.Brand onClick={() => gotowishlist()}>
                                {                            
                                    wishdatawish ? (
                                    <>
                                        <FaHeart className='navicons' style={{color:"red"}}/>
                                    </>
                                    ) :
                                    (
                                    <>
                                        <FaRegHeart className='navicons'/>  
                                    </>
                                    )
                                } 
                                </Navbar.Brand>
                                <Navbar.Brand onClick={() => gotocart()}><FaShoppingBag className='navicons'/><span className='cartspan'>{checkcartdata}</span></Navbar.Brand>
                                <NavDropdown className="navli"  title={<BsFillPersonFill className='navicons' style={{color:"#000",paddingTop:"0 !important"}}/>}style={{display:"flex",alignItems:"end"}}>
                                            <NavDropdown.Item style={{background:"#dddcdc"}}>Hi {username}</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => gotowishlist()}>My Wishlist</NavDropdown.Item>
                                            <NavDropdown.Item onClick={()=>gotoorderdetails()}>My Orders</NavDropdown.Item>
                                </NavDropdown>
                                <Navbar.Brand onClick={() => logout()}><FaSignOutAlt className='navicons'/></Navbar.Brand>
                                </>
                                :
                                <>
                                <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                                <Navbar.Brand onClick={() => gotowishlist()}><FaRegHeart className='navicons'/></Navbar.Brand>
                                <Navbar.Brand onClick={() => gotocart()}><FaShoppingBag className='navicons'/></Navbar.Brand>                       
                                </>
                                }
                            </div>
                            
                        </Nav>                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>
      </div>
    )
  }
export default Navbarheader;
