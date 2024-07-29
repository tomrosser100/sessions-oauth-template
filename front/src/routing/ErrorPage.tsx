import React from "react";
import { useRouteError } from "react-router-dom";

interface Error {
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div>
      <h1>Oops</h1>
      <h3>{error.statusText || error.message}</h3>
    </div>
  );
}
