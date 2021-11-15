/* 
   {
        "name": "Diego",
        "surname": "Banovaz",
        "email": "diego@strive.school",
        "bio": "SW ENG",
        "title": "COO @ Strive School",
        "area": "Berlin",
        "image": ..., //server generated on upload, set a default here
        "username": "admin",



        ****************** SERVER DATA **************************************
        "_id": "5d84937322b7b54d848eb41b", //server generated

        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    }


*/

import mongoose from "mongoose";

const { Schema, model } = mongoose


const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    surname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String, defaut: ""},
    username: { type: String, required: true, unique: true },

  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);