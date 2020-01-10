import React from "react";
import "../styles/LoginPage.css";
import Button from "@material-ui/core/Button";
//import { Formik } from "formik";
//import _ as EmailValidator from "email-validator";
//import _ as Yup from "yup";
import { Redirect } from "react-router-dom";
import { ThemeProvider, TextField } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#49E198"
        }
    }
});

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toHomePage: false
      }

      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(event) {
      this.setState({toHomePage: true})
    }

    render() {
        if (this.state.toHomePage === true) {
            return <Redirect to='/home' />
        }
        return (
            <div className="login-form">
                <ThemeProvider theme={theme}>
                    <TextField helperText="Email">
                    </TextField>
                    <TextField helperText="Password">
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        onClick={this.handleClick}
                    >
                        LOGIN
                    </Button>
                </ThemeProvider>
            </div>
        );
    }
}

export default LoginForm;
