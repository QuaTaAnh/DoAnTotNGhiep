import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from 'cors'
import connectDB from "./config/db.js"
import initRoute from './routes/index.js'
import bodyParser from 'body-parser'
import cron from 'node-cron'
import { expiredPostController } from "./controllers/postController.js"

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", 'GET', 'PUT', "PATCH", "DELETE"]
}))

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     
    limit: '100mb',
    extended: true
}));
connectDB()

initRoute(app)

//job
cron.schedule('0 0 * * *', expiredPostController); 

const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      const receiverId = data.receiverId;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId);
      console.log("Data: ", data);
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log(`Server localhost:${PORT}`)
})