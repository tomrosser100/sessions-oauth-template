import type { Server, Socket } from "socket.io";
import type SocketEvents from "../../shared/socketEvents";

export default (io: Server, socket: Socket<SocketEvents>) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
  });

  socket.on('userPrompt', async (userInput, callback) => {
    console.log('received', userInput)

    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('')
        }, 3000)
    })

    callback({ type: 'gpt', msg: 'hi this is a chatgpt response' })
  })
};