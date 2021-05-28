import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 174,
    borderRadius: "10px",
    background: "linear-gradient(45deg,#321fdb,#1f1498)",
    borderColor: "#1f1498",
    margin: theme.spacing(3),
  },
}));

export default function InfoCard({ rows }) {
  const classes = useStyles();

  return (
    <>
      {rows &&
        Object.entries(rows).map(([key, value]) => (
          <Card className={classes.root} key={key}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ textTransform: "capitalize" }}
                >
                  {key}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </>
  );
}
