import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from "mongoose"
import profileRouter from './services/profile/index.js'




const server = express();


const port = process.env.PORT || 3001

// ********************************* MIDDLEWARES ***************************************

server.use(cors())
server.use(express.json())

// ********************************* ROUTES ********************************************

server.use('/profile', profileRouter)

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