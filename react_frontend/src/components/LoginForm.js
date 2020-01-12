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

/*export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }
}*/


const LoginForm = () => (
    <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={
            // Define a function for what happens on submit
            (values, { setSubmitting }) => {
                setTimeout(() => {
                    console.log("Logging in ", values);
                    const config = {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        }
                      }
                    axios
                        .post(`http://localhost:8000/api/users/login`, qs.stringify(values), config)
                        .then(res => {
                            // Displays response data if successful
                            console.log(res.data);
                            const token = res.data;
                        })
                        .catch(err => {
                            //Displays error data if unsuccessful
                            console.log(err.data);
                        });
                    setSubmitting(false);
                }, 500);
            }
        }
        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            password: Yup.string().required("Password cannot be empty")
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
                    <form onSubmit={handleSubmit} className="login-form">
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
            );
        }}
    </Formik>
);

export default LoginForm;
