import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from  "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js"

export default function App() {
    return (
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
        </Switch>
    );
};