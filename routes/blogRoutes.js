const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { checkUser } = require("../middlewares/authMiddleware");

router.get("/", blogController.displayBlogs);

router.get("/create", blogController.blogForm);

router.get("/edit/:id", blogController.blogEdit);

router.post("/", blogController.createBlog);

router.get("/:id", blogController.blogDetails);

router.put("/edit/:id", blogController.editBlog);

router.delete("/:id", blogController.blogDelete);

module.exports = router;
