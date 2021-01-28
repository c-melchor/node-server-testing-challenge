const request = require("supertest");
const db = require("../data/db-config");
const server = require("./server")

const user1 = { username: "cam", email: "c@email.com" };
const user2 = { username: "ajm", email: "a@email.com" };

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
    describe("[GET] users", () => {
        it("responds with 200", async () => {
            const res = await request(server).get("/")
            expect(res.status).toBe(200)
        });

        it("returns the correct amount of users", async () => {
            let res
            await db("users").insert(user1);
            res = await request(server).get("/");
            expect(res.body).toHaveLength(1)

            await db("users").insert(user2);
            res = await request(server).get("/");
            expect(res.body).toHaveLength(2)

        });
    });
});