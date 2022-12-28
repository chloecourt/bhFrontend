"use client";
import FormInput from "../../components/sub-components/FormInput";
import { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import { fetchAPI } from "../../lib/api";

export const Signup = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = newUser;

  const handleNewUserChange = (e: any) => {
    const { value, name } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateAccountOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetchAPI("auth/local", "POST", false, {});
      const data = await response.json();
      console.log("create new user fetch request response: ", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="semibold py-4 text-2xl text-white">Create an Account</h2>
      <form
        data-testid="create-acount-form"
        onSubmit={handleCreateAccountOnSubmit}
      >
        <FormInput
          label="First Name"
          inputAttributes={{
            required: true,
            type: "text",
            placeholder: "First Name",
            name: "firstName",
            value: firstName,
            onChange: handleNewUserChange,
          }}
        />
        <FormInput
          label="Last Name"
          inputAttributes={{
            required: true,
            type: "text",
            placeholder: "Last Name",
            name: "lastName",
            value: lastName,
            onChange: handleNewUserChange,
          }}
        />
        <FormInput
          label="Email"
          inputAttributes={{
            required: true,
            type: "email",
            placeholder: "Email",
            autoComplete: "username",
            name: "email",
            value: email,
            onChange: handleNewUserChange,
          }}
        />
        <FormInput
          label="Password"
          inputAttributes={{
            required: true,
            type: "password",
            placeholder: "Password",
            autoComplete: "new-password",
            name: "password",
            value: password,
            onChange: handleNewUserChange,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputAttributes={{
            name: "confirmPassword",
            required: true,
            type: "password",
            placeholder: "Password",
            autoComplete: "new-password",
            value: confirmPassword,
            onChange: handleNewUserChange,
          }}
        />
        <PrimaryBtn type="submit" title="Submit" />
      </form>
    </div>
  );
};
