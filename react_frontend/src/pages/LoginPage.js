import React from "react";
import "../styles/LoginPage.css"
import logo from '../logo/foodicon.png';
import LoginForm from "../components/LoginForm.js"

// UI imports
import Link from "@material-ui/core/Link";
import { ThemeProvider, TextField } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#909090"
        }
    }
});

export default function LoginPage() {
    return (
        <ThemeProvider theme={theme}>
            <div id="main">
            <img src={logo} id="logo"/>
            <div id="box-text-title">
                <span>FoodBuddy</span>
            </div>
            <div id="box-text-subtitle">
                <span>Your friend in food</span>
            </div>
            <LoginForm />
            <Link id="register">Need an account? Register <strong>here</strong></Link>
            </div>
        </ThemeProvider>
    );
};