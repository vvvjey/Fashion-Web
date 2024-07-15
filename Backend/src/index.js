const express = require("express");
const bodyParser = require('body-parser');
const initWebRoutes = require("./route/route");
const connectDB = require('./config/connectDB');
var cors = require('cors')
var cookieParser = require('cookie-parser');
const socketIo = require('socket.io');
const http = require('http');
require('dotenv').config()


const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const corsOptions ={
    origin:`${process.env.REACT_URL}`, 
    credentials:true,       
}
app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect , this include http not only port of FrontEnd
//     res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type','text/plain');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
var activeUsers=[];
io.on("connection", (socket) => {
    console.log("New client connected: " + socket.id); 


    socket.on('new-user-add',(newUserId)=>{
        if(!activeUsers.some((user)=>user.userId===newUserId)){
            activeUsers.push({
                userId:newUserId,
                socketId:socket.id
            })
            console.log('new user add',activeUsers);
        }
        io.emit("get-users", activeUsers);
    })


    socket.on("sendMsgClient",(data)=>{
        let user = activeUsers.find((user)=>user.userId==data.receiverId);
        console.log(activeUsers);
        console.log(user);
        if(user){
            io.to(user.socketId).emit('receive-message',(data));
            console.log('ok',user.socketId)
        } 
    })
    

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        io.emit("get-users", activeUsers);
    });
});


initWebRoutes(app);
connectDB()
server.listen(5000, () => {  
    console.log("Server running on 5000");
});