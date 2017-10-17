const path = require('path');
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const{generateMessage,generateLocationMessage} =require("./utils/message");

const publicPath = path.join(__dirname,'../public');
console.log(__dirname+'/../public');
console.log(publicPath);
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',function (socket){
  console.log("new user connected");
  socket.emit("newMessage",generateMessage("Admin","Welcome to our chat room"));
  socket.broadcast.emit("newMessage",generateMessage("Admin","New user joined the chat room"));

  // socket.emit("newEmail",{from:"mike@example.com",subject:"greeting",text:"What't going on?"});
  //
  // socket.on("createEmail",function (newEmail){
  //   console.log("createEmail",newEmail);
  // });

  socket.on("disconnect",function () {
      console.log("user disconnected");
  });

  socket.on("createLocationMessage",(coords)=>{
    //io.emit("newMessage",generateMessage("Admin",`${coords.latitude}, ${coords.longitude}`));
    var geoMessage = generateLocationMessage("Admin",coords.latitude,coords.longitude);
    console.log(geoMessage);
    io.emit("locationMessage",geoMessage);
  });
  // socket.emit("newMessage",{from:"me",text:"are you there?",createdAt:new Date().toString()});
  socket.on("createMessage",function (message,callback) {
    console.log("New message from client: ",message);
   io.emit('newMessage',{from:message.from,text:message.text,createdAt:new Date().getTime()});


  //   socket.broadcast.emit("newMessage",generateMessage(message.from,message.text,new Date().getTime()));
  //
  // socket.emit("newMessage",generateMessage(message.from,message.text));
  // callback('This is from the server');
   });

});


const PORT = process.env.PORT|| 3001;
app.use(express.static(publicPath));

app.get("/",(req,res)=>{
  res.send('index.html');
})


server.listen(PORT,()=>{console.log(new Date(), "Server is up and running at PORT: ",PORT);});
