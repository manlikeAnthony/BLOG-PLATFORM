const Post = require('../models/posts');
const { StatusCodes } = require('http-status-codes')
const { BadRequest, NotFoundError } = require('../errors')

const dashboard = async (req,res)=>{
    res.status(StatusCodes.OK).json({msg :`Hello ${req.user.name} , welcome to your blog`})
}

const createPost = async (req, res) => {
    req.body.author = req.user.userId;
    const post = await Post.create(req.body)
    res.status(StatusCodes.CREATED).json({ post })
}
const getAllPosts = async (req, res) => {
    const posts = await Post.find({});
    res.status(StatusCodes.OK).json({ posts })
}
const getPost = async (req, res) => {
    const { user: { userId }, params: { id: postId } } = req
    const post = await Post.findOne({ _id: postId, author: userId })
    if (!post) {
        throw new NotFoundError(`no job with id ${postId} `)
    }
    res.status(StatusCodes.OK).json({ post })

}
const getPostUser = async (req, res) => {
    const posts = await Post.find({ author: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ posts })
}
const updatePost = async (req, res) => {
    const { body: { title, content }, user: { userId }, params: { id: postId } } = req
    if (title === '' || content === '') {
        throw new BadRequest('content and title cannot be empty')
    }
    const post = await Post.findOneAndUpdate({author : userId , _id : postId} , req.body, {
        new : true,
        runValidators : true
    })
    if(!post){
        throw new NotFoundError(`no item wth id :${postId}`)
    }
    res.status(StatusCodes.OK).json({success : true , data : post})

}
const deletePost = async (req, res) => {
    const {user : {userId} , params : {id : postId}} = req
    const post = await Post.findOneAndDelete({author : userId , _id : postId})
    if(!post){
        throw new NotFoundError(`no item with id : ${postId}`)
    }
    res.status(StatusCodes.OK).send('successfully deleted')
}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    getPostUser,
    updatePost,
    deletePost,
    dashboard
}