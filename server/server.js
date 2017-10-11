const path = require('path');
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const publicPath = path.join(__dirname,'../public');
console.log(__dirname+'/../public');
console.log(publicPath);
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("new user connected");
  socket.on("disconnect",()=>{
    console.log("user disconnected");
  })
});

const PORT = process.env.PORT|| 3000;
app.use(express.static(publicPath));

app.get("/",(req,res)=>{
  res.send('index.html');
})


server.listen(PORT,()=>{console.log(new Date(), "Server is up and running at PORT: ",PORT);});
