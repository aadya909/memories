import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

import {
  getPost,
  addComment,
  updateComment,
  deleteComment,
} from "../../actions/posts";

import useStyles from "./styles";

const PostDetails = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { post, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id || user?.result?.sub;

  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    dispatch(getPost(id));
    
  }, [id, dispatch]);

  useEffect(() => {
    if (!post && !isLoading) {
      history.push("/");
    }
  }, [post, isLoading, history]);

  if (!post) return null;

  if (isLoading)
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(
        addComment(post._id, {
          text: commentText,
          name: user?.result?.name,
          creator: userId,
        })
      );
      setCommentText("");
    }
  };

  const handleEditComment = () => {
    if (commentText.trim() && editingComment) {
      dispatch(updateComment(post._id, editingComment._id, commentText));
      setEditingComment(null);
      setCommentText("");
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(post._id, commentId));
  };

  const setEditMode = (comment) => {
    setEditingComment(comment);
    setCommentText(comment.text);
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.postDetailsContainer}>
        <img
          className={classes.media}
          src={post.selectedFile || "https://via.placeholder.com/600"}
          alt={post.title}
        />
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          By {post.name} • {moment(post.createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {post.message}
        </Typography>
        <Typography variant="body2" color="primary">
          {post.tags?.map((tag) => `#${tag} `)}
        </Typography>

        <Divider style={{ margin: "20px 0" }} />

        <Typography variant="h6" gutterBottom>
          Comments:
        </Typography>

        {post.comments?.length > 0 ? (
          post.comments.map((comment) => (
            <Paper
              key={comment._id}
              elevation={2}
              style={{ padding: "10px", marginBottom: "10px" }}
            >
              <Typography variant="subtitle2">
                <strong>{comment.name}</strong>: {comment.text}
              </Typography>
              {userId === comment.creator && (
                <div style={{ marginTop: "5px" }}>
                  <Button
                    size="small"
                    onClick={() => setEditMode(comment)}
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDeleteComment(comment._id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments yet. Be the first to comment!
          </Typography>
        )}

        <Divider style={{ margin: "20px 0" }} />

        {user ? (
          <div className={classes.commentSection}>
            <TextField
              label="Write a comment"
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              multiline
              rows={2}
              variant="outlined"
            />
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
              onClick={editingComment ? handleEditComment : handleAddComment}
            >
              {editingComment ? "Update Comment" : "Add Comment"}
            </Button>
          </div>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Please sign in to comment.
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default PostDetails;
