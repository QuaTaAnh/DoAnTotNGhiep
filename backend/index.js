import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from 'cors'
import connectDB from "./config/db.js"
import initRoute from './routes/index.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()

//middlewares
app.use(cors())
// app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     
    limit: '100mb',
    extended: true
}));

//dataconfig
connectDB()

//initRoute
initRoute(app)

//PORT
const PORT = process.env.PORT || 8080

//run
app.listen(PORT, () =>{
    console.log(`Server localhost:${PORT}`)
})