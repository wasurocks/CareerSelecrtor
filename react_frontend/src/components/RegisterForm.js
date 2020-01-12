import React from "react";

// CSS
import "../styles/RegisterPage.css";

// Form import
import { Formik } from "formik";
import * as Yup from "yup";
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
            isRegistered: false
        };
    }

    handleSubmit = async (
        values,
        { setSubmitting, resetForm, setFieldTouched }
    ) => {
        setTimeout(() => {
            console.log("Registering ", values);
            // Declare content type
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            axios
                .post(
                    `http://localhost:8000/api/users/register`,
                    values,
                    config
                )
                // In case of successful registration
                .then(res => {
                    if (res.status == 201) {
                        console.log("Success");
                        alert("Registration successful");
                        this.setState({ isRegistered: true });
                    }
                })
                // Catch errors
                .catch(err => {
                    if (err.response.data.email == "User already exists") {
                        console.log("User already exists");
                        alert("User already exists");
                    } else {
                        // Should never happen but just in case
                        console.log("Invalid information");
                        alert("Invalid information");
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
        // If the registration is successful, redirect the user to the login page
        if (this.state.isRegistered) {
            return <Redirect to="/login" />;
        }
        return (
            <Formik
                initialValues={{ email: "", password: "", password2: "" }}
                onSubmit={this.handleSubmit}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .required("Email is required")
                        .matches(
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            "Invalid email"
                        ),
                    password: Yup.string()
                        .required("Password is required")
                        .min(6, "Password must be between 6-12 characters")
                        .max(12, "Password must be between 6-12 characters"),
                    password2: Yup.string()
                        .required("Confirm password is required")
                        .oneOf(
                            [Yup.ref("password"), null],
                            "Passwords must match"
                        )
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
                        <form onSubmit={handleSubmit} className="register-form">
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

                            <TextField
                                name="password2"
                                type="password"
                                helperText={
                                    errors.password2 && touched.password2
                                        ? errors.password2
                                        : "Confirm password"
                                }
                                value={values.password2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password2 && touched.password2}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                className="button"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                REGISTER
                            </Button>
                        </form>
                    </ThemeProvider>
                )}
            />
        );
    }
}
