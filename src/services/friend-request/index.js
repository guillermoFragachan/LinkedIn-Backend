import express from "express";
import FriendRequestSchema from "./schema.js";
import ProfileModel from "../profile/sechema.js";

const router = express.Router();

router.post("/send/:userId", async (req, res, next) => {
  try {
    if (req.body.userSent.toString() === req.params.userId.toString()) {
      res.status(401).send("You can't send friend request yourself");
    } else {
      const userReceived = req.params.userId; // recevier from params
      req.body.userReceived = userReceived;

      const userSent = req.headers.id; 
      req.body.userSent = userSent;

      const friendRequest = await new FriendRequestSchema(req.body).save();

      const getProfile = await ProfileModel.findByIdAndUpdate(userReceived, {
        $push: { friendRequests: friendRequest._id },
      });

      res.json(req.body);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFriendRequest = await FriendRequestSchema.findByIdAndDelete(
      id
    );
    res.json(deletedFriendRequest);
  } catch (error) {
    res.json({ message: error.message });
  }
});



router.put("/:id", async (req, res,next) => {
  try{
    const id = req.params.id;
    if(req.body.status === "accepted"){

      const friendRequest = await FriendRequestSchema.findById(id)


      const userReceived = friendRequest.userReceived;
      const userSent = friendRequest.userSent;


      const getProfile = await ProfileModel.findByIdAndUpdate(userReceived , {
        $push: { friends: userSent },
        
      },
      {new: true})

      const getProfile2 = await ProfileModel.findByIdAndUpdate(userSent , {
        $push: { friends: userReceived },

      },
      {new: true})

      const friendRequestDelete = await FriendRequestSchema.findByIdAndDelete(id)
  

      res.send(getProfile2, getProfile)

    }else if(req.body.status === "rejected"){
      const deletedFriendRequest = await FriendRequestSchema.findByIdAndDelete(id)
      res.send(deletedFriendRequest)

    }
    else{
      res.status(400).send("Invalid status");
    }
  


  }catch(error){
    res.send(error);
  }
}) 

router.get("/", async (req, res) => {
  try {
    const friendRequests = await FriendRequestSchema.find();
    res.json(friendRequests);
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
