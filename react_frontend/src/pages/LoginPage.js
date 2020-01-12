import React from "react";
import "../styles/LoginPage.css";
import LoginForm from "../components/LoginForm.js";
import Logo from "../components/Logo.js";

// UI imports
import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider, Link } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#909090"
        }
    }
});

export default function LoginPage(props) {
    return (
        <ThemeProvider theme={theme}>
            <div className="login">
                <Logo/>
                <LoginForm onLogin={props.onLogin}/>
                <Link className="redirect" component={RouterLink} to="/register">
                    Need an account? Register <strong>HERE</strong>
                </Link>
            </div>
        </ThemeProvider>
    );
}
