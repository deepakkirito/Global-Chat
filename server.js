const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let userNames = {};
const image = {
  "22d5n":
    "https://cdn.glitch.global/674ae915-b8c0-45d6-bc69-5838efe1925c/22d5n.png?v=1675780731640",
  "23mdg":
    "https://cdn.glitch.global/674ae915-b8c0-45d6-bc69-5838efe1925c/23mdg.png?v=1675780731980",
  "23n88":
    "https://cdn.glitch.global/674ae915-b8c0-45d6-bc69-5838efe1925c/23n88.png?v=1675780736732",
  "226md":
    "https://cdn.glitch.global/674ae915-b8c0-45d6-bc69-5838efe1925c/226md.png?v=1675780739395",
  "2356g":
    "https://cdn.glitch.global/674ae915-b8c0-45d6-bc69-5838efe1925c/2356g.png?v=1675780744270",
};
let counter = 0;

io.on("connection", (clientSocket) => {
  if (counter == 4) {
    counter = 0;
  }
  clientSocket.emit(
    "captcha-data",
    `${Object.keys(image)[counter]} ${Object.values(image)[counter]}`
  );
  counter++;

  clientSocket.on("client-connect", (clientUsername) => {
    userNames[clientSocket.id] = clientUsername;
    clientSocket.broadcast.emit("new-user-connected", clientUsername);
    clientSocket.emit("user-message", {
      name: "Online",
      msg: `<--${clientUsername} Welcome to the Global Chat App-->`,
    });
    console.log(userNames);
  });

  clientSocket.on("client-message", (clientMessage) => {
    clientSocket.broadcast.emit("global-message", {
      name: userNames[clientSocket.id],
      msg: clientMessage,
    });
  });

  clientSocket.on("disconnect", () => {
    clientSocket.broadcast.emit("global-disconnection-message", {
      msg: `${userNames[clientSocket.id]} is disconnected`,
    });
    delete userNames[clientSocket.id];
    console.log("disconnect", clientSocket.id);
  });
});

app.use("/", (req, res, next) => {
  res.status(200).send("Welcome to the Web Socket Server");
});

// Run the server and report out to the logs
server.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on Port : ${process.env.PORT}`);
  }
);
