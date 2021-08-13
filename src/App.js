import "./App.css";
import { useQuery, useSubscription } from "@apollo/client";

import React, { useEffect, useState } from "react";

import Card from "@material-ui/core/Card";

import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
} from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import { GET_JOBS } from "./graphql/subscription";
import Form from "./components/Form";
import LinkButton from "./components/LinkButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const App = () => {
  const { data } = useSubscription(GET_JOBS);

  const [id, setId] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();

  useEffect(() => {
    if (data === undefined) {
      console.log("Loading");
    }

    if (data !== undefined) {
      setId(
        data.Jobs.map((item) => (
          <div key={item.id}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {item.name}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.id}
                subheader={item.created_at}
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Kullanıcı Bilgileri
                </Typography>
                <Typography variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {item.job}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.age}
                  <br />
                  {item.id}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={classes.expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={classes.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Daha Fazla Bilgi:</Typography>
                  <Typography paragraph>
                    Burada kişinin bilgileri yer almaktadır.
                  </Typography>{" "}
                </CardContent>
              </Collapse>
            </Card>
            <br />
          </div>
        ))
      );
    }
  }, [data]);

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/Form" component={Form} />
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <header>
                  İş başvuruları için lütfen linke tıklayınız →
                  <LinkButton
                    to="/Form"
                    onClick={(event) => {
                      console.log("custom event here!", event);
                    }}
                  >
                    İş Başvurusu yap!
                  </LinkButton>
                </header>
                <br />
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {id}
                </Grid>
              </div>
            )}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
