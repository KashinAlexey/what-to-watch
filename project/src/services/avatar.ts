const AUTH_USER_AVATAR = 'user-mail';

export type Avatar = string;

export const getAvatarUrl = (): Avatar => {
  const avatarUrl = localStorage.getItem(AUTH_USER_AVATAR);
  return avatarUrl ?? '';
};

export const saveAvatarUrl = (avatar: Avatar): void => {
  localStorage.setItem(AUTH_USER_AVATAR, avatar);
};

export const dropAvatarUrl = (): void => {
  localStorage.removeItem(AUTH_USER_AVATAR);
};
