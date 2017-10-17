var socket = io();
    socket.on("connect",function(){
    console.log("Connected to server");
    // socket.emit("createEmail",{to:"andrew@example.com",text:"How are you doing buddy"});
    });


    socket.on("disconnect",function(){
      console.log("Disconnected from server");
    });
   function ScrollToBottom() {
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");

    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
      // console.log("should scroll");
      messages.scrollTop(scrollHeight);
    }
   }

   socket.on("newMessage",function (message) {
     var template = $("#message-template").html();
      var formattedTime = moment(message.createdAt).format('h:mm a');
     var html = Mustache.render(template,{text:message.text,from:message.from,
     createdAt:formattedTime});
     $("#messages").append(html);
    //  console.log("New Message ",message);
    ScrollToBottom();
   });

  socket.on("locationMessage",function (location) {
    var formattedTime = moment(location.createdAt).format("h:mm a");
    var template = $("#location-message-template").html();
     var html = Mustache.render(template,{from:location.from,url:location.url,createdAt:formattedTime});
      //console.log("Url: ",location.url);

    $("#messages").append(html);
    ScrollToBottom();
  });

  jQuery("#message-form").on("submit",function (e) {
    e.preventDefault();
    socket.emit("createMessage",{from:"User",text:$("[name=message]").val()},function (data) {
      console.log("Got it!",data);
    });
     $("[name=message]").val(" ");
  });

  var locationButton = $("#send-location");
  locationButton.on("click",function () {
    if(!navigator.geolocation){
      locationButton.prop('disabled',false);
      return alert("Browser doesn't support geo location");
    }
    locationButton.prop('disabled',true).text("Sending ...");
    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit("createLocationMessage",{latitude:position.coords.latitude,longitude:position.coords.longitude});
      console.log(position);
      locationButton.prop('disabled',false).text("Send Location");
    },function (err) {
      alert("Unable to fetch geo location.");
      locationButton.prop('disabled',false).text("Send Location");
    })

  });

  // $("#sendMessage").on("click",function (e) {
  //   e.preventDefault();
  //   console.log("button clicked");
  // })
  // socket.emit("createMessage",{from:"andi@gmial.com",text:"Still in jail, what a time?!"});
