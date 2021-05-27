import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authUser } from "../actions/userProfile";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  border: {
    border: "1px solid",
    marginTop: theme.spacing(7),
  },
}));

const tempState = {
  email: "",
  password: "",
};

const errorStates = {
  errEmail: "",
  errPassword: "",
};

export default function Login({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState(tempState);
  const [errors, setErrors] = useState(errorStates);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const getAuthentication = async () => {
    try {
      await axios
        .post("https://reqres.in/api/login", values)
        .then((res) => {
          console.log(res);
          toast.success("Login successfully");
          dispatch(authUser({ isLoggedIn: true }));
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Invalid Input");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values, "values.....");
    if (validate(values)) {
      getAuthentication();
    }
    //axios and redux state updates are going to made here by dispatching
  };

  const validate = (fieldValues) => {
    const temp = { ...errorStates };
    if ("email" in fieldValues) {
      temp.errEmail =
        fieldValues.email !== "" ? "" : "Email should not be empty";
    }
    if ("password" in fieldValues) {
      temp.errPassword =
        fieldValues.password !== "" ? "" : "Email should not be empty";
    }
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.border}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoFocus
            {...(errors.errEmail && {
              error: true,
              helperText: errors.errEmail,
            })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={values.password}
            onChange={handleChange}
            label="Password"
            type="password"
            id="password"
            {...(errors.errPassword && {
              error: true,
              helperText: errors.errPassword,
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ToastContainer />
    </Container>
  );
}
