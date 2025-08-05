import express from 'express';
import { getPostsBySearch, getPosts ,getPost, createPost , updatePost , deletePost ,commentPost, likePost,addComment, deleteComment, updateComment} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router=express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id',getPost)
router.post('/', auth , createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth,deletePost)
router.post('/:id/commentPost', auth,commentPost);
router.patch('/:id/likePost', auth,likePost);
router.post('/:id/comment', auth, addComment);             // Add comment
router.patch('/:id/comment/:commentId', auth, updateComment); // Edit comment
router.delete('/:id/comment/:commentId', auth, deleteComment); 

export default router;