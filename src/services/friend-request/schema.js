import mongoose from "mongoose"


const { Schema, model} = mongoose

const FriendRequestSchema = new Schema(
    {
        
        userSent:{type: Schema.Types.ObjectId, ref:"Profile"},
        status: {type:String, default:"pending", enum:["pending","accepted","rejected"]},
        userReceived:{type: Schema.Types.ObjectId, ref:"Profile"}
        
    },
    {timestamps: true}
)
export default model("FriendRequest", FriendRequestSchema)