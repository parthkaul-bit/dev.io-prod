const blogRepository = require("../repositories/blogRepository");

exports.getAllBlogs = async () => {
  return await blogRepository.findAllBlogs();
};

exports.getBlogById = async (blogId) => {
  try {
    const blog = await blogRepository.findBlogById(blogId);
    return blog;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createBlog = async (blogData) => {
  return await blogRepository.createBlog(blogData);
};

exports.getUniqueTags = async () => {
  try {
    return await blogRepository.findUniqueTags();
  } catch (error) {
    throw new Error(error.message);
  }
};
