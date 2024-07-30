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
      console.log(request)
      const hash = window.location.hash

      const hashParams = new URLSearchParams(hash.substring(1))

      const idToken = hashParams.get('id_token') as string

      console.log("sending code to server", idToken);

      const response = await new Promise((resolve) => {
        (socket as Socket<SocketEvents>).emit(
          "postAuthCode",
          idToken,
          (response) => {
            console.log("server responds ok");

            resolve(response);
          }
        );
      });

      return redirect("/");
    },
  },
];
