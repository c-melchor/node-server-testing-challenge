const db = require("../../data/db-config")

module.exports = {
    getAll() {
        return db("users")
    },
    getById(id) {
        return db("users")
            .where("id", id)
            .first()
    },
    async insert(user) {
        return db("users").insert(user)
            .then(id => {
                return db("users")
                    .where("id", id)
                    .first()
            })
    },
    async update(changes, id) {
        return db("users")
            .where("id", id)
            .update(changes)
            .then(id => {
                return db("users")
                    .where("id", id)
                    .first();
            });
    },
    async remove(id) {
        return db("users").where("id", id).del()
            .then(id => {
                return db("users")
                    .where("id", id)
                    .first()
            })
    }
}
