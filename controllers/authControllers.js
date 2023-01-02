const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect Email") {
    errors.email = "Email is not registered ...";
  }

  if (err.message === "incorrect password") {
    errors.password = "Incorrect Password ...";
  }
  if (err.code === 11000) {
    //Check duplicate Emails
    errors.email = "Email already used ...";
    return errors;
  }
  //Email Validations
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "theSecret_Signature", { expiresIn: maxAge });
};

const signUp = (request, response) => {
  response.render("signup", { title: "Sign Up" });
};

const logIn = (request, response) => {
  response.render("login", { title: "Log In" });
};

const logOut = (request, response) => {
  response.cookie("jwt", "", { maxAge: 1 });
  response.redirect("/login");
};

const registerUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    response.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    response.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    response.status(404).json({ errors });
  }
};

const verifyLogin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    response.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    response.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    response.status(400).json({ errors });
  }
};

module.exports = {
  signUp,
  registerUser,
  logIn,
  verifyLogin,
  logOut,
};
