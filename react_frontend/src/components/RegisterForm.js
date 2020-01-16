import React from "react";

// CSS
import "../styles/RegisterPage.css";

// Form import
import axios from "axios";

// Routes import
import { Redirect } from "react-router-dom";

// UI imports
import Button from "@material-ui/core/Button";
import { ThemeProvider, TextField } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#49E198"
        }
    }
});

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            isSubmitting: false,
            fields: {
                email: "",
                password: "",
                password2: ""
            },
            errors: {},
            touched: {
                email: false,
                password: false,
                password2: false
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
        const { email, password, password2 } = this.state.fields;
        if (email === "") errors.email = "Email is required";
        if (!email.match(testRegex)) errors.email = "Email is invalid";
        if (password === "") errors.password = "Password cannot be empty";
        if (password2 === "")
            errors.password2 = "Confirm password cannot be empty";
        if (password !== password2) errors.password2 = "Passwords must match";
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
                console.log("Registering ", this.state.fields);
                // Declare content type
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                axios
                    .post(
                        `http://localhost:8000/api/users/register`,
                        this.state.fields,
                        config
                    )
                    // In case of successful registration
                    .then(res => {
                        if (res.status == 201) {
                            console.log("Success");
                            this.setState({ isRegistered: true });
                        }
                    })
                    // Catch errors
                    .catch(err => {
                        if (err) {
                            if (
                                err.response.data.email == "User already exists"
                            ) {
                                console.log("Account already exists");
                                alert("Account already exists");
                            } else {
                                // Should never happen but just in case
                                console.log("Invalid information");
                                alert("Invalid information");
                            }
                            this.setState({ isSubmitting: false });
                        }
                    });
            }, 500);
        }
    };

    render() {
        // If the registration is successful, redirect the user to the login page
        if (this.state.isRegistered) return <Redirect to="/login" />;

        return (
            <ThemeProvider theme={theme}>
                <form onSubmit={this.handleSubmit} className="register-form">
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

                    <TextField
                        name="password2"
                        type="password"
                        helperText={
                            this.state.errors.password2 &&
                            this.state.touched.password2
                                ? this.state.errors.password2
                                : "Confirm password"
                        }
                        value={this.state.fields.password2}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={
                            this.state.errors.password2 &&
                            this.state.touched.password2
                        }
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        type="submit"
                        disabled={this.state.isSubmitting}
                    >
                        REGISTER
                    </Button>
                </form>
            </ThemeProvider>
        );
    }
}
