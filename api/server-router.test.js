const request = require("supertest");
const db = require("../data/db-config");
const server = require("./server")

const user1 = { username: "cam", email: "c@email.com" };
const user2 = { username: "ajm", email: "a@email.com" };
const user3 = { username: "bpm", email: "a@email.com" };


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('users').truncate()
})
afterAll(async () => {
    await db.destroy()
})

describe("server", () => {
    describe("[GET] method", () => {
        it("responds with 200", async () => {
            const res = await request(server).get("/api/users")
            expect(res.status).toBe(200)
        });

        it("returns the correct amount of users", async () => {
            let res
            await db("users").insert(user1);
            res = await request(server).get("/api/users");
            expect(res.body).toHaveLength(1)

            await db("users").insert(user2);
            res = await request(server).get("/api/users");
            expect(res.body).toHaveLength(2)
        });
    });

    describe("[POST] method", () => {
        it("adds a new user to db", async () => {
            let res
            res = await request(server).post("/api/users").send(user3)
            expect(res.body).toMatchObject({ ...user3 })
        });

        it("responds with new user object", async () => {
            let res;
            await db("users").insert(user2)
            res = await request(server).get("/api/users")
            expect(res.body[0]).toMatchObject({ id: 1, ...user2 })
        });
    });

    describe("[DELETE] method", () => {
        it("deletes user based on id", async () => {
            let res;
            const [id] = await db("users").insert(user1)
            res = await request(server).delete("/api/users/:id").send({ id });
            expect(res.body).toHaveLength(0)
        });

        it("responds with a 200", async () => {
            let res;
            const [id] = await db("users").insert(user2);
            res = await request(server).delete("/api/users/:id").send({ id })
            expect(res.status).toBe(200)
        })
    });
});