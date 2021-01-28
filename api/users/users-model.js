const db = require("../../data/db-config")

module.exports = {
    getAll() {
        return db("users")
    },
    // getById(id){
    //     return db("users")
    // }
}
