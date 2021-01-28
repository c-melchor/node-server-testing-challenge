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

module.exports = router;