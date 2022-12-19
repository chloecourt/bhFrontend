import { createContext, SetStateAction } from "react";
import { useState } from "react";
import { Dispatch } from "react";

type UserDataType = {
  email: string;
  id: string;
};

type UserContextType = {
  userData: UserDataType;
  setUserData: Dispatch<SetStateAction<UserDataType>>;
};

const UserContext = createContext<UserContextType>({
  userData: { email: "", id: "" },
  setUserData: () => null,
});
export default ({ children }: any) => {
  const [userData, setUserData] = useState({ email: "", id: "" });
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
