import express from "express"
import q2m from "query-to-mongo"
import CommentModel from "./schema.js"


const makeComment = async (req, res, next) => {

	try {
        req.body.post = req.params.postId;
		const newComment = new CommentModel(req.body);

		const { _id } = await newComment.save();
		res.status(200).send(_id);
	} catch (error) {
		next(error);
	}
};

const getComments = async (req, res, next) => {
    try {
        const query = q2m(req.query);
        const comments = await CommentModel.find( {post: req.params.postId}).populate({path:"user", select:"name"}).populate({path:"post", select:"title"})
        console.log(req.params.postId)
        res.status(200).send(comments);
    } catch (error) {
        next(error);
    }
    //      const foundpost = await PostModel.find({username: friendsProfile.username})

}

const getSingleComment = async (req, res, next) => {
    try {
        const comment = await CommentModel.findById(req.params.commentId).populate({path:"post", select:"title"})
        res.status(200).send(comment);
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        await CommentModel.findByIdAndDelete(req.params.commentId);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
}

const updateComment = async (req, res, next) => {
    try {
        const comment = await CommentModel.findByIdAndUpdate(req.params.commentId, req.body);
        res.status(200).send(comment);
    } catch (error) {
        next(error);
    }
}


const commentsHandlers = {
    makeComment,
    getComments,
    getSingleComment,
    deleteComment,
    updateComment


}


export default commentsHandlers