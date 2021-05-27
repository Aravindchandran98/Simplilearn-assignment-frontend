import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InfoCard from "./InfoCard";
import { useSelector } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "50%",
    marginTop: theme.spacing(10),
  },
  table: {
    minWidth: 650,
  },
}));

// const rows = [
//   { element: "Total number of Students enrolled", count: 20 },
//   { element: "Total number of Active Trainings", count: 9 },
//   { element: "Number of Registrations Today", count: 18 },
//   { element: "Overall Average Time spent on a Training", count: 2 },
//   { element: "Average Activation Fallout (Time)", count: 3 },
//   { element: "Total Revenue Generated", count: 10000 },
// ];

export default function HomePage() {
  const classes = useStyles();
  const tempRow = useSelector((state) => state.userProfile);
  const [rows, setRows] = useState({});
  console.log(tempRow, "globalState form Home page");

  useEffect(() => {
    async function fetchStatistic() {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/statistics`, {
          headers: { Authorization: `Bearer ${tempRow.token}` },
        })
        .then((res) => {
          console.log(res);
          const dRows = res.data.data;
          setRows({ dRows });
          //   setRows(drows);
          //   rows.map((x) => console.log(x));
          //   console.log(Object.key(x));
          Object.entries(dRows).forEach(([key, value]) =>
            console.log(key, value)
          );

          //   console.log(drows);
        })
        .catch((err) => console.log(err));
    }
    fetchStatistic();
  }, []);

  return (
    <div id="home-page">
      <div id="card-container" style={{ display: "flex" }}>
        {rows && <InfoCard cards={rows} />}
      </div>
      <div id="table-container">
        <TableContainer component={Paper} className={classes.root}>
          <Table className={classes.table} aria-label="caption table">
            <caption>Only Authorized User can see this info</caption>
            <TableBody>
              {rows &&
                Object.entries(rows).forEach(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
