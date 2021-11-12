import { useState, useEffect, useRef } from "react";
import classes from "./Chat.module.css";
import { useContext, useCallback } from "react";
import { SocketContext } from "../../../context/socket";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const Chat = (props) => {
  const socket = useContext(SocketContext);
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const messagesRef = useRef(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      socket.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: newMessage,
      });
      setNewMessage("");
    },
    [socket, newMessage]
  );

  const handleNewMessage = useCallback(
    (message) => {
      const newMessageFromSocket = {
        ...message,
        ownedByCurrentUser: socket.id === message.senderId,
      };
      props.setMessages((prev) => [...prev, newMessageFromSocket]);
    },
    [props, socket.id]
  );

  const scrollToBottom = () => {
    //console.log("scrollToBottom");
    messagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  useEffect(() => {
    socket.on(NEW_CHAT_MESSAGE_EVENT, handleNewMessage);

    return () => {
      socket.off(NEW_CHAT_MESSAGE_EVENT, handleNewMessage);
    };
  }, [socket, handleNewMessage]);

  useEffect(() => {
    if (props.messages.length > 3) {
      scrollToBottom();
    }
  }, [props.messages]);

  return (
    <div className={classes.bodybox}>
      <div className={classes.chatborder}>
        <h3>Chat</h3>
        <div className={classes.chatbox}>
          {props.messages !== [] &&
            props.messages.map((message, index) => (
              <p key={index}>
                <span
                  style={{
                    color: message.ownedByCurrentUser ? "#1d9cb8" : "#b84b1d",
                  }}
                >
                  [{message.sender}] {}
                </span>
                {message.body}
              </p>
            ))}
          <p ref={messagesRef} />
        </div>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            name="chat"
            id="chatbox"
            value={newMessage}
            placeholder="Type something to the opponent"
            onChange={(event) => setNewMessage(event.target.value)}
            style={{ width: "100%", minHeight: "4vh" }}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
