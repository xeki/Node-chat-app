const moment = require("moment");
var generateMessage = (from,text)=>{
  return {from,text,createdAt:moment().valueOf()};
};

var generateLocationMessage = (from,latitude,longitude)=>{
  // return {from,url:`https://www.google.com/maps?q=${latitude},${longitude}`,createdAt:new Date().getTime()};
  return {from,url:`https://www.google.com/maps?q=40.38,-32.89`,createdAt:moment().valueOf()};
}
module.exports ={generateMessage,generateLocationMessage};
