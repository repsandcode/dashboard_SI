import axios from "axios";

export const checkUserStatus = async (state, logout, navigate) => {
  try {
    const response = await axios.put(
      "http://localhost:8888/petproject/user/status",
      state.user
    );

    if (response.data.success) {
      console.log(response.data.message);
      logout();
      navigate("/login");
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    console.error("Error checking user status:", error.message);
  }
};
