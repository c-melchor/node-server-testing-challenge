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

        it("returns the new user object", async () => {
            await User.insert(user2);
            expect(user2).toMatchObject({ ...user2 })
        });
    });

    describe("delete function", () => {
        it("deletes user based on id", async () => {
            let all;
            const [id] = await db('users').insert(user1)
            await User.delete(id);
            all = await db("users")
            expect(all).toHaveLength(0)
        });

        it("returned the deleted user object", async () => {

        });
    });
});