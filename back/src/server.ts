import express, { type Request } from "express";
import sslRedirect from "heroku-ssl-redirect";
import { createServer } from "node:http";
import { Server } from "socket.io";
import registerSocketHandlers from "./authHandlers";
import dbClient from "./dbClient";
import { sessionMiddleware } from "./session";

export const options = {
  distPath: "/front/dist",
  htmlFilename: "index.html",
  usingSSL: false,
  port: process.env.PORT || 5006,
};

const app = express();
const server = createServer(app);
const io = new Server(server);

if (options.usingSSL) app.use(sslRedirect());

app.use(sessionMiddleware)

io.engine.use(sessionMiddleware)

app.set('trust proxy', 1)

app.use(express.static(process.cwd() + options.distPath));

app.get("/**", function (req, res) {
  res.sendFile(process.cwd() + options.distPath + "/" + options.htmlFilename);
});

io.on("connection", (socket) => {
  const req = socket.request as Request
  const session = req.session
  console.log('sessionID', session.id)
  console.log('socketID', socket.id)
  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
  });
  registerSocketHandlers(io, socket);
});

server.listen(options.port, () => {
  console.log(`http://localhost:${options.port}`);
});

function gracefulShutdown() {
  console.log("Received shutdown signal...");
  if (dbClient) {
    dbClient.close(false);
    console.log("MongoDB connection closed.");
    process.exit(0);
  } else {
    process.exit(0);
  }
}

process.on("SIGINT", gracefulShutdown); // CTRL+C
process.on("SIGTERM", gracefulShutdown); // kill command
