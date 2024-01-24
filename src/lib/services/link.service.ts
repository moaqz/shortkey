const API_BASE_URL = "/api/links";

export async function createLink(target: string) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify({ url: target }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}
