const path = require('path');
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const{generateMessage,generateLocationMessage} =require("./utils/message");
const{isRealString}=require("./utils/validation.js");
const{Users} = require("./utils/users");

const publicPath = path.join(__dirname,'../public');
console.log(__dirname+'/../public');
console.log(publicPath);
const app = express();
var users = new Users();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',function (socket){
      console.log("new user connected");
      socket.on("disconnect",function () {
          console.log("user disconnected");
           var user = users.removeUser(socket.id);
           if(user){
             io.to(user.room).emit("updateUserList",users.getUserList(user.room));
             io.to(user.room).emit("newMessage",{from:"Admin",text:`${user.name} has left the room`,createdAt:new Date().getTime()});
           }
      });

      socket.on("createLocationMessage",(coords)=>{
        //io.emit("newMessage",generateMessage("Admin",`${coords.latitude}, ${coords.longitude}`));
        var user = users.getUser(socket.id);
        if(user){

              var geoMessage = generateLocationMessage(user.name,coords.latitude,coords.longitude);
              io.to(user.room ).emit("locationMessage",geoMessage);
            }
      });

    socket.on("createMessage",function (message,callback) {
           var user = users.getUser(socket.id);
           if(user&&isRealString(message.text)){
              io.to(user.room).emit('newMessage',{from:user.name,text:message.text,createdAt:new Date().getTime()});
           }

    });

    socket.on("join",function (params,callback) {
            if(!isRealString(params.name)||!isRealString(params.room)){
                return callback("Name and room name are required");
            }

           socket.join(params.room);
           users.removeUser(socket.id);
           users.addUser(socket.id,params.name,params.room);

           io.to(params.room).emit("updateUserList",users.getUserList(params.room));
           socket.emit("newMessage",generateMessage("Admin","Welcome to our chat room"));
           socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} joined the chat room`));
            callback();
    });

});

const PORT = process.env.PORT|| 3000;
app.use(express.static(publicPath));

app.get("/",(req,res)=>{
  res.send('index.html');
})


server.listen(PORT,()=>{console.log(new Date(), "Server is up and running at PORT: ",PORT);});
