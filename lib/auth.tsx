import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { fetchAPI } from "./api";
import { fetcher } from "./api";

export const setToken = (data: any) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    // router.reload();
  }
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");

  // router.reload();
};

export const getUserFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`http://localhost:3000/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((data) => {
        console.log("this is data.username: ", data.username);
        console.log("this worked!");
        return data.username;
      })
      .catch((error) => {
        console.log("error from getUserFromLocalCookie thrown");
        console.error(error);
      });
  } else {
    return;
  }
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const getTokenFromServerCookie = (req: any) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwt;
};

export const getIdFromServerCookie = (req: any) => {
  if (!req.heaeders.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith("id="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};
/**
 * 7:16
 *
 * https://www.youtube.com/watch?v=8rju99LTUNA&list=PL7Q0DQYATmvjXSuHfB8CY_n_oUeqZzauZ&index=12
 */

/*      NEXT AUTH           */
export async function nextAuthSignIn({
  email,
  password,
}: {
  email: string | undefined;
  password: string | undefined;
}) {
  console.log({ email, password });
  const res = await fetchAPI("auth/local", "POST", false, {
    identifier: email,
    password,
  });
  return res;
}

export const fetchStrapiUserData = async (
  email: string | undefined,
  password: string | undefined
) => {
  // console.log(" did the jwt come in right? ", jwt);
  // try {
  //   const res = await fetcher(`http://localhost:3000/users/me`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   });
  //   if (!res.ok) {
  //     throw new Error(`theres a problem`);
  //   }
  // } catch (e) {
  //   console.error(`YOOOO`, e);
  // }
  try {
    const res = await fetchAPI("auth/local", "POST", false, {
      identifier: email,
      password,
    });
    if (!res.ok) {
      throw new Error("issue with fetchStrapiUser");
    } else {
      const data = res.json();
      return data;
    }
    // need to reset userContext to use this user
  } catch (e) {
    console.error(e);
    return;
  }
};
