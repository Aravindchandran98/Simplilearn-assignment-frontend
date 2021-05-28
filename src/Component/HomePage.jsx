import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfoCard from "./InfoCard";

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

export default function HomePage() {
  const classes = useStyles();
  const tempRow = useSelector((state) => state.userProfile);
  const [rows, setRows] = useState({});

  useEffect(() => {
    async function fetchStatistic() {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/statistics`, {
          headers: { Authorization: `Bearer ${tempRow.token}` },
        })
        .then((res) => {
          const drows = res.data.data;
          setRows(drows);
        })
        .catch((err) => console.log(err));
    }
    fetchStatistic();
  }, []);

  return (
    <div id="home-page">
      <div id="card-container" style={{ display: "flex" }}>
        {rows && <InfoCard rows={rows} />}
      </div>
      <div id="table-container">
        <TableContainer component={Paper} className={classes.root}>
          <Table className={classes.table} aria-label="caption table">
            <caption>Only Authorized User can see this info</caption>
            <TableBody>
              {rows ? (
                Object.entries(rows).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ textTransform: "capitalize" }}
                    >
                      {key}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                  </TableRow>
                ))
              ) : (
                <h1>no rows</h1>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
