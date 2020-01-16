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
        this.state = {
            user: {
                isLoggedIn: false
            }
        };
        this.updateUserStatus = this.updateUserStatus.bind(this);
    }

    updateUserStatus(value) {
        localStorage.setItem('user', value);
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    user: localStorage.getItem('user'),
                    updateUserStatus: this.updateUserStatus
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export { AuthContext, AuthProvider };
