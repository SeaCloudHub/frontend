export function getSessionToken(key: string) {
  return localStorage.getItem(key);
}
