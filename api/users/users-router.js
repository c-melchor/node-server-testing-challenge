const Users = require("./users-model");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: err })
        });
});

router.post("/", (req, res) => {
    Users.insert(req.body)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({ message: err })
        })
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Users.remove(id)
        .then(deletedUser => {
            res.status(200).json(deletedUser)
        })
        .catch(err => {
            res.status(500).json({ message: err })
        })

});

module.exports = router;