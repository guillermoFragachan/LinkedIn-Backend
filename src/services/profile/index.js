import express from "express";
import ProfileModel from "./sechema.js";


const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const newProfile = new ProfileModel(req.body)
        const{_id} = await newProfile.save()
        res.status(201).send(newProfile)
    }catch (error){
        next(error)
    }


})

router.get('/', async (req, res, next) => {
    try{
        const profiles = await ProfileModel.find({})
        res.send(profiles)
    }catch (error){
        next(error)
    }
})


export default router
