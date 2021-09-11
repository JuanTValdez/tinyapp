const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const saltRounds = 12;
const { getUserId, getUserEmail, getUserPassword } = require("./helpers");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);
app.set("view engine", "ejs");

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.stackoverflow.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" },
  p37oVw: { longURL: "https://www.lighthouse.ca", userID: "aJ48lW" },
  p38oVw: { longURL: "https://www.espn.ca", userID: "user2RandomID" },
  p39oVw: {
    longURL: "https://www.youtube.ca",
    userID: "user2RandomID",
  },
  p39oVw: { longURL: "https://www.bing.ca", userID: "user2RandomID" },
};

const users = {
  f73ms3: {
    id: "f73ms3",
    email: "user@example.com",
    password: bcrypt.hashSync("1111", saltRounds),
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: bcrypt.hashSync("2222", saltRounds),
  },
  aJ48lW: {
    id: "aJ48lW",
    email: "random@gmail.com",
    password: bcrypt.hashSync("1234", saltRounds),
  },
};

const urlsForUser = function (id) {
  const userURLs = {};
  for (item in urlDatabase) {
    const user_id = urlDatabase[item].userID;

    if (id === user_id) {
      userURLs[item] = {
        shortURL: user_id,
        longURL: urlDatabase[item].longURL,
      };
    }
  }

  return userURLs;
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  const templateVars = {
    user: users[req.session.user_id],
    urls: urlsForUser(req.session.user_id),
  };

  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = { user: users[req.session.user_id] };

  if (templateVars.user) {
    res.render("urls_new", templateVars);
  } else {
    res.redirect("/login");
  }
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

app.get("/login", (req, res) => {
  const templateVars = { user: users[req.session.user_id] };

  res.render("login", templateVars);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const userId = getUserId(email, users);

  const userEmail = getUserEmail(email, users);
  const userPassword = getUserPassword(email, users);

  if (email === "" || password === "") {
    res.status(400).send("Error 400: Email or password cannot be empty");
  } else if (
    userEmail !== email ||
    bcrypt.compareSync(password, userPassword) === false
  ) {
    res.status(400).send("Error 400: Incorrect email or password");
  } else {
    // res.cookie("user_id", userId);
    req.session.user_id = userId;
    res.redirect("/urls");
  }
});

app.get("/register", (req, res) => {
  const templateVars = { user: users[req.session.user_id] };
  res.render("registration", templateVars);
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const userEmail = getUserEmail(email, users);
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  if (email === "" || password === "") {
    res
      .status(400)
      .send("Error 400: Email or Password cannot be empty strings");
    return;
  } else if (userEmail === email) {
    res.status(400).send("Error 400: Email is already in use!");
    return;
  } else {
    const random_id = uuidv4().slice(0, 6);

    users[random_id] = {
      id: random_id,
      email: email,
      password: hashedPassword,
    };

    req.session.user_id = random_id;
    res.redirect("/urls");
  }
});

//Edit URL
app.post("/urls/:shortURL/edit", (req, res) => {
  if (!users[req.session.user_id]) {
    res.status(404).send("You are not authorized!");
  } else {
    const shortURL = req.params.shortURL;
    const { newURL } = req.body;
    const newLongURL = newURL;

    urlDatabase[shortURL].longURL = newLongURL;

    res.redirect(`/urls/${shortURL}`);
  }
});

// Delete URL
app.post("/urls/:shortURL/delete", (req, res) => {
  if (!users[req.session.user_id])
    res.status(404).send("You are not authorized!");
  else {
    const shortURL = req.params.shortURL;

    delete urlDatabase[shortURL];

    res.redirect("/urls");
  }
});

app.get("/urls/:shortURL", (req, res) => {
  if (req.session.user_id === urlDatabase[req.params.shortURL].userID) {
    const templateVars = {
      user: users[req.session.user_id],
      shortURL: req.params.shortURL,
      longURL: urlDatabase[req.params.shortURL].longURL,
    };
    res.render("urls_show", templateVars);
  } else {
    res.status(404).send("URL does not exist in your database!");
  }
});

// Create new URL
app.post("/urls", (req, res) => {
  const shortURL = uuidv4().slice(0, 6);
  const { addURL } = req.body;

  urlDatabase[shortURL] = {
    longURL: addURL,

    userID: users[req.session.user_id].id,
  };

  res.redirect(`/urls/${shortURL}`);
});

//redirect to website saved inside urlDatabase
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
