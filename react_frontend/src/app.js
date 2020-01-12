import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthProvider } from "./AuthContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
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
        this.handleLogin = this.handleLogin.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }

    handleLogin() {
        this.setState({ isLoggedIn: true }, () => alert(this.state.isLoggedIn));
    }

    checkLoggedIn() {
        console.log(this.state.isLoggedIn);
        return this.state.isLoggedIn;
    }

    render() {
        // If user is logged in, route all to success page
        return (
            <AuthProvider>
                <Switch>
                    <Route exact path={["/", "/login"]} render={() => <LoginPage />}/>
                    <Route exact path="/register" component={RegisterPage}/>/>
                    <ProtectedRoute exact path="/success" component={SuccessPage}/>
                    <Route component={ErrorPage} />
                </Switch>
            </AuthProvider>
        );
    }
}

export default App;
