import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

function createData(element, count) {
  return { element, count };
}

const rows = [
  createData("Total number of Students enrolled", 20),
  createData("Total number of Active Trainings", 9),
  createData("Number of Registrations Today", 18),
  createData("Overall Average Time spent on a Training", 2),
  createData("Average Activation Fallout (Time)", 3),
  createData("Total Revenue Generated", 10000),
];

export default function HomePage() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Only Authorized User can see this info</caption>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.element}>
              <TableCell component="th" scope="row">
                {row.element}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
