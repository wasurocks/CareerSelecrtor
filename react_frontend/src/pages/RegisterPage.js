import React from "react";
import "../styles/RegisterPage.css";
import RegisterForm from "../components/RegisterForm.js";
import Logo from "../components/Logo.js";

// UI imports
import { ThemeProvider, TextField } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#909090"
        }
    }
});

export default function RegisterPage(props) {
    return (
            <div className="register">
                <Logo/>
                <RegisterForm />
            </div>
    );
}
