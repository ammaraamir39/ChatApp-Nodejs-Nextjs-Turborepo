import { Server } from "socket.io"

class SocketService {
  io: Server
  constructor() {
    console.log("Socket Service Initiated")
    this.io = new Server()
  }

  public initListener() {
    const io = this.io
    io.on("connect", (socket) => {
      console.log("New Socket Connected ", socket.id)

      socket.on("event:message", ({ message }: { message: string }) => {
        console.log("New Message Received . ", message)
      })
    })
  }

  getIo() {
    return this.io
  }
}

export default SocketService
