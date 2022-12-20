/**
 * includes /api/ in path
 */
export function getStrapiURL(path = "", api: boolean = true) {
  if (!path) return null;
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api/"
  }${path}`;
}

export function getStrapiImageUrl(path = "") {
  if (!path) return null;
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL.slice(0, -5)}`
      : "http://localhost:1337"
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */

type fetchMethod = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

export async function fetchAPI(
  path: string,
  method: fetchMethod = "GET",
  populate: boolean = true,
  bodyData?: object
) {
  // Merge default and user options

  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    ...(bodyData && { body: JSON.stringify(bodyData) }),
  };

  // Build request URL
  const requestUrl = `${getStrapiURL(
    `${path}${populate ? "?populate=*" : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const { data } = await response.json();
  // console.log("data returned from fetch: ", data);
  // console.log("this is data[0].attributes.image", !data[0].attributes?.image);

  if (Array.isArray(data) && !data[0].attributes?.image) return data;
  if (Array.isArray(data) && data[0].attributes?.image) {
    console.log("imageUrl: ", data[0].attributes.image.data[0].attributes.url);

    const dataWithImages = data.map((item) => {
      return {
        data: item.id,
        ...item.attributes,
        imageUrl: getStrapiImageUrl(
          data[0].attributes.image.data[0].attributes.url
        ),
      };
    });

    console.log("dataWithImages: ", dataWithImages);
    return dataWithImages;
  }

  console.log("non array data: ", data.attributes?.image?.data.attributes.url);
  const imageUrl = getStrapiImageUrl(
    data.attributes?.image?.data.attributes.url
  );

  return { ...data.attributes, ...(imageUrl && { imageUrl }) };
}
