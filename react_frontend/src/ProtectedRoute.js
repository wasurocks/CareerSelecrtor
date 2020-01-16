import React from "react";
import { Redirect } from "react-router-dom";
import SuccessPage from "./pages/SuccessPage.js";
import { AuthContext } from "./AuthContext.js";

const ProtectedRoute = (props) => {
    const context = React.useContext(AuthContext);
    if (context.getUserStatus()){
        return props.children;
    }
    else return <Redirect to="/login"/>;
};

export default ProtectedRoute;
