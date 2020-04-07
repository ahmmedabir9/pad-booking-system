import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./PadCard.css";
import image from "../assets/images/PadProfile/pad.jpg";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Box from "@material-ui/core/Box";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
    borderRadius: 2
  },
  media: {
    height: "auto",
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function PadCard(props) {
  const classes = useStyles();
  const { pad } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link className="link" to={`/pad/${pad._id}`}>
          <CardMedia
            component="img"
            alt="Pad Image"
            height="250"
            image={image}
            title="Pad Image"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h4"
              className="card-title"
            >
              {pad.padname}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <LocationOnIcon fontSize="small" />
              {pad.area}
            </Typography>
            <Box
              component="fieldset"
              mb={3}
              borderColor="transparent"
              className="card-rating"
            >
              <Rating
                name="customized-empty"
                defaultValue={2}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                readOnly
                size="small"
              />
            </Box>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Link className="link" to={`/Pad/${pad._id}`}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
          >
            View Details
          </Button>
        </Link>
        <Link className="link" to={`/Booking/${pad._id}`}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disableElevation
          >
            Book Now
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
