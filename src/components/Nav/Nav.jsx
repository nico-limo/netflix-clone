import React, { useEffect, useState } from 'react';
//CSS
import "./Nav.css";
const Nav = () => {
    //Show or Hide the Navbar when scroll 
    const [show, setShow] = useState(false);

    //Functions
    const transitionNavBar = () => {
        window.scrollY > 100 ? setShow(true) : setShow(false);
    };

    //UseEffect 
    useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
    }, [])

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
            <img
            className='nav__logo' 
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt=""/>
            
            <img 
            className='nav__avatar'
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt=""/>
            
            </div>
        </div>
    )
}

export default Nav;
