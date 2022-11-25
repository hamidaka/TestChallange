const express = require("express")
const { createPost, getPosts, getPostByUserId, getPostById, updatePost, likePost, deletePost } = require("../controllers/postControllers")
const verifyOwner = require("../middlewares/verifyOwner")
const router = express.Router()

router.post("/",createPost)
router.get("/",getPosts)
router.get("/:userId",getPostByUserId)
router.get("/post/:postId",getPostById)
router.put("/update/:postId/:userId",verifyOwner,updatePost)
router.put("/likes/:postId/:userId",likePost)
router.delete("/:postId/:userId",verifyOwner,deletePost)

module.exports = router