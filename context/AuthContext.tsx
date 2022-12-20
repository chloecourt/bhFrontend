import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
