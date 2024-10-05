const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentOnPost,
    getAllUserComments,
    getSingleComment,
    editComment,
    deleteComment
} = require('../controllers/comments');

router.get('/user-comments',getAllUserComments)

router.route('/:postId').post(createComment).get(getCommentOnPost)
router.route('/:id').get(getSingleComment).patch(editComment).delete(deleteComment)



module.exports = router