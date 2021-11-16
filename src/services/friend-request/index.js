import express from "express";
import FriendRequestSchema from "./schema.js";
import ProfileModel from "../profile/sechema.js"




const router = express.Router();


router.post("/send/:userId", async (req, res, next) => {
    try {
        if(req.body.userSent.toString() === req.params.userId.toString()){

<<<<<<< HEAD

            res.status(401).send("You can't send friend request yourself")


        }
               
            else{

            
            
            const userReceived = req.params.userId // recevier from params
            req.body.userReceived = userReceived
            
            const friendRequest = await FriendRequestSchema.create(req.body)

            const getProfile = await ProfileModel.findByIdAndUpdate(
                 userReceived,
                 {$push: {friendRequests: friendRequest._id}},
            
            )
            


            res.json(req.body)}
            
        
            }
     catch (error) {
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

router.put("/:id", async (req, res) => {
=======
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFriendRequest = await FriendRequestSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedFriendRequest);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
>>>>>>> parent of 753a174 (content)
  try {
    const id = req.params.id;
    const updatedFriendRequest = await FriendRequestSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedFriendRequest);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
    try {
        const friendRequests = await FriendRequestSchema.find()
        res.json(friendRequests)
    } catch (error) {
        res.json({ message: error.message })
    }

})


export default router