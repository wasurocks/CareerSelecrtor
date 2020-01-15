import React from "react";

// CSS
import "../styles/LoginPage.css";

// Form import
import axios from "axios";

// Routes import
import { Redirect } from "react-router-dom";

// UI imports
import Button from "@material-ui/core/Button";
import { ThemeProvider, TextField } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import AuthContext from "../AuthContext";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#49E198"
        }
    }
});

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isSubmitting: false,
            fields: {
                email: "",
                password: ""
            },
            errors: {},
            touched: {
                email: false,
                password: false
            }
        };
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation = () => {
        let errors = {};
        let testRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email, password } = this.state.fields;
        if (email === "") errors.email = "Email is required";
        if (!email.match(testRegex)) errors.email = "Email is invalid";
        if (password === "") errors.password = "Password cannot be empty";
        this.setState({ errors });
        // If the errors object is empty, returns true = valid form
        return Object.entries(errors).length === 0;
    };

    handleChange = event => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    };

    handleBlur = event => {
        let touched = this.state.touched;
        touched[event.target.name] = true;
        this.setState({ touched });
        this.handleValidation();
    };

    handleSubmit = async event => {
        event.preventDefault();

        if (this.handleValidation()) {
            this.setState({ isSubmitting: true });
            setTimeout(() => {
                console.log("Logging in ", this.state.fields);
                // Declare content type
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                axios
                    .post(
                        `http://localhost:8000/api/users/login`,
                        this.state.fields,
                        config
                    )
                    // In case of successful login
                    .then(res => {
                        if (res.data.success) {
                            console.log("Success");
                            let value = this.context;
                            value.updateUserStatus({isLoggedIn: true});
                            this.setState({ isLoggedIn: true });
                        }
                    })
                    // Catch errors
                    .catch(err => {
                        if (err) {
                            console.log("Invalid email/password");
                            this.setState({ isSubmitting: false });
                            alert(
                                "You have entered an invalid email or password"
                            );
                        }
                    });
            }, 500);
        }
    };

    render() {
        // If the login is successful, redirect the user to the success page
        if (this.state.isLoggedIn) return <Redirect to="/success" />;

        return (
            <ThemeProvider theme={theme}>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <TextField
                        name="email"
                        type="text"
                        helperText={
                            this.state.errors.email && this.state.touched.email
                                ? this.state.errors.email
                                : "Email"
                        }
                        value={this.state.fields.email}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={
                            this.state.errors.email && this.state.touched.email
                        }
                    />

                    <TextField
                        name="password"
                        type="password"
                        helperText={
                            this.state.errors.password &&
                            this.state.touched.password
                                ? this.state.errors.password
                                : "Password"
                        }
                        value={this.state.fields.password}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={
                            this.state.errors.password &&
                            this.state.touched.password
                        }
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        type="submit"
                        disabled={this.state.isSubmitting}
                    >
                        LOGIN
                    </Button>
                </form>
            </ThemeProvider>
        );
    }
}

LoginForm.contextType = AuthContext;
