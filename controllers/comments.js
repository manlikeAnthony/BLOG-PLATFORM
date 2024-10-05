const Comment = require('../models/comments');
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const createComment = async (req, res) => {
    req.body.author = req.user.userId;
    req.body.post = req.params.postId
    const comment = await Comment.create(req.body);
    res.status(StatusCodes.CREATED).json({ comment })
}
const getCommentOnPost = async (req, res) => {
    const { postId: post } = req.params;
    const comment = await Comment.find({ post })
    res.status(StatusCodes.OK).json({ comment })
}
const getAllUserComments = async (req, res) => {
    const { user: { userId: author } } = req
    const comment = await Comment.find({ author })
    res.status(StatusCodes.OK).json({ comment })
}
const getSingleComment = async (req, res) => {
    const { user: { userId: author }, params: { id: commentId } } = req
    const comment = await Comment.fiindOne({ author, _id: commentId })
    if (!comment) {
        throw new NotFoundError(`no item with id :${commentId}`)
    }
    res.status(StatusCodes.OK).json({ comment })
}
const editComment = async (req, res) => {
    const { user: { userId: author }, params: { id: commentId }, body: { comment } } = req
    const comments = await Comment.findOneAndUpdate({ author, _id: commentId }, req.body, {
        new: true,
        runValidators: true
    })
    if (!comments) {
        throw new NotFoundError(`no item with id :${commentId}`)
    }
    res.status(StatusCodes.OK).json({ comments })

}
const deleteComment = async (req, res) => {
    const { user: { userId: author }, params: { id: commentId } } = req
    const comment = await Comment.findOneAndDelete({ author, _id: commentId })
    if (!comment) {
        throw new NotFoundError(`no item with id :${commentId}`)
    }
    res.status(StatusCodes.OK).json({ success : true , msg : 'successfully deleted' , deletedData : comment })
}

module.exports = {
    createComment,
    getCommentOnPost,
    getAllUserComments,
    getSingleComment,
    editComment,
    deleteComment
}