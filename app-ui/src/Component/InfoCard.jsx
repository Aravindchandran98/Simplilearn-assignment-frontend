import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    borderRadius: "10px",
    background: "linear-gradient(45deg,#321fdb,#1f1498)",
    borderColor: "#1f1498",
    margin: theme.spacing(3),
  },
}));

export default function InfoCard({ cards }) {
  const classes = useStyles();
  //   cards.pop();
  console.log(cards, "cards");
  Object.entries(cards).forEach(([key, value]) => console.log(key, value));
  return (
    <>
      {cards &&
        Object.entries(cards).forEach(([key, value]) => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {key}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </>
  );
}
