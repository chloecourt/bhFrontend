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
    throw new Error(`fetchAPI threw error occured please try again`);
  }
  if (method === "POST") {
    const data = await response.json();
    return data;
  } else if (method === "GET") {
    const { data } = await response.json();

    if (Array.isArray(data) && !data[0].attributes?.image) return data;
    if (Array.isArray(data) && data[0].attributes?.image) {
      console.log(
        "imageUrl: ",
        data[0].attributes.image.data[0].attributes.url
      );

      const dataWithImages = data.map((item) => {
        return {
          data: item.id,
          ...item.attributes,
          imageUrl: getStrapiImageUrl(
            data[0].attributes.image.data[0].attributes.url
          ),
        };
      });

      return dataWithImages;
    }

    console.log(
      "non array data: ",
      data.attributes?.image?.data.attributes.url
    );
    const imageUrl = getStrapiImageUrl(
      data.attributes?.image?.data.attributes.url
    );

    return { ...data.attributes, ...(imageUrl && { imageUrl }) };
  }
}

export async function fetcher(url: string, options = {}) {
  let response;
  if (!options) {
    console.log;
    response = await fetch(url);
    if (!response.ok) {
      throw new Error(`response.ok evaluated to ${response.status}`);
    }
  } else {
    response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`response.ok evaluated to ${response.status}`);
    }
  }
  const data = await response.json();
  return data;
}
