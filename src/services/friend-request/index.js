import express from "express";
import FriendRequestSchema from "./schema.js";




const router = express.Router();


router.post("/:userId", async (req, res) => {
    try {
        const userReceived = req.params.userId;
        req.body.userReceived = userReceived;
        const friendRequest = await FriendRequestSchema.create(req.body);
        res.json(req.body)
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const deletedFriendRequest = await FriendRequestSchema.findByIdAndDelete(id)
        res.json(deletedFriendRequest)
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.get("/", async (req, res) => {
    try {
        const friendRequests = await FriendRequestSchema.find()
        res.json(friendRequests)
    } catch (error) {
        res.json({ message: error.message })
    }

})


export default router