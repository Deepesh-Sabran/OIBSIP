const express = require("express");
// for not storing the password as a normal text we need to hashed the password for that we use "bcrypt" ...
const bcrypt = require("bcrypt");
const app = express(); // initializing the express
app.use(express.json()); // we need responses in json format only so for that we define .json

// defining port
const port = 3031;

// defining an empty array for storinng data for a time being ... normaly we use database ..
const users = [];

// GET - http://localhost:3031/users
app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// POST - http://localhost:3031/users
// we are dealing with bcrypt so for that we need to use " async & await "
app.post("/users", async (req, res) => {
  try {
    // here we add salt(random code) with the password
    const salt = await bcrypt.genSalt(); // genSalt() is a method of 'bcrypt' to generate a salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // hash() it's also a method of bcrypt
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json({
      success: true,
      message: "User created",
      data: users,
    });
  } catch {
    res.status(500).send();
  }
});

// POST - http://localhost:3031/users/login
// now we have to authenticate the password during the time of login
app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({
        message: "welcome !!",
      });
    } else {
      res.status(400).json({
        message: "please check your password !!",
      });
    }
  } catch {
    res.status(500).send();
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "This route does not exist",
  });
});

app.listen(port, () => {
  console.log(`server created & runnning on port: ${port}`);
});
