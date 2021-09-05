const { assert } = require("chai");

const { getUserEmail, getUserId, getUserPassword } = require("../helpers.js");

const testUsers = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};

describe("return with user id", function () {
  it("should return a users id with valid email", function () {
    const user = getUserId("user@example.com", testUsers);
    const expectedOutput = "userRandomID";
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if email is not found", function () {
    const user = getUserId("343435@gmail.com", testUsers);
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if email undefined", function () {
    const user = getUserId(testUsers);
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if database is undefined", function () {
    const user = getUserId("user@example.com");
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });

  it("should return users email with valid email", function () {
    const user = getUserEmail("user@example.com", testUsers);
    const expectedOutput = "user@example.com";
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if email not found", function () {
    const user = getUserEmail("user@exafmple.com", testUsers);
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if email is undefined", function () {
    const user = getUserEmail(testUsers);
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if database is undefined", function () {
    const user = getUserEmail("user@example.com");
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });

  it("should return users password with valid email", function () {
    const user = getUserPassword("user@example.com", testUsers);
    const expectedOutput = "purple-monkey-dinosaur";
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if email not found", function () {
    const user = getUserPassword("usddddder@example.com", testUsers);
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if email is undefined", function () {
    const user = getUserPassword(testUsers);
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });

  it("should return null if database is undefined", function () {
    const user = getUserPassword("user@example.com");
    const expectedOutput = null;
    assert.strictEqual(user, expectedOutput);
  });
});
