import React from "react";

// CSS
import "../styles/LoginPage.css";

// Form import
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import qs from "querystring";

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

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    handleSubmit = async (
        values,
        { setSubmitting, resetForm, setFieldTouched }
    ) => {
        setTimeout(() => {
            console.log("Logging in ", values);
            // Declare content type
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            axios
                .post(
                    `http://localhost:8000/api/users/login`,
                    qs.stringify(values),
                    config
                )
                // In case of successful login
                .then(res => {
                    if (res.data.success) {
                        console.log("Success");
                        this.setState({ isLoggedIn: true });
                        this.props.onLogin();
                    }
                })
                // Catch errors
                .catch(err => {
                    if (err) {
                        console.log("Invalid email/password");
                        alert("You have entered an invalid email or password");
                    }
                });
            // Reset entire form to blank
            resetForm({});
            // Set all fields unfilled and remove error messages
            Object.keys(values).forEach(key => {
                setFieldTouched(values[key], false);
            });
            // Set submitting state to false
            setSubmitting(false);
        }, 500);
    };

    render() {
        // If the login is successful, redirect the user to the success page
        if (this.state.isLoggedIn) {
            // FIND A WAY TO UPDATE APP'S ISLOGGEDIN
            return <Redirect to="/success" />;
        }
        return (
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={this.handleSubmit}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .matches(
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            "Invalid email"
                        )
                        .required("Email is required"),
                    password: Yup.string().required("Password cannot be empty")
                })}
                // Pass values as render props
                render={({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <ThemeProvider theme={theme}>
                            <form
                                onSubmit={handleSubmit}
                                className="login-form"
                            >
                                <TextField
                                    name="email"
                                    type="text"
                                    helperText={
                                        errors.email && touched.email
                                            ? errors.email
                                            : "Email"
                                    }
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email && touched.email}
                                />

                                <TextField
                                    name="password"
                                    type="password"
                                    helperText={
                                        errors.password && touched.password
                                            ? errors.password
                                            : "Password"
                                    }
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.password && touched.password}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="button"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    LOGIN
                                </Button>
                            </form>
                        </ThemeProvider>
                )}
            />
        );
    };
};
