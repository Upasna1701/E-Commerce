import React, { Component } from 'react';
import manimg from '../../images/man.jpg';
import womenimg from '../../images/women.jpg';
import topimg from '../../images/topbanner.jpg';
import footimg from '../../images/footerbanner.jpg';
import { FaFacebook,FaInstagram,FaTwitter,FaSnapchatGhost,FaPinterestP,FaApple } from "react-icons/fa";
import './navElements.css';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state={
            width: window.innerWidth,
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    clothingmen = () => {
        this.props.history.push("Mens"+"/"+"1");
    }

    clothingwomen = () => {
        this.props.history.push("Womens"+"/"+"2");
    }
  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (!isMobile) {
        return (     
            <div className='homebody'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12' style={{paddingLeft:"0",paddingRight:"0"}}>
                            <img className="mainimg" src={topimg}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6' style={{paddingLeft:"0",paddingRight:"0",position:"relative"}} onClick={this.clothingmen}>
                            <img className="mainimg" src={manimg}/>
                            <h3 className='shoptext'style={{right:"5%"}}>Shop Men</h3>
                        </div>
                        <div className='col-md-6'style={{paddingLeft:"0",paddingRight:"0",position:"relative"}} onClick={this.clothingwomen}>
                            <img className="mainimg" src={womenimg}/>
                            <h3 className='shoptext' style={{left:"5%"}}>Shop Women</h3>
                        </div>
                    </div>  
                    <div className='row'>
                        <div className='col-md-12' style={{paddingLeft:"0",paddingRight:"0"}}>
                        <img className="mainimg" src={footimg}/>
                        </div>
                    </div>      
                </div>
                <div className='homefooter'>
                    <div className='container-fluid'>
                        <div className='container' style={{paddingTop:"95px"}}>
                            <div className='row'>
                                <h5 style={{padding:"0 0 10px 70px"}}>Brothers Boutique</h5>
                                <div className='col-sm-6 col-md-3 footcol'>
                                    <ul>
                                        <li style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>CUSTOMER SERVICE</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                    </ul>                 
                                </div>
                                <div className='col-sm-6 col-md-3 footcol'>
                                    <ul>
                                    <li style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>About Us</li>
                                        <li>We're Hiring</li>
                                        <li>Terms & Conditions</li>
                                        <li>Privacy Policy</li>
                                        <li>Blog</li>
                                    </ul>                
                                </div>
                                <div className='col-sm-6 col-md-3 footcol'>
                                    <ul>
                                        <li style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>CONNECT WITH US</li>
                                        <li><FaFacebook style={{marginRight:"10px"}}/>Contact Us</li>
                                        <li><FaInstagram style={{marginRight:"10px"}}/>Track Order</li>
                                        <li><FaSnapchatGhost/>
                                        <FaPinterestP className='icon'/>
                                        <FaApple className='icon'/>
                                        <FaTwitter className='icon'/></li>
                                    </ul>              
                                </div>
                                <div className='col-sm-6 col-md-3 footcol'>
                                    <ul>
                                        <li style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>KEEP UP TO DATE</li>
                                        <li>We're Hiring</li>
                                        <li>Terms & Conditions</li>
                                        <li>Privacy Policy</li>
                                        <li>Blog</li>
                                    </ul>                   
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6 col-md-3 footcol'>
                                    <p style={{marginBottom:"0"}}>15 days return policy</p>
                                        <p>Cash on Delivery<span style={{color:"#000"}}>aaa</span></p>
                                    </div>
                                    <div className='col-sm-6 col-md-3 footcol'>
                                    <p style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>Download the app</p>
                                    </div>
                                    <div className='col-sm-6 col-md-3 footcol'>
                                    <p style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>100% secure payment</p>
                                    </div>
                                    <div className='col-sm-6 col-md-3 footcol'></div> 
                                </div>                   
                            </div>
                            <hr className='footborder'/>
                            <div className='row' style={{paddingTop:"15px"}}>
                                <div className='col-sm-6 col-md-3 footcol'>
                                    <ul>
                                        <li style={{color:"orange",fontSize:"21px",marginBottom:"10px"}}>Mens clothing</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                    </ul>                   
                                </div>
                                <div className='col-sm-6 col-md-3  footcol'>
                                    <ul>
                                        <li style={{color:"orange",fontSize:"21px",marginBottom:"10px"}}>Womens clothing</li>
                                        <li>We're Hiring</li>
                                        <li>Terms & Conditions</li>
                                        <li>Privacy Policy</li>
                                        <li>Blog</li>
                                        <li>We're Hiring</li>
                                        <li>Terms & Conditions</li>
                                        <li>Privacy Policy</li>
                                        <li>Blog</li>
                                        <li>We're Hiring</li>
                                        <li>Terms & Conditions</li>
                                        <li>Privacy Policy</li>
                                        <li>Blog</li>
                                        <li>We're Hiring</li>
                                        <li>Terms & Conditions</li>
                                        <li>Privacy Policy</li>
                                        <li>Blog</li>
                                    </ul>                   
                                </div>
                                <div className='col-sm-6 col-md-3 footcol'>
                                    <ul>
                                        <li style={{color:"orange",fontSize:"21px",marginBottom:"10px"}}>Kids clothing</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                        <li>Contact Us</li>
                                        <li>Track Order</li>
                                        <li>Return Order</li>
                                        <li>Cancel Order</li>
                                    </ul>                   
                                </div>
                                <div className='col-sm-6 col-md-3 footcollast'>
                                    <ul>
                                        <li>FANBOOK</li>
                                        <li>OFFERS</li>
                                        <li>SITEMAP</li>
                                    </ul>                   
                                </div>
                            </div>
                            <div className='row' style={{justifyContent:"center"}}>
                                <div className='col-md-11' style={{paddingLeft: "40px"}}>
                                <h5 style={{fontSize:"21px"}}>What is Lorem Ipsum?</h5>
                                <p style={{fontSize:"18px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                                <div className='col-md-11' style={{paddingLeft: "40px"}}>
                                <h5 style={{fontSize:"21px"}}>Why do we use it?</h5>
                                <p style={{fontSize:"18px"}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                </div>
                                <div className='col-md-11' style={{paddingLeft: "40px"}}>
                                <h5 style={{fontSize:"21px"}}>Where does it come from?</h5>
                                <p style={{fontSize:"18px"}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                                </div>
                                <div className='col-md-11' style={{paddingLeft: "40px"}}>
                                <h5 style={{fontSize:"21px"}}>Where can I get some?</h5>
                                <p style={{fontSize:"18px"}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <>
                <div className='homefooter'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-6' style={{paddingLeft:"0",paddingRight:"0",position:"relative"}} onClick={this.clothingmen}>
                                <img className="mainimg" src={manimg}/>
                                {/* <h3 className='shoptext'style={{right:"5%"}}>Shop Men</h3> */}
                            </div>
                            <div className='col-6'style={{paddingLeft:"0",paddingRight:"0",position:"relative"}} onClick={this.clothingwomen}>
                                <img className="mainimg" src={womenimg}/>
                                {/* <h3 className='shoptext' style={{left:"5%"}}>Shop Women</h3> */}
                            </div>
                        </div> 
                        <div className='container' style={{paddingTop:"20px"}}>
                            <div className='row'>
                                {/* <h5 style={{padding:"0 0 10px 70px"}}>Brothers Boutique</h5> */}
                                <div className='col-12 mobile-footcol'>
                                    <span className="mobile-footspan">CUSTOMER SERVICE</span>
                                    <ul>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                    </ul>                 
                                </div>
                                <div className='col-12 mobile-footcol'>
                                    <span className="mobile-footspan">About Us</span>
                                    <ul>
                                        <li><a>We're Hiring</a></li>
                                        <li><a>Terms & Conditions</a></li>
                                        <li><a>Privacy Policy</a></li>
                                        <li><a>Blog</a></li>
                                    </ul>                
                                </div>
                                <div className='col-12 mobile-footcol'>
                                    <span className="mobile-footspan">CONNECT WITH US</span>
                                    <ul>
                                        <li><FaFacebook className='icon'/>
                                        <FaInstagram className='icon'/>
                                        <FaSnapchatGhost className='icon'/>
                                        <FaPinterestP className='icon'/>
                                        <FaApple className='icon'/>
                                        <FaTwitter className='icon'/></li>
                                    </ul>              
                                </div>
                                <div className='col-12 mobile-footcol'>
                                    <span className="mobile-footspan">KEEP UP TO DATE</span>
                                    <ul>
                                        <li><a>We're Hiring</a></li>
                                        <li><a>Terms & Conditions</a></li>
                                        <li><a>Privacy Policy</a></li>
                                        <li><a>Blog</a></li>
                                    </ul>                   
                                </div>
                                {/* <div className='row'>
                                    <div className='col-12 mobile-footcol'>
                                    <p style={{marginBottom:"0"}}>15 days return policy</p>
                                        <p>Cash on Delivery<span style={{color:"#000"}}>aaa</span></p>
                                    </div>
                                    <div className='col-12 mobile-footcol'>
                                    <p style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>Download the app</p>
                                    </div>
                                    <div className='col-12 mobile-footcol'>
                                    <p style={{color:"orange",fontSize:"16px",marginBottom:"10px"}}>100% secure payment</p>
                                    </div>
                                    <div className='col-12 mobile-footcol'></div> 
                                </div>                    */}
                            </div>
                            <hr className='footborder'/>
                            <div className='row' style={{paddingTop:"15px"}}>
                                <div className='col-12 mobile-footcol'>
                                    <span className="mobile-footspan">Mens clothing</span>
                                    <ul>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                    </ul>                   
                                </div>
                                <div className='col-12 mobile-footcol'>
                                    <span className="mobile-footspan">Womens clothing</span>
                                    <ul>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                    </ul>                   
                                </div>
                                <div className='col-12 mobile-footcol'>
                                    <span className="mobile-footspan">Kids clothing</span>
                                    <ul>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Track Order</a></li>
                                        <li><a>Return Order</a></li>
                                        <li><a>Cancel Order</a></li>
                                    </ul>                   
                                </div>
                                <div className='col-12 mobile-footcol' style={{color:"aqua",fontWeight:"900",fontSize:"24px"}}>
                                    <ul>
                                        <li><a>FANBOOK</a></li>
                                        <li><a>OFFERS</a></li>
                                        <li><a>SITEMAP</a></li>
                                    </ul>                   
                                </div>
                            </div>
                            <div className='row' style={{justifyContent:"center"}}>
                                <div className='col-md-12 mobile-footdesc'>
                                    <h5 >What is Lorem Ipsum?</h5>
                                    <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                                <div className='col-md-12 mobile-footdesc'>
                                    <h5>Why do we use it?</h5>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                </div>
                                <div className='col-md-12 mobile-footdesc'>
                                    <h5>Where does it come from?</h5>
                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                                </div>
                                <div className='col-md-12 mobile-footdesc'>
                                    <h5>Where can I get some?</h5>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
  }
}

