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
    insert(user) {
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
    delete(id) {
        return db("users")
            .where("id", id)
            .delete()
            .then(id => {
                return db("users").where("id", id)
                // .first()
            })
    }
}
