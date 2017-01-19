'use strict';

export const readLocalStore = (key) => {
  // Code for localStorage/sessionStorage.
  if (typeof(Storage) !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key));
  }
  // Sorry! No Web Storage support..
  else {
    return null;
  }

};


export const writeLocalStore = (key, value) => {
  if (typeof(Storage) !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } else {
    // Sorry! No Web Storage support..
    return false;
  }
};


export const removeLocalStore = (key) => {
  if (typeof(Storage) !== "undefined") {
    window.localStorage.removeItem(key);
    return true;
  }
  else {
    // Sorry! No Web Storage support..
    return false;
  }
};


export const readCookie = (key) => {
  let name = key + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};


export const writeCookie = (key, value, expdays= 10) => {
  let d = new Date();
  d.setTime(d.getTime() + (expdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = `${key}=${value};${expires};path=/`;
};


export const removeCookie = (key) => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};


export const removeAllCookies = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};
