import Router from "next/router";
import { setCookie, getCookie, removeCookies } from "cookies-next";
import { Z_ASCII } from "zlib";

export const setToken = (data: any) => {
  if (typeof window === "undefined") {
    return;
  }
  setCookie("id", data.user.id);
  setCookie("username", data.user.username);
  setCookie("jwt", data.jwt);

  if (getCookie("username")) {
    Router.reload();
  }
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  removeCookies("id");
  removeCookies("jwt");
  removeCookies("username");

  Router.reload();
};
/**
 * 7:16
 *
 * https://www.youtube.com/watch?v=8rju99LTUNA&list=PL7Q0DQYATmvjXSuHfB8CY_n_oUeqZzauZ&index=12
 */
