const TOKEN_KEY = "istishara_token";
const USER_KEY = "istishara_user";

export const saveAuth = (user, token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = () => !!getToken();

export const homePathFor = (role) => {
  const paths = {
    lawyer: "/lawyer",
    admin: "/admin",
    client: "/client",
  };

  return paths[role] || "/client";
};