import React from "react";
import "../styles/LoginPage.css";
import logo from "../logo/foodicon.png";
import LoginForm from "../components/LoginForm.js";

// UI imports
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
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
            <div className="login">
                <img src={logo} className="logo" />
                <div className="title">
                    <span className="text">FoodBuddy</span>
                </div>
                <div className="subtitle">
                    <span className="text">Your friend in food</span>
                </div>
                <LoginForm />
                <Link className="redirect" component={RouterLink} to="/register">
                    Need an account? Register <strong>here</strong>
                </Link>
            </div>
        </ThemeProvider>
    );
}
