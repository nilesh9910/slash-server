const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./corsOptions");
const credentials = require("../middleware/credentials");

const { SERVER_PORT } = require("../constants/constant");
const PORT = SERVER_PORT;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("../routes/router"));

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).send("404 Not Found");
  } else if (req.accepts("json")) {
    res.status(404).json({ error: "404 Not Found" });
  } else {
    res.type("txt").status(404).send("404 Not Found");
  }
});

module.exports = { app, PORT };
