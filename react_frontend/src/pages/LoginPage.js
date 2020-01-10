import React from "react";
import "../styles/LoginPage.css"
import logo from '../logo/foodicon.png';
import LoginForm from "../components/LoginForm.js"

export default function LoginPage() {
    return (
        <div id="main">
            <img src={logo} id="logo"/>
            <div id="box-text-title">
                <span>FoodBuddy</span>
            </div>
            <div id="box-text-subtitle">
                <span>Your friend in food</span>
            </div>
            <LoginForm />
        </div>
    );
};