import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Header from "../Components/DetailsHeader";
import Detail from "../Components/Detail";
import PadGallery from "../Components/PadGallery";
import Description from "../Components/Description";
import Shift from "../Components/Shift";

// import Main from "./Main";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import post1 from "./blog-post.1.md";
// import post2 from "./blog-post.2.md";
// import post3 from "./blog-post.3.md";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(4)
  }
}));

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" }
];

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…"
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  }
];

//const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" }
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon }
  ]
};

export default function PadDetails({ match }) {
  const classes = useStyles();
  const [detail, setDetail] = React.useState({});

  var id = match.params.id;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pads/" + id)
      .then(res => {
        console.log(res.data);
        setDetail(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header detail={detail} />
        <Grid container spacing={4}>
          <PadGallery />
          <Detail pad={detail} />
        </Grid>
        <Grid container spacing={4} className={classes.mainGrid}>
          <Description title="Pad Description" pad={detail} />
          <Shift id={id} />
        </Grid>
        <Link className="link" to={`/Booking/${detail._id}`}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disableElevation
          >
            Book Now
          </Button>
        </Link>
      </Container>
    </React.Fragment>
  );
}
