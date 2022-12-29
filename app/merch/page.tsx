import { fetchAPI } from "../../lib/api";
import { ProductContainer } from "../../components/ProductContainer";

/*
[
  {
    id: 1,
    attributes: {
      title: 'everyday jacket',
      price: 50,
      description: 'hunter green bomber jacket',
      createdAt: '2022-12-20T15:07:12.918Z',
      updatedAt: '2022-12-20T15:07:15.170Z',
      publishedAt: '2022-12-20T15:07:15.166Z'
    }
  },
  {
    id: 2,
    attributes: {
      title: 'flurry black beanie',
      price: 30,
      description: 'black knit cotton beanie with faux fur ball',
      createdAt: '2022-12-20T15:21:49.706Z',
      updatedAt: '2022-12-20T15:21:51.355Z',
      publishedAt: '2022-12-20T15:21:51.341Z'
    }
  },
]
*/

const Page = async () => {
  const products = await fetchAPI("products", "GET", true);
  console.log("on merch page ", products);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mx-auto my-0 max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center ">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map(({ id, imageUrl, title, price }: any) => {
            console.log("imageUrl: ", imageUrl);
            return (
              <ProductContainer
                key={id}
                id={id}
                imageSrc={imageUrl}
                href={"#"}
                imageAlt={title}
                title={title}
                price={price}
                color={"black"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
