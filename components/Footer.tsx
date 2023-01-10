"use client";

import Image from "next/image";
import { useRef } from "react";
import fbIcon from "../public/images/fbIcon.svg";
import instaIcon from "../public/images/instaIcon.svg";
import youtubeIcon from "../public/images/youtubeIcon.svg";
import FormInput from "./sub-components/FormInput";
import Link from "next/link";
import SocialMediaIcons from "./SocialMediaIcons";

const onSubmit = (e: any) => {
  // something
  return;
};

export const Footer = () => {
  return (
    <footer className="shadow-inner flex flex-col justify-center w-full h-38 fixed bottom-0 bg-red-600">
      <div className="flex justify-center gap-20 m-5">
        <div className="flex flex-col">
          <h5 className="bold">Useful Links</h5>
          <ul>
            <li>Careers</li>
            <li>Cookies Policy</li>
          </ul>
        </div>
        <div className="flex flex-col text-base">
          <form onSubmit={(e) => onSubmit(e)}>
            <FormInput
              label="Subscribe"
              inputAttributes={{
                type: "email",
                required: false,
                placeholder: "Email",
                autoComplete: "username",
              }}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-row h-8 w-full justify-center items-center gap-3 mb-5">
        <SocialMediaIcons href={"#"} src={fbIcon} alt={"facebook-icon"} />
        <SocialMediaIcons href={"#"} src={instaIcon} alt={"instagram-icon"} />
        <SocialMediaIcons href={"#"} src={youtubeIcon} alt={"youtube-icon"} />
      </div>
    </footer>
  );
};
