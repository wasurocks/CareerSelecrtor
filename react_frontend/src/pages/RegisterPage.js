import React from "react";
import "../styles/RegisterPage.css";
import RegisterForm from "../components/RegisterForm.js";
import Logo from "../components/Logo.js";

// UI imports
import { ThemeProvider, TextField } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#909090"
        }
    }
});

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
