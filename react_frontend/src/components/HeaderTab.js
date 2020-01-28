import React, { useContext, useState } from "react";
import logo from "../logo/foodicon.png";
import "../styles/HeaderTab.css";
import { AuthContext } from "../AuthContext";
import { Redirect } from "react-router-dom";
import { QuestionContext } from "../QuestionContext";

export default function HeaderTab() {
    const authContext = useContext(AuthContext);
    const questionContext = useContext(QuestionContext);

    const [isLoggedOut, setLogout] = useState(false);
    const [isGoingHome, setHome] = useState(false);

    function logout(event) {
        event.preventDefault();
        authContext.logout();
        setLogout(true);
    }

    function home(event) {
        event.preventDefault();
        questionContext.clearAll();
        setHome(true);
    }

    if (isLoggedOut) return <Redirect to="/login"/>;
    if (isGoingHome) return <Redirect to="/" />;
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
