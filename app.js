require("dotenv").config();

const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded, i.e. form posts
app.use(express.json()); // for parsing application/json

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use('/', express.static(path.join(__dirname, 'public')));

var signInRouter = require("./routes/sign-in-router");
app.use("/sign-in", signInRouter);
app.use("/sign-in", express.static(path.join(__dirname, "public")));

var authRouter = require("./routes/authentication-router");
app.use("/cognito", authRouter);
app.use("/cognito", express.static(path.join(__dirname, "public")));

var projectsListRouter = require("./routes/projects-list-router");
app.use("/projects", projectsListRouter);
app.use("/projects", express.static(path.join(__dirname, "public")));

var aboutHimeshRouter = require("./routes/about-himesh-router");
app.use("/about-himesh", aboutHimeshRouter);
app.use("/about-himesh", express.static(path.join(__dirname, "public")));

var careerProfileHimeshRouter = require("./routes/career-profile-himesh-router");
app.use("/career-profile", careerProfileHimeshRouter);
app.use("/about-himesh", express.static(path.join(__dirname, "public")));

app.on("listening", () => {
  console.log();
  console.log("🚀 Noddyx Server is up!!");
  console.log();
});

module.exports = app;
