import express from "express";
import ProfileModel from "./sechema.js";
import {getPDFReadableStream} from "./lib.js"
import { pipeline } from "stream"


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

router.get('/:id', async (req, res, next) => {
    try{
        const profile = await ProfileModel.findById(req.params.id)
        res.send(profile)
    }catch (error){
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const profile = await ProfileModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(profile)
    }catch (error){
        next(error)
    }
})



// *************** FILE ENDPOINTS ***********************

router.put("./:id/picture", async (req, res, next) => {
    try{
        const profile = await ProfileModel.findByIdAndUpdate(req.params.id, {image: req.body.image}, {new: true})
        res.send(profile)
    }catch (error){
        next(error)
    }
})

router.get("/:id/CV",async (req, res, next) => {
    try{
    res.setHeader("Content-Disposition", "attachment; filename=CV.pdf")

	const profile = await ProfileModel.findById(req.params.id)
	// const profileIndex = profiles.findIndex(profile => profile._id === req.params.id)
	
	// const profile = profiles[profileIndex]

	const source = getPDFReadableStream({ 
		name: profile.name,
		email: profile.email})
		 // PDF READABLE STREAM
    const destination = res

    pipeline(source, destination, err => {
      if (err) next(err)
    })
    }catch (error){
        next(error)
    }

})


//extra
router.delete('/:id', async (req, res, next) => {
    try{
        await ProfileModel.findByIdAndDelete(req.params.id)
        res.send(204)
    }catch (error){
        next(error)
    }
})

export default router
