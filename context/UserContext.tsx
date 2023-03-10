// import { createContext, SetStateAction } from "react";
// import { useState } from "react";
// import { Dispatch } from "react";

// type UserDataType = {
//   email: string;
//   id: string;
// };

// type UserContextType = {
//   userData: UserDataType;
//   setUserData: Dispatch<SetStateAction<UserDataType>>;
// };

// const UserContext = createContext<UserContextType>({
//   userData: { email: "", id: "" },
//   setUserData: () => null,
// });
// export default ({ children }: any) => {
//   const [userData, setUserData] = useState({ email: "", id: "" });
//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "../lib/auth";

type UserDataType = {
  user: string | null;
  loading: boolean;
};

let userState: string | undefined;

const User = createContext<UserDataType>({ user: null, loading: false });

export const UserProvider = ({
  value,
  children,
}: {
  value: UserDataType;
  children: any;
}) => {
  const { user } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
  });

  useEffect(() => {
    // if userState is defined on refresh return
    if (userState !== undefined) {
      return;
    }
    // if userState is undefined and component is mounted get local cookie
    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();
      console.log(
        "this is useFetchUser awaiting response from cookies: ",
        user
      );
      if (isMounted) {
        setUser({ user, loading: false });
      }
    };
    resolveUser();
    // when component unmounts set isMounted to false
    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};
