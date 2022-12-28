import { createContext, SetStateAction, useContext, useEffect } from "react";
import { useState } from "react";
import { Dispatch } from "react";

type AuthDataType = {
  identifier: string;
  password: string;
};

type AuthContextDataType = {
  currentUser: AuthDataType | null;
  setCurrentUser: Dispatch<SetStateAction<null>>;
};

const AuthContext = createContext<AuthContextDataType>({
  currentUser: null,
  setCurrentUser: () => null,
});

// better to create a function to call useCo ntext(AuthContext) to prevent errors
export const useAuthContext = () => useContext(AuthContext);

export default ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//

let userState: any;

const User = createContext({ user: null, loading: false });

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return (
    <UserProvider.Provider value={value}>{children}</UserProvider.Provider>
  );
};
