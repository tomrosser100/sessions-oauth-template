import { redirect } from "react-router-dom";
import socket from "../socket";
import type { Socket } from "socket.io-client";
import type SocketEvents from "../../../shared/socketEvents";

export default async () => {
  console.log("checking user auth");

  const isAuth = (await new Promise((resolve) => {
    (socket as Socket<SocketEvents>).emit("isAuth", (response) => {
      resolve(response);
    });
  })) as boolean;

  console.log("auth", isAuth);

  if (isAuth) {
    console.log("continue to app");
    return null;
  } else {
    console.log("get auth url");

    const response = (await new Promise((resolve) => {
      (socket as Socket<SocketEvents>).emit("getAuthURL", (response) => {
        resolve(response);
      });
    })) as string;

    console.log("auth url received, redirecting...");
    return redirect(response);
  }
};
