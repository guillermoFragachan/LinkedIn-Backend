import express from "express";
import ProfileModel from "./sechema.js";
// import {getPDFReadableStream} from "./lib.js"
import { pipeline } from "stream"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { getPDFReadableStream } from "./pdf.js";
import q2m from "query-to-mongo"
import experienceendpoint from "../experience/handler.js";

const {
	downloadCSV,
	downloadPDF,
	imgExperience,
	creatExperience,
	updateExperience,
	getAllExperience,
	deleteExperience,
	getExperienceById,
} = experienceendpoint;



//*************************************    CLAUDINARY     *************************** 
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});


const cloudinaryStorage = new CloudinaryStorage({
	cloudinary:cloudinary
})

//*************************************    CRUD PROFILES     *************************** 

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


      

        const mongoQuery = q2m(req.query)
        const total = await ProfileModel.countDocuments(mongoQuery.criteria)

        const profilesToShow = await ProfileModel.find(mongoQuery.criteria)
        .limit(mongoQuery.options.limit)    
        .skip(mongoQuery.options.skip)
        .populate({path:"friendRequests",populate:[{path:"userSent",select:"name,email,image"},{path:"userReceived",select:"name"}]})
        .populate({path:"friends"})


        res.send(profilesToShow)
    }catch (error){
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const profile = await ProfileModel.findById(req.params.id)
        .populate({path:"friendRequests",populate:[{path:"userSent",select:"name"},{path:"userReceived",select:"name"}]})
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



//*************************************    CRUD FILES     *************************** 


router.put('/:id/picture', multer({storage:cloudinaryStorage}).single('img'), async(req, res, next)=>{
    try{
    const profile = await ProfileModel.findById(req.params.id)
    profile.image = req.file.path
    await profile.save()
    res.status(201).send(profile)
    }catch (error){
        next(error)
    }

  
  })


// router.get("/:id/CV",async (req, res, next) => {
//     try{
//     res.setHeader("Content-Disposition", "attachment; filename=CV.pdf")

// 	const profile = await ProfileModel.findById(req.params.id)


// 	const source = getPDFReadableStream({ 
// 		name: profile.name,
//         surname: profile.surname,
// 		email: profile.email,
//         bio: profile.bio,
//         title: profile.title,
//         area: profile.area,
//         image: profile.image,
//         username: profile.username

//     })
// 		 // PDF READABLE STREAM
//     const destination = res

//     pipeline(source, destination, err => {
//       if (err) next(err)
//     })
//     }catch (error){
//         next(error)
//     }

// })

router.get("/:id/CV", async (req, res, next) => {
  try {
    const profile = await ProfileModel.findById(req.params.id)
    res.setHeader("Content-Disposition", `attachment; filename=cv.pdf`)

    const source = await getPDFReadableStream(profile) 
    const destination = res

    pipeline(source, destination, err => {
      if (err) next(err)
    })
  } catch (error) {
    next(error)
  }
})


////*************************************    CRUD PROFILES     *************************** 

router.delete('/:id', async (req, res, next) => {
    try{
        await ProfileModel.findByIdAndDelete(req.params.id)
        res.send(204)
    }catch (error){
        next(error)
    }
})

router.route("/:username/experiences").get(getAllExperience).post(creatExperience);

router.route("/:username/experiences/csv")
.get(downloadCSV)

router.route("/:username/experiences/:expId")
.put(updateExperience)
.get(getExperienceById)
.delete(deleteExperience);

router.route("/:username/experiences/:expId/picture")
.put(imgExperience)


export default router