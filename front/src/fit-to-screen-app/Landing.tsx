import React, { lazy, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const Main = lazy(() => import("./Main"));

export default () => {
  const data = useLoaderData();

  useEffect(() => {
    console.log(data)
  }, [])

  return <Main />;
};
