import axios from "axios";

// Create an Axios instance
const apiRequest = axios.create({
  baseURL: "https://tapalaz-1-xzag.onrender.com", // Replace with your API base URL
  withCredentials: true, // Enables sending cookies with requests
});

// Request interceptor to add the token
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust this to where you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

// Response interceptor to handle errors
apiRequest.interceptors.response.use(
  (response) => {
    return response; // Return the response if no error
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (token invalid or expired)
      console.error("Token is not valid or expired");
      // Optionally, you can log out the user here
      // For example: logoutUser();
    }
    return Promise.reject(error); // Return error for further handling
  }
);

export default apiRequest;
