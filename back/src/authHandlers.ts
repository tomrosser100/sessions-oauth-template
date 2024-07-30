import type { Server, Socket } from "socket.io";
import type SocketEvents from "../../shared/socketEvents";
import { google } from "googleapis";
import type { Request } from "express";
import axios from "axios";

const redirect = `${process.env.DYNO && 'https://auth-session-test-887deca60332.herokuapp.com' || `http://localhost:5006`}/auth/google/callback`;
console.log('REDIRECT_URL:', redirect)
const oauthEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirect
);

const url = oauth2Client.generateAuthUrl({
  access_type: "online",
  scope: [`email`],
});

export default (io: Server, socket: Socket<SocketEvents>) => {
  const req = socket.request as Request;
  const session = req.session;

  socket.on("isAuth", async (callback) => {
    const response = (await new Promise((resolve) => {
      setTimeout(() => {
        if (session.authorised === true) {
          resolve(true);
        } else resolve(false);
      }, 2000);
    })) as boolean;
    callback(response);
  });

  socket.on("getAuthURL", async (callback) => {
    const response = (await new Promise((resolve) => {
      console.log("received auth check");
      setTimeout(() => resolve(url), 2000);
    })) as string;
    console.log("returning url", url);
    callback(url);
  });

  socket.on("postAuthCode", async (code, callback) => {
    const { tokens } = await oauth2Client.getToken(code);
    const response = await axios.get(oauthEndpoint, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    console.log(response.data);

    if (tokens) {
      session.email = response.data.email;
      session.authorised = true;
      session.save();
    }

    callback("authorisation complete");
  });

  // socket.on("userPrompt", async (userInput, callback) => {
  //   console.log("received", userInput);

  //   const response = await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve("");
  //     }, 3000);
  //   });

  //   callback({ type: "gpt", msg: "hi this is a chatgpt response" });
  // });
};
