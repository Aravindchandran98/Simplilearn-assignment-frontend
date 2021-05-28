import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 210,
    height: 100,
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
    borderRadius: "10px",
    background: "linear-gradient(45deg,#39f,#2982cc)",
    borderColor: "#2982cc",
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
