import axios from 'axios';

const API=axios.create({baseURL :'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})



const url = 'http://localhost:5000/posts';

export const fetchPost = (id)=> API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (search, tags) =>
  API.get('/posts/search', {
    params: {
      searchQuery: search || 'none',
      tags: tags,
    },
  });
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost =(id) => API.delete(`/posts/${id}`);
export const likePost =(id) => API.patch(`/posts/${id}/likePost`);
export const comment = (commentData, id) => API.post(`/posts/${id}/commentPost`, commentData);


export const signIn=(formData)=> API.post('/user/signin' , formData);
export const signUp=(formData)=> API.post('/user/signup' , formData);

