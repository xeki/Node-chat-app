// const request = require("supertest");
const expect = require("expect");
const{generateMessage,generateLocationMessage} = require("./message");
//
// requiest(generateMessage("Ayele","Aleh wey")).

describe("Generate Message",()=>{
  it("should return valid message",()=>{
    var from = "Ayele";
    var text="Aleh wey?";
    var message = generateMessage(from,text);
    expect(typeof message).toBe("object");
    expect(message.from).toBe(from);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({from,text});
  });
});

describe("Generate location message",()=>{
  it("should generate location message",()=>{
    var from ="user";
    var lat = 40.36;
    var long = -13.35;
    var geoMessage = generateLocationMessage(from,lat,long);
    expect(geoMessage.from).toBe(from);
    expect(typeof geoMessage.url).toBe("string");
    expect(typeof geoMessage.createdAt).toBe("number");

  });
});
