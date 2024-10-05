import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(localStorage.getItem("token") || null); // Token state'i ekleyin

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("token", token); // Token'ı yerel depolamaya kaydedin
  }, [token]);

  return (
    <AuthContext.Provider value={{ currentUser, token, updateUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
