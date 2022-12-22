import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import formidableExpress from "express-formidable";
import SocketLib from "./lib/socketio";
import { connectDatabase } from "./db/mongodb";
import indexRouter from "./routers";

dotenv.config();
const app = express();
app.use(cors());
app.use(formidableExpress());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.APP_PORT || 9000;

//connection
connectDatabase();

//socket connection
const onConnection = (socket) => {
  SocketLib(io, socket); 
};
io.on("connection", onConnection);

//route
app.use("/", indexRouter);

server.listen(PORT, () => console.log(`Start ... http://localhost:${PORT}`));
