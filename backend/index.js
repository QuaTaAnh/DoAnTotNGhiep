import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from 'cors'
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

//rest api
app.get('/', (req, res) =>{
    res.send("<h1>Backend 2</h1>")
})

//PORT
const PORT = process.env.PORT || 8080

//run
app.listen(PORT, () =>{
    console.log(`Server localhost:${PORT}`)
})