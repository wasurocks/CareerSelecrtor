import React, { useEffect, useContext, useState } from "react";
import logo from "../logo/foodicon.png";
import "../styles/HeaderTab.css";
import { AuthContext } from "../AuthContext";
import { Redirect } from "react-router-dom";

export default function HeaderTab() {
    const context = useContext(AuthContext);

    const [isLoggedOut, setLogout] = useState(false);
    const [isGoingHome, setHome] = useState(false);

    function logout(event) {
        event.preventDefault();
        context.logout();
        setLogout(true);
    }

    function home(event) {
        event.preventDefault();
        setHome(true);
    }

    if (isLoggedOut) {
        setLogout(false);
        return <Redirect to="/login" />;
    }
    if (isGoingHome) {
        setHome(false);
        return <Redirect to="/" />;
    }
    return (
        <div className="headertab">
            <div className="logo-text">
                Food
                <br />
                Selector
            </div>
            <img src={logo} className="mini-logo" />
            <div className="home" onClick={home}>
                Home
            </div>
            <div className="log-out" onClick={logout}>
                Logout
            </div>
        </div>
    );
}
