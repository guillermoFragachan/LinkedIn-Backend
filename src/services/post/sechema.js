import mongoose from "mongoose"

const { Schema, model} = mongoose

const postSchema = new Schema(
    {
        text: {type:String, required:true},
        username:{type:String, default:"admin"},
        user:{type: Schema.Types.ObjectId, ref:"Profile"},
        image: {type:String, default:"empty"}
    },
    {timestamps: true}
)
export default model("PostModel", postSchema)