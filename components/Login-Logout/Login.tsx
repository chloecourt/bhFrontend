"use client";
import FormInput from "../../components/sub-components/FormInput";
import { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import { fetchAPI } from "../../lib/api";
import { useSession, signIn } from "next-auth/react";
import { setToken } from "../../lib/auth";
import { useRouter } from "next/navigation";
import Toast from "../Toast";

export const Login = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const initialUserLoginState = { identifier: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialUserLoginState);
  const { identifier, password } = userLogin;

  // session only has name, image, and email data once user signed in
  const { data: session } = useSession();
  console.log("this is session: ", session);

  const handleSignInChange = (event: any) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  // sigining in normally test@test.com test123
  // data returns obj { jwt: "jwt", user: { blcoked, confirmed, createdAt, email, id, provider, updatedAt, username }}
  const handleSignInSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const data = await fetchAPI("auth/local", "POST", false, {
        identifier,
        password,
      });
      setToken(data);
      // need to reset userContext to use this user
    } catch (e) {
      setError(true);
      console.error(e);
      return;
    }
    setUserLogin(initialUserLoginState);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="semibold py-4 text-2xl text-white">Sign In</h2>
      <form data-testid="sign-in-form" onSubmit={handleSignInSubmit}>
        <FormInput
          label="Email"
          inputAttributes={{
            required: true,
            type: "email",
            placeholder: "Email",
            autoComplete: "username",
            name: "identifier",
            value: identifier,
            onChange: handleSignInChange,
          }}
        />
        <FormInput
          label="Password"
          inputAttributes={{
            required: true,
            type: "password",
            placeholder: "Password",
            autoComplete: "current-password",
            name: "password",
            value: password,
            onChange: handleSignInChange,
          }}
        />
        <PrimaryBtn title="Submit" type="submit" />
      </form>
      <button
        onClick={() => {
          signIn("google", {
            callbackUrl: "http://localhost:3000",
          });
        }}
        type="button"
        className="border py-2 px-3 text-white"
      >
        Sign In with Google
      </button>
      {error && <Toast toast={"WARNING"} />}
    </div>
  );
};
