import React from "react";

// CSS
import "../styles/RegisterPage.css";

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

const RegisterForm = () => (
    <Formik
        initialValues={{ email: "", password: "", password2: "" }}
        onSubmit={
            // Define a function for what happens on submit
            (values, { setSubmitting }) => {
                setTimeout(() => {
                    console.log("Registering ", values);
                    const config = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    };
                    axios
                        .post(
                            `http://localhost:5000/users/register`,
                            qs.stringify(values),
                            config
                        )
                        .then(res => {
                            console.log(res.status);
                            if(res.status == 200){
                                
                            }
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                    setSubmitting(false);
                }, 500);
            }
        }
        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required")
                .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be between 6-12 characters")
                .max(12, "Password must be between 6-12 characters"),
            password2: Yup.string()
                .required("Confirm password is required")
                .oneOf([Yup.ref("password"), null], "Passwords must match")
        })}
    >
        {/* Render props from Formik destructured (ES6) */}

        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;
            return (
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
            );
        }}
    </Formik>
);

export default RegisterForm;
