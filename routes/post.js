const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPost,
    getPostUser,
    updatePost,
    deletePost,
    dashboard
} = require('../controllers/post')

router.get('/dashboard' , dashboard)
router.route('/').get(getAllPosts).post(createPost)
router.get('/user-post' , getPostUser)
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost)

module.exports = router