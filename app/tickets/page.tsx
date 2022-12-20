import { fetchAPI } from "../../lib/api";
import { StrapiData } from "../types/types";

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
