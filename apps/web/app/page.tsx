"use client"

import { useState, CSSProperties } from "react"
import { useSocket } from "../context/SocketProvider"

export default function Page() {
  const { sendMessage, messages } = useSocket()

  const [message, setMessage] = useState("")
  console.log("message = > ", message)
  return (
    <div style={styles.pageContainer}>
      <div style={styles.chatbox}>
        <div style={styles.chatWindow}>
          {messages.map((message) => (
            <div style={styles.message}>{message}</div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            style={styles.sendButton}
            onClick={(e) => sendMessage(message)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const styles: { [key: string]: CSSProperties } = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5"
  },
  chatbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "80vh", // Increased the height of the chatbox
    width: "500px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "20px", // Added equal padding around the chatbox
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" // Added a subtle shadow for better visual appearance
  },
  chatWindow: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px"
  },
  message: {
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#f1f1f1",
    borderRadius: "4px"
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ccc"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px"
  },
  sendButton: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer"
  }
}
