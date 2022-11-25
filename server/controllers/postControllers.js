const Post = require("../models/postModel")
exports.createPost = async(req,res)=>{
    try {
    //     const userId =req.userId
    
    //   const {title,desc,img}= req.body
        const newPost = await Post.create(req.body)
        res.json(newPost)
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.getPosts = async(req,res)=>{
    try {
        const posts = await Post.find().populate("owner").populate("likes")
        res.json(posts)
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.getPostByUserId = async(req,res)=>{
    try {
        const postList =await Post.find({owner:req.params.userId})
        res.json(postList)
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.getPostById = async(req,res)=>{
    try {
        const postList = await Post.findById(req.params.postId)
        res.json(postList)
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.updatePost = async(req,res)=>{
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId,req.body,{new:true})
        res.json(updatedPost)
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.likePost = async(req,res)=>{
    try {
        const posts = await Post.findById(req.params.postId)
        const findUserId = await posts.likes.find(el=>String(el).includes(req.params.userId))
        let updatePost
        if(findUserId){
            updatePost =await Post.findByIdAndUpdate(req.params.postId,{$pull:{likes:req.params.userId}
                ,$inc:{likesCount:-1}},{new:true}).populate("likes")
        }
        else{
            updatePost =await Post.findByIdAndUpdate(req.params.postId,{$push:{likes:req.params.userId}
                ,$inc:{likesCount: 1}},{new:true}).populate("likes")
        }
        res.json(updatePost)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.deletePost = async(req,res)=>{
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId)
        res.json({msg:"post deleted with success",deletedPost})
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}