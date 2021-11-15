import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from "mongoose"
import profileRouter from './services/profile/index.js'
import postRouter from './services/post/index.js';
import experienceRouter from './services/experience/index.js';




const server = express();


const port = process.env.PORT || 3006

const whitelist = [process.env.FE_URL , process.env.FE_DEV_URL]
const corsOptions = {
    origin : function (origin, next) { 
        if (!origin || whitelist.indexOf(origin) !== -1) {
            next(null , true)
        } else {
            next(new Error("CROSS ORIGIN ERROR"))
        }
    }
}

// ********************************* MIDDLEWARES ***************************************

server.use(cors(corsOptions))
server.use(express.json())

// ********************************* ROUTES ********************************************
server.use('/experience', experienceRouter)
server.use('/profile', profileRouter)
server.use("/posts", postRouter)

// ********************************* ERROR HANDLERS ************************************




mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
    console.log("Mongo Connected!")


server.listen(port, () => {
    
  console.table(listEndpoints(server))
    console.log(`✅ Server running on port ${port}`)
})
})

mongoose.connection.on("error", err => {
  console.log(err)
})