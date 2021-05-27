import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import logo from "../images/logo.png";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    fontSize: theme.spacing(6),
  },
  logo: {
    height: theme.spacing(9),
  },
  listItem: {
    display: "flex",
    listStyle: "none",
    flexGrow: 1,
    "& li": {
      "& p": {
        color: "#F5AB41",
        fontSize: "19px",
        fontWeight: 600,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        cursor: "pointer",
      },
    },
  },
  profileInfo: {
    "& ul": {
      listStyle: "none",
      "& li": {
        display: "flex",
        "& p": {
          color: "#00A7DC",
          fontSize: theme.spacing(2),
        },
      },
    },
  },
}));

export default function HeaderBlockComponent() {
  const classes = useStyles();
  //   const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = useSelector((state) => state.userProfile);
  console.log(auth, "liufhujrflkjk");

  //   const handleChange = (event) => {
  //     setAuth(event.target.checked);
  //   };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <AppBar position="static" style={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <img src={logo} alt="Simplilearn" className={classes.logo} />
          <ul className={classes.listItem}>
            <li>
              <Typography variant="body2">Carrer</Typography>
            </li>
            <li>
              <Typography variant="body2">About</Typography>
            </li>
            <li>
              <Typography variant="body2">More</Typography>
            </li>
          </ul>
          {auth && auth.isLoggedIn ? (
            <div className={classes.profileInfo}>
              <ul>
                <li>
                  <Typography variant="body2">Aravindkumar</Typography>
                </li>
                <li>
                  <Typography variant="body2">My Profile</Typography>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="#00A7DC"
              >
                <AccountCircle className={classes.icon} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
