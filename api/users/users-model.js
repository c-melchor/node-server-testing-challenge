const db = require("../../data/db-config")

module.exports = {
    getAll() {
        return db("users")
    }
}
