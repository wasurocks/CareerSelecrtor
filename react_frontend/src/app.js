import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import SuccessPage from "./pages/SuccessPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import Questions from "./pages/questions/Questions.js";
import { QuestionProvider } from "./QuestionContext.js";

class App extends React.Component {
    render() {
        // If user is logged in, route all to success page
        return (
            <Switch>
                <Route exact path={["/", "/login"]} component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <ProtectedRoute exact path="/success">
                    <SuccessPage />
                </ProtectedRoute>
                <ProtectedRoute exact path="/questions">
                    <QuestionProvider>
                        <Questions />
                    </QuestionProvider>
                </ProtectedRoute>
                <Route component={ErrorPage} />
            </Switch>
        );
    }
}

export default App;
