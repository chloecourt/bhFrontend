"use client";
import { fetchAPI, getStrapiURL } from "../lib/api";
import Image from "next/image";
import bhIcon from "../public/images/bh-icon-transparent.png";
import { useEffect } from "react";
import SubscribeModal from "../components/PopUps/SubscribeModal";

// swr stale while revalidate or useEffect to client side render

export default function Page() {
  return (
    <div className="">
      <div className="relative flex flex-col items-center justify-center h-[3000] w-[3000] ">
        <Image src={bhIcon} alt="bh-icon" className="" />
      </div>
      <SubscribeModal />
    </div>
  );
}
