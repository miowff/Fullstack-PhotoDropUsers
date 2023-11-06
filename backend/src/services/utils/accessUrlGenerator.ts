const BASE_URL = "https://fullstack-photo-drop-users.vercel.app";
export const accessUrlGenerator = (
  accessToken: string,
  refreshToken: string
) => {
  return `${BASE_URL}/?token=${accessToken}&refresh=${refreshToken}`;
};
