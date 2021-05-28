import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { authUser } from "../actions/userProfile";
import logo from "../images/logo.png";

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
  btnLogout: {
    backgroundColor: "#06A8DD",
    color: "#FFFFFF",
  },
}));

function HeaderBlockComponent({ history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authUser({ isLoggedIn: false, token: "" }));
    history.push("/login");
  };

  const handleLogin = () => {
    history.push("/login");
    handleClose();
  };

  return (
    <div className={classes.root}>
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
            <div>
              <Button
                variant="contained"
                className={classes.btnLogout}
                onClick={handleLogout}
              >
                Log out
              </Button>
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
                <MenuItem onClick={handleLogin}>Log In</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(HeaderBlockComponent);
