import React from 'react'

import { FaHistory, FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";


export default function Navbar(props) {
    const Logout = async () => {
        localStorage.clear();
    };

   

    return (
        <nav className="navbar navbar-expand-lg navbar-light shadow">
            <div className="container d-flex justify-content-between align-items-center">
                <a className="navbar-brand logo h1 align-self-center" style={{color:"#18534F"}} href="/">
                    Auction
                </a>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                    <div className="flex-fill">
                        <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/"> Home</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link float-right" href="/shop">shop</a>
                            </li>
                          
                            <li className="nav-item">
                                <a className="nav-link float-right" href="/contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        {props.isAuthenticated === true ? <div><a className="mx-3" name="navigate" title='Create New Auction' href='/create'><FaPlus /></a>   <a className='mx-3'title='Show History' href='/history'> <FaHistory /></a> <a title='Log Out' href='/' className='mx-3'onClick={Logout}><FaSignOutAlt /></a>

                        </div> : <a title='Sign in' href='/login'><FaSignInAlt /></a>}


                    </div>
                </div>

            </div>
        </nav>



    )
}

