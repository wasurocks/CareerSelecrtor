import React from "react";
import { Redirect } from "react-router-dom";
import SuccessPage from "./pages/SuccessPage.js";
import { AuthContext } from "./AuthContext.js";

const ProtectedRoute = () => {
    const context = React.useContext(AuthContext);
    if (context.getUserStatus()){
        return <SuccessPage/>;
    }
    else return <Redirect to="/login"/>;
};

export default ProtectedRoute;
