"use client";

import Image from "next/image";
import bhIcon from "../public/images/bh-icon-transparent.png";
import SubscribeModal from "../components/PopUps/SubscribeModal";

// swr stale while revalidate or useEffect to client side render

export default function Page() {
  return (
    <div
      data-testid="landing-page-div"
      className="relative flex flex-col items-center justify-center my-16"
    >
      <Image src={bhIcon} width="900" alt="bh-icon" />
    </div>
  );
}
