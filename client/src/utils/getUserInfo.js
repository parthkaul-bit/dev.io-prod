import axios from "axios";

export const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user information", error);
    throw error;
  }
};
