
export const readLocalStore = (key) => {
  // Code for localStorage/sessionStorage.
  if (typeof (Storage) !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(key));
  }
  return null;
};

export const writeLocalStore = (key, value) => {
  if (typeof (Storage) !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
  return false;
};

export const removeLocalStore = (key) => {
  if (typeof (Storage) !== 'undefined') {
    window.localStorage.removeItem(key);
    return true;
  }
  return false;
};

export const readCookie = (key) => {
  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const writeCookie = (key, value, expdays = 10) => {
  const d = new Date();
  d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${key}=${value};${expires};path=/`;
};

export const removeCookie = (key) => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const removeAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
