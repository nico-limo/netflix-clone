import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
//CSS
import "./Nav.css";
//Components
import Search from '../Search/Search';

const Nav = () => {
    const history = useHistory();
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
            onClick={() => history.push("/")}
            className='nav__logo' 
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
            alt=""/>
            <img
            onClick={() => history.push("/profile")} 
            className='nav__avatar'
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
            alt=""/>
            
            <div className="nav__contents__categories">
               <p className="nav__contents__categories__link">Home</p>
               <p className="nav__contents__categories__link">Series</p>
               <p className="nav__contents__categories__link">Movies</p>
               <p className="nav__contents__categories__link">My list</p>
                <Search/>
            </div>


            </div>
        </div>
    )
}

export default Nav;
