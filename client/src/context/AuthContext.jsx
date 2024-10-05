import { createContext, useEffect, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  // Initialize currentUser state with data from local storage or null
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update user
  const updateUser = (data) => {
    setCurrentUser(data);
    // Save updated user data to local storage
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      localStorage.removeItem("user"); // Remove user from local storage if null
    }
  };

  // Effect to synchronize currentUser with local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  // Provide context value
  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
