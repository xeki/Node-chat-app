const path = require('path');
const express = require("express");
const publicPath = path.join(__dirname,'../public');
console.log(__dirname+'/../public');
console.log(publicPath);
const app = express();

const PORT = process.env.PORT|| 3000;
app.use(express.static(publicPath));

app.get("/",(req,res)=>{
  res.send('index.html');
})


app.listen(PORT,()=>{console.log(new Date(), "Server is up and running at PORT: ",PORT);});
