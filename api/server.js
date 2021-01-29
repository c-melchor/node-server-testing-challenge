const express = require("express");
const server = express();
const Users = require("./users/users-model")

server.use(express.json());

server.get("/api/users", (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

server.post("/api/users", (req, res) => {
    Users.insert(req.body)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
});

server.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await Users.delete(id)

    try {
        if (deletedUser) {
            res.status(200).json(deletedUser)
        } else {
            res.status(500).json("cant delete")
        }
    }
    catch (error) {
        res.status(500).json(error)
    }

});

module.exports = server;
