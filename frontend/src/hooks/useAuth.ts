import { useAppSelector } from "../redux/hooks";

export const useAuth = (): boolean => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return isAuth;
};
