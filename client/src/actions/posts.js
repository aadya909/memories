import * as api from '../api';
import axios from 'axios';
// Action Creators

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type:'START_LOADING'});
    const { data } = await api.fetchPost(id);
    console.log(" getPosts response:", data); 
    dispatch({ type: 'FETCH_POST', payload: data });
    dispatch({type:'END_LOADING'})
  } catch (error) {
    console.error(error);
  }
};


export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:'START_LOADING'});
    const { data } = await api.fetchPosts(page);
    console.log(" getPosts response:", data); // { data, currentPage, numberOfPage }
    dispatch({ type: 'FETCH_ALL', payload: data });
    dispatch({type:'END_LOADING'})
  } catch (error) {
    console.error(error);
  }
};

export const getPostsBySearch = ({ search, tags }) => async (dispatch) => {
  try {
    console.log('🚀 Dispatching search with', search);
    dispatch({ type: 'START_LOADING' });

    const { data } = await api.fetchPostsBySearch(search, tags);
    console.log('🔍 Search response data:', data);

    dispatch({ type: 'FETCH_BY_SEARCH', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.error(error);
  }
};


export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    await api.createPost(post);

    // 🔁 Refetch all posts so the list updates
    dispatch(getPosts());

    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    await api.updatePost(id, post);

    // 🔁 Refetch all posts so updated post appears
    dispatch(getPosts());

    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: 'COMMENT', payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};



export const addComment = (postId, commentData) => async (dispatch) => {
  try {
    const { data } = await api.comment(commentData, postId);
    dispatch({ type: 'COMMENT', payload: data });
  } catch (error) {
    console.error("Failed to add comment:", error);
  }
};

export const updateComment = (postId, commentId, text) => async (dispatch) => {
  const { data } = await axios.patch(`/posts/${postId}/comment/${commentId}`, { text });
  dispatch({ type: 'UPDATE_POST', payload: data });
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  const { data } = await axios.delete(`/posts/${postId}/comment/${commentId}`);
  dispatch({ type: 'UPDATE_POST', payload: data });
};


export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: 'LIKE', payload: data });
  } catch (error) {
    console.error('Error liking post:', error);
  }
};
