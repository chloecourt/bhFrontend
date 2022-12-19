import Link from "next/link";
import Image from "next/image";

type SocialMediaTypeIcon = {
  href: string;
  src: string;
  alt: string;
};

const SocialMediaIcons = ({ href, src, alt }: SocialMediaTypeIcon) => {
  return (
    <>
      <Link href={href}>
        <Image src={src} alt={alt} height={32} width={32} />
      </Link>
    </>
  );
};

export default SocialMediaIcons;
