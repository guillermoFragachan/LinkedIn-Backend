import mongoose from "mongoose"

const { Schema, model} = mongoose



/**
    {
        //user who posted it (as reference? nested? Your choice!)
        "comment": "I totally agree with you! Great post!",
        //post (as reference? nested? your choice)

        "_id": "5d84937322b7b54d848eb41b", //server generated
        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    } 



 */
    
const commentSchema = new Schema(
        {
            user: {type: Schema.Types.ObjectId, ref:"Profile"},
            comment:{type:String, default:"admin"},
            post:{
                type: Schema.Types.ObjectId,
                ref:"Post"
            },
        },
        {timestamps: true}
    )
export default model("Comment", commentSchema)

