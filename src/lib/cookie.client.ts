// Client-side cookie utilities.
// These functions manage cookies in the browser only.
// Server actions handle cookie updates on the server side.

export async function setClientCookie(key: string, value: string, days = 7) {
  const expires = Date.now() + days * 864e5;
  await cookieStore.set({ name: key, value, expires, path: "/" });
}

export async function getClientCookie(key: string) {
  const cookie = await cookieStore.get(key);
  return cookie?.value;
}

export async function deleteClientCookie(key: string) {
  await cookieStore.delete(key);
}
