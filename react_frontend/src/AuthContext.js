import React from "react";

const AuthContext = React.createContext({
    user: { isLoggedIn: false },
    updateUserStatus: () => {
        console.log("Default");
    }
});

export default AuthContext;
