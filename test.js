const { v4: uuidv4 } = require("uuid");

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
    email: "juantvaldez85@gmail.com",
    password: "1111",
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

  console.log(userURLs);
  // console.log(userURLs);

  return userURLs;
};

urlsForUser("aJ48lW");

const getUserId = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      // console.log("User id: " + users[user_id]);
      return users[user_id].id;
    }
  }
  return null;
};
const getUserEmail = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      // console.log("User email: " + users[user_id].email);
      return users[user_id].email;
    }
  }
  return null;
};

const getUserPassword = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      // console.log("User password: " + users[user_id].password);
      return users[user_id].password;
    }
  }
  return null;
};

// urlsForUser("aJ48lW");
// getUserId("juantvaldez85@gmail.com", users);
// getUserEmail("user@example.com", users);
// getUserPassword("user@example.com", users);
