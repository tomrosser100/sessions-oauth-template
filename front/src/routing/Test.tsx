import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

export function Component() {
  const data = useLoaderData() as { slowData: { message: string } };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={data.slowData}>
        {(slowData) => (
          <div>
            <p>{slowData.message}</p>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export async function loader() {
    console.log("loader start");

    const slowDataPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.log("loader finish");
        resolve({ message: `Hi I'm data` })
      }, 2000);
    });

    return defer({ slowData: slowDataPromise });
  }