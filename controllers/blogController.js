const Blog = require("../models/blog");

const displayBlogs = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Blogs", blogs: result });
    })
    .catch((error) => {
      console.log(error);
    });
};

const blogForm = (req, res) => {
  res.render("create", { title: "Create" });
};

const createBlog = (req, res) => {
  const blog = new Blog({ ...req.body, createdBy: req.user._id });
  blog.save().then((result) => {
    res.redirect("/blogs");
  });
};

const blogDetails = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((error) => {
      console.log(error);
    });
};

const blogDelete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => {
      console.log("error");
    });
};

const blogEdit = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("edit", { blog: result, title: "Edit Blog" });
    })
    .catch((error) => {
      console.log(error);
    });
};

const editBlog = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndUpdate(
    id,
    {
      $set: {
        ...req.body,
      },
    },
    { new: true }
  )
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => {
      console.log("error");
    });
};

module.exports = {
  displayBlogs,
  blogForm,
  blogDelete,
  blogDetails,
  createBlog,
  editBlog,
  blogEdit,
};
