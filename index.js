const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoute = require("./Routes/user");

const app = express(); //invoking express
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDb database(ATLAS)");
});
mongoose.connection.on("error", err => {
  console.log("Error connecting", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is still disconnected");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(userRoute);

//serving the frontend
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
