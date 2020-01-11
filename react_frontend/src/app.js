import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from  "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js"
import SuccessPage from "./pages/SuccessPage.js";

export default function App() {
    return (
        <Switch>
            <Route exact path={["/", "/login"]} component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/success" component={SuccessPage} />
        </Switch>
    );
};