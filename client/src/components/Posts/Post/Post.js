import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  IconButton,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.sub || user?.result?._id;

  const Likes = () => {
    const likes = post.likes || [];
    if (likes.length > 0) {
      const isLiked = likes.includes(userId);
      return isLiked ? (
        <>
          <ThumbUpAltIcon fontSize="small" />&nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;
          {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like
      </>
    );
  };

  const openPost = () => history.push(`/posts/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        className={classes.cardAction}
        onClick={openPost}
        component="span"
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile?.startsWith('data:image')
              ? post.selectedFile
              : 'https://via.placeholder.com/300x200.png?text=No+Image'
          }
          title={post.title}
        />
      </ButtonBase>

      {/* EDIT BUTTON - Outside ButtonBase to avoid triggering post open */}
      {userId === post?.creator && (
        <div className={classes.overlayEdit}>
          <IconButton
            size="small"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering openPost
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </div>
      )}

      <div className={classes.details}>
        {post.tags.map((tag, index) => (
          <Typography
            key={index}
            variant="body2"
            style={{
              display: 'inline-block',
              backgroundColor: '#e0e0e0',
              padding: '4px 8px',
              borderRadius: '12px',
              marginRight: '5px',
              fontSize: '12px',
            }}
          >
            #{tag}
          </Typography>
        ))}
      </div>

      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {userId === post?.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
