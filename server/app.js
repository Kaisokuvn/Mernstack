//Modules dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const usersRoute = require("./routes/users");
const excerciseRoute = require("./routes/excercises");

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

//connect to DataBase
const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log(`connected to database`));

//Routes
app.use("/users", usersRoute);
app.use("/excercises", excerciseRoute);

//404 Not found
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//handle Error
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  res.status(status).json({
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
