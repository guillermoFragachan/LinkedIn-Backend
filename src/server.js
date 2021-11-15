import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from "mongoose"
import profileRouter from './services/profile/index.js'
import postRouter from './services/post/index.js';




const server = express();


const port = process.env.PORT || 3006

// ********************************* MIDDLEWARES ***************************************

server.use(cors())
server.use(express.json())

// ********************************* ROUTES ********************************************

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