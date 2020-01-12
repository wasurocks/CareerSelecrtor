import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import SuccessPage from "./pages/SuccessPage.js";
import ErrorPage from "./pages/ErrorPage.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    render() {
        // If user is logged in, route all to success page
        if (this.state.isLoggedIn) return <Redirect to="/success" />;
        return (
            <Switch>
                <Route exact path={["/", "/login"]} component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/success" component={SuccessPage} />
                <Route component={ErrorPage} />
            </Switch>
        );
    }
}

export default App;
