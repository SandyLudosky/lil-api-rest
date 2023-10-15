const express = require("express");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");

const routes = require("./routes");
const userroutes = require("./useroutes");
const User = require("./models/User");
const app = express();
const PORT = process.env.PORT || 5000;

// installer mongodb
// npm install mongoose --save
// connecter la base de données

app.get("/", (_, res) => {
  res.send("Hello World!");
});

function authorize(req, res, next) {
  console.log(req.headers.authorization.split(" "));
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer" //or Bearer
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      process.env.TOKEN_SECRET,
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
}

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
  app.use(express.json());
  app.use(cors());
  app.use("/", userroutes);
  app.use(authorize);
  app.use("/api", routes);

  mongoose
    .connect("mongodb://localhost:27017/database", { useNewUrlParser: true })
    .then(() => console.log("Connected to database!"));
});
