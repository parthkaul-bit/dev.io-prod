import axios from "axios";

export const getBlogInfo = async (blogId) => {
  try {
    const response = await axios.get(
      `https://dev-io-exl4.onrender.com/api/blogs/${blogId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blog information", error);
    throw error;
  }
};
