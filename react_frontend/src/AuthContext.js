import React from "react";

const AuthContext = React.createContext({
    user: { isLoggedIn: false },
    updateUserStatus: () => {
        console.log("Default");
    }
});

class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUserStatus = this.getUserStatus.bind(this);
        this.getUserToken = this.getUserToken.bind(this);
    }

    login(token) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('token', token);
    }

    logout() {
        localStorage.clear();
    }

    getUserStatus() {
        if(localStorage.getItem('isLoggedIn')) return true;
        return false;
    }

    getUserToken() {
        return localStorage.getItem('token');
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    user: localStorage.getItem('user'),
                    login: this.login,
                    logout: this.logout,
                    getUserStatus: this.getUserStatus,
                    getUserToken: this.getUserToken
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export { AuthContext, AuthProvider };
