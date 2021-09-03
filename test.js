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

const getUserId = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      console.log("User id: " + users[user_id]);
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

getUserId("juantvaldez85@gmail.com", users);
// getUserEmail("user@example.com", users);
// getUserPassword("user@example.com", users);
