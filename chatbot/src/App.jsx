import { useState, useEffect, useRef } from "react";
import { Chatbot } from "supersimpledev";
import RobotProfileImage from "./assets/robot.png";
import UserProfileImage from "./assets/user.png";

import "./App.css";

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setInputText("");
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([
    { message: "hello chatbot", sender: "user", id: "id1" },
    { message: "Hello! How can I help you?", sender: "robot", id: "id2" },
    { message: "can you get me todays date?", sender: "user", id: "id3" },
    { message: "Today is September 27", sender: "robot", id: "id4" },
    { message: "who is the pm of india?", sender: "user", id: "id5" },
    { message: "Narendra Modi is the PM of India", sender: "robot", id: "id6" },
    { message: "Top Director in india?", sender: "user", id: "id7" },
    {
      message: "Rajmouli is the top director in india",
      sender: "robot",
      id: "id8",
    },
    { message: "Highest grossing movie in telugu?", sender: "user", id: "id9" },
    {
      message: "Baahubali 2 is the highest grossing movie in telugu",
      sender: "robot",
      id: "id10",
    },

    // Added predefined chats
    { message: "Capital of France?", sender: "user", id: "id11" },
    { message: "Paris is the capital of France", sender: "robot", id: "id12" },
    { message: "Who won the IPL 2023?", sender: "user", id: "id13" },
    {
      message: "Chennai Super Kings won the IPL 2023",
      sender: "robot",
      id: "id14",
    },
    { message: "Best programming language?", sender: "user", id: "id15" },
    {
      message: "It depends, but JavaScript is very popular",
      sender: "robot",
      id: "id16",
    },
    { message: "Tell me a fun fact?", sender: "user", id: "id17" },
    {
      message: "Did you know octopuses have three hearts?",
      sender: "robot",
      id: "id18",
    },
  ]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
