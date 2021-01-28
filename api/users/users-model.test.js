it("passes sanity test", () => {
    expect(3).toBe(3)
});

it("has a testing env", () => {
    expect(process.env.DB_ENV).toBe("testing")
});


