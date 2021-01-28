const express = require("express");
const server = express();
const userRouter = require("./users/users-router");

server.use(express.json());
server.use("/api/users", userRouter);

module.exports = server;
