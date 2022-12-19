"use client";
import { fetchAPI, getStrapiURL } from "../lib/api";
import Image from "next/image";
import bhIcon from "../public/images/bh-icon-transparent.png";
import { useEffect } from "react";
import SubscribeModal from "../components/PopUps/SubscribeModal";
export const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337";

async function getData() {
  try {
    const res = await fetch("http://localhost:1337/api/landing-page");
    if (!res.ok) {
      console.error(res.status);
    }
    const data = await res.json();
    console.log({ data });
    return data;
  } catch (e) {
    console.log(e);
  }
}

// swr stale while rendering

export default function Page() {
  useEffect(() => {
    const hello = async () => {
      return await getData();
    };

    const data = hello();
    console.log({ data });
  });

  return (
    <div className="">
      <div className="relative flex flex-col items-center justify-center h-[3000] w-[3000] ">
        <Image src={bhIcon} alt="bh-icon" className="" />
      </div>
      <SubscribeModal />
    </div>
  );
}
