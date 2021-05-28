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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  border: {
    border: "1px solid",
    marginTop: theme.spacing(5),
  },
}));

const relativeState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  phonenumber: "",
};

const errorStates = {
  errFirstname: "",
  errLastname: "",
  errEmail: "",
  errPassword: "",
  errConfirmPassword: "",
  errPhonenumber: "",
};

export default function SignUp({ history }) {
  const classes = useStyles();
  const [values, setValues] = useState(relativeState);
  const [errors, setErrors] = useState(errorStates);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const registerUser = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/register`, {
          first_name: values.firstname,
          last_name: values.lastname,
          email: values.email,
          password: values.password,
          mobile_number: values.phonenumber,
        })
        .then((res) => {
          const { message, token } = res.data;
          if (token) {
            toast.success(message);
          }
          setValues(relativeState);
        })
        .catch((err) => {
          toast.error("Invalid Input");
        });
    } catch (error) {
      toast.error("Invalid Input");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate(values)) {
      registerUser();
    }
  };

  const validate = (fieldValues) => {
    const temp = { ...errorStates };
    if ("firstname" in fieldValues) {
      temp.errFirstname = checkNameLength(
        fieldValues.firstname,
        "Firstname",
        4
      );
    }
    if ("lastname" in fieldValues) {
      temp.errLastname = checkNameLength(fieldValues.lastname, "Lastname", 3);
    }
    if ("email" in fieldValues) {
      temp.errEmail = checkRegex(
        fieldValues.email,
        "email",
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
    }
    if ("password" in fieldValues) {
      temp.errPassword = checkPassword(
        fieldValues.password,
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
      );
    }
    if ("confirmPassword" in fieldValues) {
      temp.errConfirmPassword = reCheckPassword(
        values.password,
        fieldValues.confirmPassword
      );
    }
    if ("phonenumber" in fieldValues) {
      temp.errPhonenumber = checkPhone(fieldValues.phonenumber);
    }

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  function checkNameLength(textValue, currentText, lengthset) {
    return textValue.length >= lengthset
      ? ""
      : `${currentText} should contain atleast ${lengthset} characters`;
  }

  function checkRegex(textValue, currentText, regex) {
    return regex.test(textValue) ? "" : `Invalid ${currentText}`;
  }

  function checkPassword(textValue, regex) {
    return regex.test(textValue)
      ? ""
      : `Password should contain atleast 8 character, 1 number, 1 Uppercase, 1 Lowercase`;
  }

  function reCheckPassword(firstEntry, secondEntry) {
    return firstEntry === secondEntry
      ? ""
      : "Confirm password should as same as password";
  }
  function checkPhone(numericValue) {
    return numericValue.length === 10
      ? ""
      : "Phonenumber should have only 10 digits";
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.border}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                autoFocus
                {...(errors.errFirstname && {
                  error: true,
                  helperText: errors.errFirstname,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                {...(errors.errLastname && {
                  error: true,
                  helperText: errors.errLastname,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                {...(errors.errEmail && {
                  error: true,
                  helperText: errors.errEmail,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                {...(errors.errConfirmPassword && {
                  error: true,
                  helperText: errors.errConfirmPassword,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phonenumber"
                value={values.phonenumber}
                onChange={handleChange}
                label="Phone number"
                type="tel"
                id="phonenumber"
                {...(errors.errPhonenumber && {
                  error: true,
                  helperText: errors.errPhonenumber,
                })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <ToastContainer />
      </div>
    </Container>
  );
}
