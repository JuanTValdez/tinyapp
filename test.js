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
};

const getUserEmail = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      return users[user_id].email;
    }
  }
  return null;
};
const getUserWithEmail = (email, users) => {
  for (let id in users) {
    if (users[id].email === email) {
      return users[id].email;
    }
  }
  return null;
};

console.log(getUserEmail("us2er@example.com", users));
console.log(getUserWithEmail("u2ser@example.com", users));
