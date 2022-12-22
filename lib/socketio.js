import axios from "axios";
import line from "./line";

export default (io, socket) => {
  socket.on("insert-queue", async (data) => {
    io.emit("insert-queue-success", "check");
  });
};
