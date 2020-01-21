import React from "react";
import "../styles/ErrorPage.css";
import Logo from "../components/Logo.js";

// UI imports
import { Link as RouterLink, Redirect } from "react-router-dom";
import { ThemeProvider, Link } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#909090"
        }
    }
});

export default function ErrorPage() {
    return (
        <ThemeProvider theme={theme}>
            <div className="error">
                <Logo/>
                <div className="box">
                    <span>Error {":("}</span>
                    <iframe src="https://giphy.com/embed/26AHLBZUC1n53ozi8" frameBorder="0" className="giphy-embed"/>
                </div>
                <Link className="redirect" component={RouterLink} to="/login">
                    Go back to safety <strong>HERE</strong>
                </Link>
            </div>
        </ThemeProvider>
    );
}
