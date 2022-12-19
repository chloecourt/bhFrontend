import { fetchAPI } from "../../lib/api";

type StrapiData = {
  title: string;
  description: null | string;
  createdAt: string;
  updatedAt: string;
  image: object;
  imageUrl: string;
};

async function Page() {
  const data: StrapiData = await fetchAPI("landing-page");

  return (
    <div>
      <h1>{data.title}</h1>
      <img src={data.imageUrl} alt={data.title} />
    </div>
  );
}

export default Page;
