"use strict";
const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

let userName = '';
let groupName = '';
let message = '';
 //receiving  message from  server to chat
hubConnection.on('ReceiveInCommonChat', function (message, userName) {

    let userNameElem = document.createElement("b");
    userNameElem.appendChild(document.createTextNode(userName + ' написал в общем чате : '));

    let elem = document.createElement("p");
    elem.appendChild(userNameElem);
    elem.appendChild(document.createTextNode(message));

    var firstElem = document.getElementById("chatroom").firstChild;
    document.getElementById("chatroom").insertBefore(elem, firstElem);

});
//receiving  message from  server to group
hubConnection.on('ReceiveInGroup', function (message, userName) {

    let userNameElem = document.createElement("b");
    userNameElem.appendChild(document.createTextNode(userName + ' написал в группе : '));

    let elem = document.createElement("p");
    elem.appendChild(userNameElem);
    elem.appendChild(document.createTextNode(message ));

    var firstElem = document.getElementById("chatroom").firstChild;
    document.getElementById("chatroom").insertBefore(elem, firstElem);

});

hubConnection.on("NotifyCommonChat", function (message) {

    let elem = document.createElement("p");
    elem.appendChild(document.createTextNode(message));

    var firstElem = document.getElementById("chatroom").firstChild;
    document.getElementById("chatroom").insertBefore(elem, firstElem);
});

hubConnection.on("NotifyGroup", function (message) {

    let elem = document.createElement("p");
    elem.appendChild(document.createTextNode(message));

    var firstElem = document.getElementById("chatroom").firstChild;
    document.getElementById("chatroom").insertBefore(elem, firstElem);
});
// enter common chat
document.getElementById("loginBtn").addEventListener("click", function (e) {
    userName = document.getElementById("userName").value; //set user
    hubConnection.invoke("EnterChat", userName);
});

//  sending message to the server from chat
document.getElementById("sendBtn").addEventListener("click", function (e) {
     message = document.getElementById("message").value;//set message
    hubConnection.invoke("SendToCommonChat", message, userName);
});
//enter group
document.getElementById("groupBtn").addEventListener("click", function (e) {
    groupName = document.getElementById("groupName").value; //set group
    hubConnection.invoke("EnterGroup", userName, groupName);
});
// sending message to the server from group
document.getElementById("sendToGroupBtn").addEventListener("click", function (e) {
    hubConnection.invoke("SendToGroup",message, userName, groupName);
});
hubConnection.start();