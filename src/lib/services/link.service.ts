import { TLinkSchema } from "../schemas/link";

const API_BASE_URL = "/api/links";

async function createLink(data: Partial<TLinkSchema>) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
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

async function deleteLink(linkId: number) {
  const response = await fetch(`${API_BASE_URL}/${linkId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error performing action, try again.");
  }
}

async function updateLink(data: Partial<TLinkSchema>, linkId: number) {
  const response = await fetch(`${API_BASE_URL}/${linkId}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
}

export const linkServices = {
  updateLink,
  createLink,
  deleteLink
}
