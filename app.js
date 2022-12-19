const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");
const app = express();

// middleware
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://talha:12345@nodepractice.ypalsyr.mongodb.net/node-practice?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.post("*", checkUser);

// app.get("/", (req, res) => res.render("home", { title: "Home" }));
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use(authRoutes);
app.use("/blogs", blogRoutes);
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
