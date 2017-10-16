var socket = io();
    socket.on("connect",function(){
    console.log("Connected to server");
    // socket.emit("createEmail",{to:"andrew@example.com",text:"How are you doing buddy"});
    });


    socket.on("disconnect",function(){
      console.log("Disconnected from server");
    });

  //  socket.on("newEmail",function (email) {
  //    console.log("New Email",email);
  //  });
   socket.on("newMessage",function (message) {
     console.log("New Message ",message);
   });
  // socket.emit("createMessage",{from:"andi@gmial.com",text:"Still in jail, what a time?!"});
