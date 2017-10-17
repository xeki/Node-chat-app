const{Users} = require("./users");
const expect = require("expect");

describe("Users",()=>{
  var users;

  beforeEach(()=>{
    users = new Users();
    users.users =[{
      id:1,
      name:"Andrew",
      room:"Node Course"
    },{
      id:2,
      name:"Jen",
      room:"React Course"
    },
    {
      id:3,
      name:"Julie",
      room:"Node Course"
    }]
  });
  it("should create a user",()=>{
    var user = new Users();
    var newUser = user.addUser(12,"andrew","dev");
    expect(user.users.length).toBe(1);
    expect(newUser.id).toBe(12);
    expect(newUser.name).toBe("andrew");
    expect(newUser.room).toBe("dev");
  });
  it("Should remove a user from a list",()=>{
    var user = new Users();
    var newUser = user.addUser(1,"andrew","dev");
    newUser = user.addUser(2,"tom","dev");
    expect(user.users.length).toBe(2);
    user.removeUser(2);
    expect(user.users.length).toBe(1);
    expect(user.users[0].id).toBe(1);
  });
 it("shoudn't remove a user",()=>{
   var user = users.removeUser(10);
   expect(user).toBeFalsy();
 });
  it("should return all users in room node course",()=>{
    var userNames = users.getUserList("Node Course");
    expect(userNames.length).toBe(2);
    expect(userNames).toContain("Julie");
  });

  it("should find a user by id",()=>{
    var user = users.getUser(1);
    expect(user).toBeTruthy();
    expect(user.id).toBe(1);
  });

  it("shouldn't find a user by id when id doesn't match",()=>{
    var user = users.getUser(10);
    expect(user).toBeFalsy();
  });
});
