// Client-side helpers for JWT token persistence via cookies.

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

/** Save tokens to cookies */
export const saveSession = (accessToken: string, refreshToken: string): void => {
  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
};

/** Clear auth cookies */
export const clearSession = (): void => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
};

/** Read tokens from cookies for session hydration */
export const getSession = (): { accessToken: string | null; refreshToken: string | null } => ({
  accessToken: getCookie("accessToken"),
  refreshToken: getCookie("refreshToken"),
});
