import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from  "./pages/LoginPage.js";
import HomePage from "./pages/HomePage";

export default function App() {
    return (
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
        </Switch>
    );
}
//<Route path="/:id" component={StartPage}></Route>