import React from "react";
import "../styles/SuccessPage.css";
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

export default function SuccessPage() {
    return (
        <ThemeProvider theme={theme}>
            <div className="success">
                <Logo/>
                <Link className="redirect" component={RouterLink} to="/register">
                    Need an account? Register <strong>here</strong>
                </Link>
            </div>
        </ThemeProvider>
    );
}
