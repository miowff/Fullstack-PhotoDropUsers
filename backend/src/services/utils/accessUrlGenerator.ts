const BASE_URL = "https://fullstack-photo-drop-users.vercel.app";
export const accessUrlGenerator = (accessToken: string) => {
  return `${BASE_URL}/?token=${accessToken}`;
};
