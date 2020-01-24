import React from "react";
import "../styles/SuccessPage.css";
import Logo from "../components/Logo.js";

// UI imports
import { ThemeProvider, Link, Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const theme = createMuiTheme({
    shadows: ["none"],
    palette: {
        primary: {
            main: "#006CFF"
        },
        secondary: {
            main: "#49E198"
        }
    }
});

class SuccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedOut: false,
            isStarted: false
        };
        this.logout = this.logout.bind(this);
        this.start = this.start.bind(this);
    }

    logout(event) {
        event.preventDefault();
        this.context.logout();
        this.setState({ isLoggedOut: true });
    }

    start(event) {
        event.preventDefault();
        this.setState({ isStarted: true })
    }

    render() {
        if (this.state.isLoggedOut) return <Redirect to="/login" />;
        if (this.state.isStarted) return <Redirect to="/questions"/>;
        return (
            <ThemeProvider theme={theme}>
                <div className="success">
                    <Logo />
                    <div className="box">
                        <span onClick={this.handle}>Press start to continue</span>
                        <Button
                            variant="contained"
                            color="secondary"
                            className="button"
                            onClick={this.start}
                        >
                            START
                        </Button>
                    </div>
                    <Link onClick={this.logout} className="log-out">
                        Logout
                    </Link>
                </div>
            </ThemeProvider>
        );
    }
}

SuccessPage.contextType = AuthContext;

export default SuccessPage;
