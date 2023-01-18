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

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

//

let userState: any;

const UserContext = createContext({ user: null, loading: false });

export const UserProvider = ({
  value,
  children,
}: {
  value: any;
  children: any;
}) => {
  const { user } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
