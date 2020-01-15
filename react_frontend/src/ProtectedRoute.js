import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext.js";
import SuccessPage from "./pages/SuccessPage.js";

const ProtectedRoute = () => {
    const value = useContext(AuthContext);
    if (value.user.isLoggedIn)
        return <SuccessPage/>;
    else return <Redirect to="/login"/>;
};

export default ProtectedRoute;
