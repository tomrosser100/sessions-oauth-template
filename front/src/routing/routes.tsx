import React from "react";
import ErrorPage from "./ErrorPage";
import Main from "../fit-to-screen-app/Main";
import mainAction from "../fit-to-screen-app/action";
import mainLoader from "../fit-to-screen-app/loader";
import socket from "../socket";
import type { Socket } from "socket.io-client";
import { redirect } from "react-router-dom";
import type SocketEvents from "../../../shared/socketEvents";

export default [
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    action: mainAction,
    loader: mainLoader,
    children: [
      {
        path: "lazy-test",
        async lazy() {
          const { Component, loader } = await import("./Test");
          return {
            Component,
            loader,
          };
        },
      },
    ],
  },
  {
    path: "/auth/google/callback",
    element: <div>Logging in...</div>,
    loader: async ({ request }: { request: Request }) => {
      const url = new URL(request.url);

      const error = url.searchParams.get('error')
      if (error) return redirect('/')

      const code = url.searchParams.get("code");
      if (!code) throw new Error();

      console.log("sending code to server", code);

      const response = await new Promise((resolve) => {
        (socket as Socket<SocketEvents>).emit("postAuthCode", code, (response) => {

          console.log("server responds ok");
          
          resolve(response);
        });
      });

      return redirect("/");
    },
  },
];
