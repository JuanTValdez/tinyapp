const express = require("express");
const app = express();
const PORT = 8090; // default port 8090
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const generateRandomNum = function () {
  let randomString = (Math.random() + 1).toString(36).substring(6);
  return randomString;
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5Xk": "http://www.google.com",
};

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

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  // const templateVars = { user_id: req.cookies["user_id"], urls: urlDatabase };
  const templateVars = {
    user: users[req.cookies["user_id"]],
    urls: urlDatabase,
  };

  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = { user: users[req.cookies["user_id"]] };
  res.render("urls_new", templateVars);
});

app.get("/register", (req, res) => {
  res.render("registration");
});

app.get("/hello", (req, res) => {
  const templateVars = { greeting: "Hello World!" };
  res.render("hello_world", templateVars);
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
});

app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const userEmail = getUserEmail(email, users);

  if (email === "" || password === "") {
    res
      .status(400)
      .send("Error 400: Email or Password cannot be empty strings");
    return;
  } else if (userEmail === email) {
    res.status(400).send("Error 400: Email is already in use!");
    return;
  } else {
    const random_id = generateRandomNum();
    users[random_id] = {
      id: random_id,
      email: email,
      password: password,
    };
    res.cookie("user_id", random_id);

    res.redirect("/urls");
  }
});

app.post("/urls", (req, res) => {
  const shortURL = generateRandomNum();

  urlDatabase[shortURL] = req.body.longURL;

  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL/edit", (req, res) => {
  // save the :shortURL that was entered in address bar into shortURL.
  const shortURL = req.params.shortURL;
  // grabs what was type into input on edit page (located in req.body and saves it into newURL)
  const { newURL } = req.body;
  // saves newURL into newLongURL
  const newLongURL = newURL;

  // changes longURL to the newLongURL at the shortURL location.
  urlDatabase[shortURL] = newLongURL;

  // redirects to url:shortURL with updated data.
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;

  delete urlDatabase[shortURL];
  res.redirect("/urls");
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    user: users[req.cookies["user_id"]],
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
  };

  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/login", (req, res) => {
  const { username } = req.body;
  console.log("Username entered: " + username);
  res.cookie("username", username);

  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
