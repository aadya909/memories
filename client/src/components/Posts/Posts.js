import React from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (isLoading) {
    return (
      <Grid container justify="center" alignItems="center" style={{ minHeight: '200px' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No posts found.
      </Typography>
    );
  }

  return (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
