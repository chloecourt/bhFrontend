/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  if (!path) return null;
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
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

export async function fetchAPI(path: string, method: fetchMethod = "GET") {
  // Merge default and user options

  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  };

  // Build request URL
  const requestUrl = `${getStrapiURL(`/api/${path}?populate=*`)}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const { data } = await response.json();
  const imageUrl = getStrapiURL(data.attributes.image?.data.attributes.url);
  return { ...data.attributes, imageUrl };
}
