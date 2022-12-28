"use client";
import FormInput from "../../components/sub-components/FormInput";
import { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import { fetchAPI } from "../../lib/api";
import { useSession, signIn } from "next-auth/react";

export const Login = () => {
  const initialUserLoginState = { identifier: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialUserLoginState);
  const { identifier, password } = userLogin;

  const { data: session } = useSession();
  console.log("this is session: ", session);

  const handleSignInChange = (event: any) => {
    const { name, value } = event.target;
    console.log("this is value", value);
    console.log("this is name", name);
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSignInSubmit = async (e: any) => {
    e.preventDefault();
    const data = await fetchAPI("auth/local", "POST", false, {
      identifier,
      password,
    });

    console.log("client side auth data: ", data);
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
        onClick={() => signIn()}
        type="button"
        className="border py-2 px-3"
      >
        Sign In with Google
      </button>
    </div>
  );
};
