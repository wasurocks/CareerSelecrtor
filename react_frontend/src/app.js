import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import SuccessPage from "./pages/SuccessPage.js";
import ErrorPage from "./pages/ErrorPage.js";

class App extends React.Component {

    render() {
        // If user is logged in, route all to success page
        return (
            
                <Switch>
                    <Route exact path={["/", "/login"]} component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <ProtectedRoute
                        exact
                        path="/success"
                        component={SuccessPage}
                    />
                    <Route component={ErrorPage} />
                </Switch>
        );
    }
}

export default App;
