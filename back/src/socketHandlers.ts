import type { Server, Socket } from "socket.io";
import type SocketEvents from "../../shared/socketEvents";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5006/auth/google/callback'
);

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [`https://www.googleapis.com/auth/userinfo.email`]
})

export default (io: Server, socket: Socket<SocketEvents>) => {

  socket.on('isAuth', async (callback) => {
    const response = await new Promise(resolve => {
      setTimeout(() => resolve(true), 2000)
    }) as boolean
    callback(response)
  })

  socket.on('getAuthURL', async (callback) => {
    const response = await new Promise(resolve => {
      console.log('received auth check')
      setTimeout(() => resolve(url), 2000)
    }) as string
    console.log('returning url', url)
    callback(url)
  })

  socket.on('postAuthCode', async (code, callback) => {
    const { tokens } = await oauth2Client.getToken(code)
    console.log(tokens)
    callback('code received')
  })



  socket.on("userPrompt", async (userInput, callback) => {
    console.log("received", userInput);

    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 3000);
    });

    callback({ type: "gpt", msg: "hi this is a chatgpt response" });
  });
};
