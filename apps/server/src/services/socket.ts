import { Redis } from "ioredis"
import { Server } from "socket.io"

console.log(process.env.REDIS_HOST)
const pub = new Redis({
  username: "",
  host: "",
  password: "",
  port: 10615
})
const sub = new Redis({
  username: "",
  host: "",
  password: "",
  port: 10615
})
class SocketService {
  io: Server
  constructor() {
    console.log("Socket Service Initiated")
    this.io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*"
      }
    })

    sub.subscribe("MESSAGES")
  }

  public initListener() {
    const io = this.io
    io.on("connect", (socket) => {
      console.log("New Socket Connected ", socket.id)

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message Received . ", message)
        //publish message to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }))
      })
    })

    sub.on("message", async (channel, message) => {
      console.log("Channel =>", { channel, message })
      if (channel === "MESSAGES") {
        io.emit("message", message)
      }
    })
  }

  getIo() {
    return this.io
  }
}

export default SocketService
