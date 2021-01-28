const express = require("express");
const server = express();
const Users = require("./users/users-model")

server.use(express.json());
// server.use("/api/users", userRouter);


server.get("/", (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json("Unable to get users")
        })
});

server.post("/", (req, res) => {
    Users.insert(req.body)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({ message: err })
        })
});

server.delete("/:id", (req, res) => {
    const { id } = req.params;
    Users.remove(id)
        .then(deletedUser => {
            res.status(200).json(deletedUser)
        })
        .catch(err => {
            res.status(500).json("unable to delete user")
        })

});

module.exports = server;
