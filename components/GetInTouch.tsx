"use client";
import React from "react";
import FormInput from "./sub-components/FormInput";
import { useRef } from "react";
import PrimaryBtn from "./PrimaryBtn";
const GetInTouch = () => {
  const contactFirstName = useRef(null);
  const contactLastName = useRef(null);
  const contactEmail = useRef(null);
  const contactMessage = useRef(null);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="semibold py-4 text-2xl text-white my-2">Get in Touch</h1>
      <form className="flex flex-col w-full">
        <FormInput
          label="First Name"
          inputAttributes={{
            type: "text",
            required: true,
            ref: contactFirstName,
            autoComplete: "email",
          }}
        />
        <FormInput
          label={"Last Name"}
          inputAttributes={{
            type: "text",
            required: true,
            ref: contactFirstName,
          }}
        />
        <FormInput
          label={"Email"}
          inputAttributes={{
            type: "email",
            required: true,
            ref: contactEmail,
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
