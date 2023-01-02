import { describe } from "node:test";

const getProduct = async (id: string) => {
  return id;
};

export default async ({ params }: any) => {
  const product = await getProduct(params.id);
  // should be `blogs/${product}`
  // const data: StrapiData = await fetchAPI("landing-page");

  return (
    <article>
      <header>
        <h1>This is product: {product}</h1>
      </header>
      <section>
        <p>{}</p>
        <p>{/** welcome paragraph */}</p>
      </section>
    </article>
  );
};
