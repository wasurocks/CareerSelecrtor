import React from "react";
import { Redirect } from "react-router-dom";
import SuccessPage from "./pages/SuccessPage.js";

const ProtectedRoute = () => {
    if (localStorage.getItem('user')){
        return <SuccessPage/>;
    }
    else return <Redirect to="/login"/>;
};

export default ProtectedRoute;
