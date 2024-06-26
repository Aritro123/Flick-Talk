const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(bodyparser.json());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

//import route

const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is listening on port", process.env.PORT);
});

//  Web Socker

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUSers = new Map();
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    // console.log("msggg",data.message);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
