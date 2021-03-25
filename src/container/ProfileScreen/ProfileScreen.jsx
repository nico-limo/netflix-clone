import React from "react";
//REDUX
import { useSelector } from "react-redux";
import { selectUser } from "../../store/features/userSlice";
//Components
import Nav from "../../components/Nav/Nav";
import Plans from "../../components/Plans/Plans";
//CSS
import "./ProfileScreen.css";
import { auth } from "../../firebase";

const ProfileScreen = () => {
    const user = useSelector(selectUser);
    return (
        <div className="profile">
            <Nav/>
            <div className="profile__body">
                <h1>Edit Profile</h1>
                <div className="profile__info">
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                    alt=""/>
                    <div className="profile__details">
                        <h2>{user.email}</h2>
                        <div className="profile__plans">
                            <h3>Plans {user.role ? (`Current Plan: ${user?.role}`) : (``)} </h3>
                            <Plans />
                            <button 
                            onClick={() => auth.signOut()} 
                            className="profile__signOut">Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
