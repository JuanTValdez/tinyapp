const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const users = {
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
  r83hdw: {
    id: "r83hdw",
    email: "random@gmail.com",
    password: "1112222221",
  },
};

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" },
  p37oVw: { longURL: "https://www.lighthouse.ca", userID: "aJ48lW" },
  p38oVw: { longURL: "https://www.lighthouse.ca", userID: "user2RandomID" },
  p39oVw: { longURL: "https://www.lighthouse.ca", userID: "user2RandomID" },
  p39oVw: { longURL: "https://www.lighthouse.ca", userID: "user2RandomID" },
};
const userURLs = {};

const urlsForUser = function (id) {
  for (item in urlDatabase) {
    const user_id = urlDatabase[item].userID;

    if (id === user_id) {
      // const random_id = uuidv4().slice(0, 6);
      userURLs[item] = {
        // user_id: id,
        // shortURL: urlDatabase[item],
        longURL: urlDatabase[item].longURL,
      };
    }
  }

  // console.log(userURLs);

  return userURLs;
};

// urlsForUser("aJ48lW");

const getUserId = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      console.log("User id: " + users[user_id].id);
      return users[user_id].id;
    }
  }
  return null;
};
const getUserEmail = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      console.log("User email: " + users[user_id].email);
      return users[user_id].email;
    }
  }
  return null;
};

const getUserPassword = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      console.log(users[user_id].password);
      return users[user_id].password;
    }
  }
  return null;
};
// getUserPassword("random@gmail.com", users);
// urlsForUser("aJ48lW");
getUserId("random@gmail.com", users);
// getUserEmail("user@example.com", users);
// getUserPassword("user@example.com", users);

// const user = getUserId("user@example.com", users);

// console.log(getUserId(user));
// const expectedOutput = "userRandomID";
//assert.isTrue(getUserId(user), expectedOutput);
