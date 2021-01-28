it("passes sanity test", () => {
    expect(3).toBe(3)
});

it("has a testing env", () => {
    expect(process.env.DB_ENV).toBe("testing")
});

const User = require("./users-model");
const db = require("../../data/db-config");
const user1 = { username: "cam", email: "c@email.com" };
const user2 = { username: "ajm", email: "a@email.com" }

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("users").truncate();
});

afterAll(async () => {
    await db.destroy()
});

describe("Users model", () => {
    describe("insert function", () => {
        it("adds new User", async () => {
            let all
            await User.insert(user1);
            all = await db("users");
            expect(all).toHaveLength(1)
        });
    });
});