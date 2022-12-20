import { fetchAPI } from "../../../lib/api";
import { StrapiData } from "../../types/types";
const getBlog = async (id: string) => {
  return id;
};

export default async ({ params }: any) => {
  const blog = await getBlog(params.id);
  // should be `blogs/${blog}`
  // const data: StrapiData = await fetchAPI("landing-page");

  return (
    <article>
      <header>
        <h1>This is blog: {blog}</h1>
      </header>
      <section>
        <p>Welcome Paragraph</p>
        <p>{/** welcome paragraph */}</p>
      </section>
    </article>
  );
};
