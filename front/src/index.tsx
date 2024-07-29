import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routing/routes";
import './styling/tailwind/tw-styles.css'
import './styling/styles.css'
import './socket'

const router = createBrowserRouter(routes as any);

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app") as Element);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
