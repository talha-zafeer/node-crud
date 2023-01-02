const express = require("express");
const mongoose = require("mongoose");
// const Url = require("Url");
const Url = require("url");
const morgan = require("morgan");
const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");
const app = express();
const dotenv = require("dotenv");
const { parse } = require("path");

dotenv.config();

// database connection
mongoose
  .connect(process.env.dataBaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => app.listen(parseInt(process.env.PORT)))
  .catch((err) => console.log("Catch Error => ", err));

// middleware
app.use(express.static("public"));

// app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// routes
app.use("*", checkUser);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use(authRoutes);
app.use("/blogs", blogRoutes);
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
