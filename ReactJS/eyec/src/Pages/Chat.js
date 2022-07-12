import {io} from "socket.io-client";
import Qs from "qs";
import "../components/styled/chat-style.css";
import { useState, useEffect } from "react";


const Chat = () => {
const [inRoomName, setIsRoomName] = useState(''); 
const [usersList, setUsersList] = useState([]);
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const {username, room} = Qs.parse(window.location.search,{
    ignoreQueryPrefix: true
});


useEffect(()=>{
  socket.emit('joinRoom',{username,room});

  //Get room and users
  socket.on('roomUsers', ({room, users}) => {
      outputRoomName(room);
      outputUsers(users);
  });
},[])

console.log("AAAAAAAAA",{username,room});


const socket = io("http://localhost:3004",{
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: "*",
    },
    transports : ['websocket']
});
//Join chatroom





//Message from server
socket.on('message', message=>{
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit

const submitForm = (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value

    socket.emit('chatMessage',msg, username);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
    
};
//Output message to DOM

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">${message.text}</p>`; 
    document.querySelector('.chat-messages').appendChild(div);
};

//Add roomname to dom
function outputRoomName(room){
    setIsRoomName(room);
}

function outputUsers(users){
    setUsersList(users);
}

  return (
    <div>
  <div className="chat-container">
    <header className="chat-header">
      <h1><i className="fas fa-smile"></i> EyeCForum</h1>
      <a href="main?" className="btn">Leave Room</a>
    </header>
    <main className="chat-main">
      <div className="chat-sidebar">
        <h3><i className="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">{inRoomName}</h2>
        <h3><i className="fas fa-users"></i> Users</h3>
        <ul id="users">
          {usersList.map((user)=><li>{user.username}</li>)}
        </ul>
      </div>
      <div className="chat-messages">
      </div>
    </main>
    <div className="chat-form-container">
      <form id="chat-form" onSubmit={(e) => submitForm(e)}>
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autoComplete="off"
        />
        <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>
  </div>
</div>
  )
}

export default Chat