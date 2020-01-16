import React from "react";
import "../styles/SuccessPage.css";
import Logo from "../components/Logo.js";

// UI imports
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#909090"
        }
    }
});

class SuccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        event.preventDefault();
        this.context.logout();
        this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect) return <Redirect to="/login"/>
        return (
            <ThemeProvider theme={theme}>
                <div className="success">
                    <Logo />
                    <div className="box">
                        <span>You are logged in</span>
                        <br/>
                        <span onClick={this.handleClick}>Log out</span>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

SuccessPage.contextType = AuthContext;

export default SuccessPage;
