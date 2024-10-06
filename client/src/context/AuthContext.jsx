import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) => {
    setCurrentUser(data);
    console.log("User updated:", data); // Güncellenen kullanıcı verisi
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    console.log("LocalStorage updated:", currentUser); // LocalStorage güncellemesi
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
