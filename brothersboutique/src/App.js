import logo from "./logo.svg";
import React, { Component, useEffect,useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarheader from "./components/Navbar/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Navbar/Homepage";
import Footer from "./components/Navbar/Footer";
import Login from "./components/Navbar/Login";
import Mensclothing from "./components/Navbar/Mensclothing";
import Registration from "./components/Navbar/Registration";
import Wishlist from "./components/Navbar/Wishlist";
import Itemdetails from "./components/Navbar/Itemdetails";
import Cart from "./components/Navbar/Cart";
import Adminlogin from "./Admin/login";
import Dashboard from "./Admin/dashboard";
import Product from "./Admin/Product";
import Subproduct from "./Admin/Subcategory";
import Sideaccordian from "./components/Navbar/Sideaccordian";
import Logindetails from "./Admin/Logindetails";
import Orderdetails from "./Admin/Orderdetails";
import Newsidebar from "./Admin/Newsidebar";
import Returnexchange from "./Admin/Returnexchange";
import Clothings from "./components/Navbar/Clothings";
import Userorder from "./components/Navbar/Userorder";
import Paymentpage from "./components/Navbar/Paymentpage";
import Confirmationpage from "./components/Navbar/Confirmationpage";
import Returnpage from "./components/Navbar/Returnpage";
import Exchangeproduct from "./components/Navbar/Exchangeproduct";
import Editaddress from "./components/Navbar/Editaddress";
import axios from "axios";
import Ordertable from "./Admin/Datatables/orderdetailstable";

const fetchdata = async () => {
  const data={
    fetchcatsub : "yes"
  }
  let response = await axios.post('http://localhost/E-Commerce/brothers/appjs.php',data)
  return { 
    success: true, 
    mendata: response.data.findsubman, 
    findcategoryforapp: response.data.findcategoryforapp,
    finditemurl: response.data.findurl,
  };
}


function App() {

  const [mensubmenu, setmenmenu] = useState([]);
  const [findcategoryforapp, setfindcategoryforapp] = useState([]);
  const [finditemurl, setfinditemurl] = useState([]);
  
  useEffect(() => {
    (async () => {
      let res = await fetchdata();
      if (res.success) {
        console.log(res);
        setmenmenu(res.mendata);
        setfindcategoryforapp(res.findcategoryforapp);
        setfinditemurl(res.finditemurl);
      }
    })();
  },[]);
    
  return (    
      <Router>
        <Switch>
          <Route exact path="/Confirmationpage" component={Confirmationpage} />
          <Route exact path="/Returnpage" component={Returnpage} />
          <Route exact path="/Exchangeproduct" component={Exchangeproduct} />
          <Route exact path="/Editaddress" component={Editaddress} />
          {/* Admin interface */}
          {window.location.pathname.includes('/Admin/')? (
            <>
              <Route exact path="/Admin/" component={Adminlogin} />
              <Route exact path="/Admin/Dashboard" component={Dashboard} />
              <Route exact path="/Admin/Product" component={Product} />
              <Route exact path="/Admin/Subcategory" component={Subproduct} />
              <Route exact path="/Admin/Logindetails" component={Logindetails} />
              <Route exact path="/Admin/Orderdetails" component={Orderdetails} />
              <Route exact path="/Admin/Newsidebar" component={Newsidebar} />
              <Route exact path="/Admin/orderdetailstable" component={Ordertable} />
              <Route exact path="/Admin/Returnexchange" component={Returnexchange} />
            </>
          ) : (
            // {/* Admin interface */}
            
            // {/* User interface */}
            <>
              <Navbarheader />
              
              {
                mensubmenu.map((item,index)=>{
                    return( 
                      <Route key={index} exact path={`/${item.category+"/"+item.product_name}/:subcid/:catid`} component={Mensclothing} /> 
                    )
                })
              }
              {
                findcategoryforapp.map((item,index)=>{
                    return( 
                      <Route key={index} exact path={`/${item.category}/:catid`} component={Clothings} /> 
                    )
                })
              }
              {
                finditemurl.map((item,index)=>{
                    return( 
                      <Route key={index} exact path={`/p/${item.pathname}/:prid`} component={Itemdetails} />
                    )
                })
              }
              <Route exact path="/" component={Homepage} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Registration" component={Registration} />
              <Route exact path="/Userorder" component={Userorder} />
              <Route exact path="/Wishlist" component={Wishlist} />
              <Route exact path="/Cart" component={Cart} />
              <Route exact path="/Sideaccordian" component={Sideaccordian} />
              <Route exact path="/Paymentpage" component={Paymentpage} />
            </>
          )}
          {/* User interface */}
        </Switch>
      </Router>
    );
  }
  export default App;

