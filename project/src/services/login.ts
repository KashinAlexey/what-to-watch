const AUTH_USER_LOGIN = 'user-mail';

export type Login = string;

export const getLogin = (): Login => {
  const mail = localStorage.getItem(AUTH_USER_LOGIN);
  return mail ?? '';
};

export const saveLogin = (mail: Login): void => {
  localStorage.setItem(AUTH_USER_LOGIN, mail);
};

export const dropLogin = (): void => {
  localStorage.removeItem(AUTH_USER_LOGIN);
};
