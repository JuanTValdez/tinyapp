const getUserId = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      return users[user_id].id;
    }
  }
  return null;
};

const getUserEmail = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      return users[user_id].email;
    }
  }
  return null;
};

const getUserPassword = function (email, users) {
  for (let user_id in users) {
    if (users[user_id].email === email) {
      return users[user_id].password;
    }
  }
  return null;
};

module.exports = { getUserId, getUserEmail, getUserPassword };
