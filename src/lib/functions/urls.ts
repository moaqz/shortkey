export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function parseURL(url: string): string | null {
  if (!isValidUrl(url)) {
    return null;
  }

  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== "https:") {
    return null;
  }

  return parsedUrl.toString();
}
