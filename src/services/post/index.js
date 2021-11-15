import express from "express"
import q2m from "query-to-mongo"
import PostModel from "./sechema.js"
import commentsHandlers from "../comments/index.js"
import CommentModel from "../comments/schema.js"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"

//*************************************    CLAUDINARY     *************************** 
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});


const cloudinaryStorage = new CloudinaryStorage({
	cloudinary:cloudinary
})
//********************************************* */

const postRouter = express.Router()

postRouter.put('/:id/picture', multer({storage:cloudinaryStorage}).single("img"), async (req, res, next) => {
  try {
    const postxy = await PostModel.findById(req.params.id)
    if(postxy){
      console.log("ok")
    } else { console.log("not ok")}
    // console.log(post.image)
    // post.image = req.file.path
    // await post.save()
    // res.status(201).send(post)
  } catch (error) {
    next(error)
  }
})

postRouter.post( "/", async(req,res, next)=> {
    try{
        const newPost = new PostModel(req.body)
        const {_id}= await newPost.save()
        res.status(201).send({_id})
    }catch(error) {
        next(error)
    }
})

postRouter.get("/", async(req,res,next)=> {
    try {
         const mongoQuery = q2m(req.query)
         const total = await PostModel.countDocuments(mongoQuery.criteria)

         const postToShow = await PostModel.find(mongoQuery.criteria)
         .limit(mongoQuery.options.limit)
         .skip(mongoQuery.options.skip)
         .populate({path: "user"})

         console.log(mongoQuery)


         res.send(postToShow)
    }catch (error) {
        next(error)
    }
})

postRouter.get("/:postId", async(req, res, next)=> {
    try {
        const id = req.params.postId

        const post = await PostModel.findById(id)
        if (post) {
            res.send(post)
        }else{
            res
            .status(404)
            .send({ message: `post with ${id} is not found!` })
        }
    }catch (error) {
        next(error)
    }
})

postRouter.put("/:postId", async (req, res, next) => {
    try {
      const id = req.params.postId
      const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, { new: true })
  
      if (updatedPost) {
        res.send(updatedPost)
      } else {
        res
            .status(404)
            .send({ message: `Post with ${id} is not found!` })
      }
    } catch (error) {
      next(error)
    }
  })

  postRouter.delete("/:postId", async (req, res, next) => {
    try {
      const id = req.params.postId
  
      const deletedPost = await PostModel.findByIdAndDelete(id)
      if (deletedPost) {
        res.status(204).send()
      } else {
        res
        .status(404)
        .send({ message: `post with ${id} is not found!` })
      }
    } catch (error) {
      next(error)
    }
  })


//*******COMMENT ENDPOINTS */

  const {   makeComment,
    getComments,
    getSingleComment,
    deleteComment,
    updateComment} = commentsHandlers

postRouter.route("/:postId/comments")
.get(getComments)
      .post(makeComment)
      // .get(getComments)

postRouter.route("/:postId/comments/:commentId")
      .get(getSingleComment)
      .put(updateComment)
      .delete(deleteComment)





export default postRouter
  
