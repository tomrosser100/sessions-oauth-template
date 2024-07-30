import type { Server, Socket } from "socket.io";
import type SocketEvents from "../../shared/socketEvents";
import { google } from "googleapis";
import type { Request } from "express";
import axios from "axios";
import crypto from "crypto";

function generateNonce() {
  return crypto.randomBytes(16).toString("base64"); // Base64-encoded nonce
}

const nonce = generateNonce();

const redirect = `${
  (process.env.DYNO &&
    "https://auth-session-test-887deca60332.herokuapp.com") ||
  `http://localhost:5006`
}/auth/google/callback`;
const oauthEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirect
);

const url = oauth2Client.generateAuthUrl({
  access_type: "online",
  response_type: "id_token",
  scope: [`openid`],
  nonce,
});

export default (io: Server, socket: Socket<SocketEvents>) => {
  const req = socket.request as Request;
  const session = req.session;

  socket.on("isAuth", async (callback) => {
    console.log('isAuth:', session.authorised)


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

  socket.on("postAuthCode", async (idToken, callback) => {
    const ticket = await oauth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (payload === undefined) return callback("auth failed");
    if (payload.nonce !== nonce) return callback("auth failed");

    console.log(payload);
    const userId = payload.sub;
    console.log(userId);
    session.authorised = true;
    session.save();

    console.log(session.authorised)
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
