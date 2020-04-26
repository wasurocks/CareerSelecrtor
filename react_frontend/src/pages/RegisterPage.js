import React from "react";
import "../styles/RegisterPage.css";
import RegisterForm from "../components/RegisterForm.js";
import Logo from "../components/Logo.js";

// UI imports
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RegisterPage() {
    const context = React.useContext(AuthContext);
    if (context.getUserStatus()) return <Redirect to="/success"/>;
    return (
        <div className="register">
            <Logo />
            <RegisterForm />
        </div>
    );
}
