import React from "react";
import "../styles/LoginPage.css";
import LoginForm from "../components/LoginForm.js";
import Logo from "../components/Logo.js";

// UI imports
import { Link as RouterLink, Redirect } from "react-router-dom";
import { ThemeProvider, Link } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { AuthContext } from "../AuthContext";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#909090"
        }
    }
});

export default function LoginPage() {
    const context = React.useContext(AuthContext);
    if (context.getUserStatus()) return <Redirect to="/success" />;
    
    return (
        <ThemeProvider theme={theme}>
            <div className="login">
                <Logo />
                <LoginForm />
                <Link
                    className="redirect"
                    component={RouterLink}
                    to="/register"
                >
                    Need an account? Register <strong>HERE</strong>
                </Link>
            </div>
        </ThemeProvider>
    );
}
