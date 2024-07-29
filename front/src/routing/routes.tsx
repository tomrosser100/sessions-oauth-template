import React from "react";
import ErrorPage from "./ErrorPage";
import Main from "../fit-to-screen-app/Main";
import mainAction from "../fit-to-screen-app/action";

export default [
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    action: mainAction,
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
];
