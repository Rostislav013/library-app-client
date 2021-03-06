import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";

import { loginUser } from "../redux/actions/auth";
import { AppState } from "../types";
import { useStyles } from "../hooks/useStyles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://rost-library-app.herokuapp.com">
        web
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: AppState) => state.auth);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (user.isAuthenticated) {
      history.push("/dashboard");
    }
  });

  const LoginValidationSchema = Yup.object({
    email: Yup.string()
      .email()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    password: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
  });

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },

  //   validationSchema: LoginValidationSchema,
  //   onSubmit: async (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //     try {
  //       await api.updateBookById(book?._id, values);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   },
  // });

  return (
    <>
      <Link href="/">Back to home</Link>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            {user.loginError.email && (
              <p className={classes.errMessage}>{user.loginError.email}</p>
            )}

            {user.loginError.password && (
              <p className={classes.errMessage}>{user.loginError.password}</p>
            )}
            {/* {Object.keys(user.loginError).length !== 0 ? (
              <p className={classes.errMessage}>
                {Object.values(user.loginError)}
              </p>
            ) : (
              <p className={classes.errMessage}></p>
            )} */}
            {/* {user.loginError.email && (
              <p className={classes.errMessage}>{user.loginError.email}</p>
            )}
            {user.loginError.password && (
              <p className={classes.errMessage}>{user.loginError.password}</p>
            )} */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* I use here empty "p" cuz had a small issue with styling material ui components with custom hook */}
            <p></p>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default Login;
