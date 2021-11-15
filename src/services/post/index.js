import express from "express"
import q2m from "query-to-mongo"

const postRouter = express.Router()

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
  
      const deletedpPost = await PostModel.findByIdAndDelete(id)
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

export default postRouter
  