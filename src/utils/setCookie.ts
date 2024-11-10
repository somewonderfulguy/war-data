// TODO: test, if possible

/** Set a cookie with a given key, value, and expiration date */
export const setCookie = (key: string, value: string, days: number) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // Convert days to milliseconds
  const expires = 'expires=' + date.toUTCString()
  document.cookie = `${key}=${value}; ${expires}; path=/`
}
