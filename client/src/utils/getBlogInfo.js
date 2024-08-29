import axios from "axios";

export const getBlogInfo = async (blogId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/blogs/${blogId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blog information", error);
    throw error;
  }
};
