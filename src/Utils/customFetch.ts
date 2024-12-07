interface CustomFetchParams {
  url: string;
  options: RequestInit;
}

const customFetch = async ({ url, options }: CustomFetchParams) => {
  const headers = {
    ...options.headers,
    "X-Api-Key": import.meta.env.VITE_API_KEY,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    console.error("HTTP error:", response.status);
    return;
  }

  try {
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error("Failed to parse JSON:", err);
  }
};

export default customFetch;
