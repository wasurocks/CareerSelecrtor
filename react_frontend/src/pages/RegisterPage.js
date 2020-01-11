import React from "react";
import "../styles/RegisterPage.css";
import logo from "../logo/foodicon.png";
import RegisterForm from "../components/RegisterForm.js";

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

export default function RegisterPage() {
    return (
            <div className="register">
                <img src={logo} className="logo" />
                <div className="title">
                    <span className="text">FoodBuddy</span>
                </div>
                <div className="subtitle">
                    <span className="text">Your friend in food</span>
                </div>
                <RegisterForm />
            </div>
    );
}
