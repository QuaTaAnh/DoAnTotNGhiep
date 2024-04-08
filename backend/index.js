import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from 'cors'
import connectDB from "./config/db.js"
import initRoute from './routes/index.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", 'GET', 'PUT', "DELETE"]
}))

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     
    limit: '100mb',
    extended: true
}));
connectDB()

initRoute(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log(`Server localhost:${PORT}`)
})