const { BLOGS, COMMENTS } = require("../middleware/database");

// get all blogs

exports.getAllBlogs = async (req, res, next) => {
  const blogs = await BLOGS.findAll({
    raw: true,
    attributes: [],
  });
  res.sendJson(200, "All Blogs", blogs)
};
