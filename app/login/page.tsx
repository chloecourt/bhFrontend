"use client";
import { Login } from "../../components/Login-Logout/Login";
import { Signup } from "../../components/Login-Logout/Signup";

const LoginPage = () => {
  return (
    // <div className="absolute">
    <div className="flex flex-col sm:flex-row gap-9 justify-center w-full">
      <Login />
      <Signup />
    </div>
    // </div>
  );
};

export default LoginPage;
