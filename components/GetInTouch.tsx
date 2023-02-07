"use client";
import React from "react";
import FormInput from "./sub-components/FormInput";
import { useRef } from "react";
import PrimaryBtn from "./PrimaryBtn";
const GetInTouch = () => {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <form className="relative flex flex-col w-full">
        <FormInput
          label="First Name"
          inputAttributes={{
            type: "text",
            required: true,
            autoComplete: "email",
          }}
        />
        <FormInput
          label={"Last Name"}
          inputAttributes={{
            type: "text",
            required: true,
          }}
        />
        <FormInput
          label={"Email"}
          inputAttributes={{
            type: "email",
            required: true,
            autoComplete: "username",
          }}
        />
        <label>Message</label>
        <textarea className="rounded" name="contact-message" rows={10} />
        <PrimaryBtn type="submit" title="Submit" />
      </form>
    </div>
  );
};

export default GetInTouch;
