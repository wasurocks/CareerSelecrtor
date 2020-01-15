import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import SuccessPage from "./pages/SuccessPage.js";
import ErrorPage from "./pages/ErrorPage.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                isLoggedIn: false
            }
        };
        this.updateUserStatus = this.updateUserStatus.bind(this);
    }

    updateUserStatus(value) {
        this.setState({ user: value });
    }

    render() {
        // If user is logged in, route all to success page
        return (
            <AuthContext.Provider
                value={{
                    user: this.state.user,
                    updateUserStatus: this.updateUserStatus
                }}
            >
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
            </AuthContext.Provider>
        );
    }
}

export default App;
