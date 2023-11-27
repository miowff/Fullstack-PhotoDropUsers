import { useRequestCodeMutation } from "../api/auth";
import { AlertData } from "../components/Alert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
interface Props {
  setAlert: React.Dispatch<React.SetStateAction<AlertData | null>>;
}
export const useRequestCode = ({ setAlert }: Props) => {
  const [requestCode] = useRequestCodeMutation();
  const handleRequest = async (phoneNumber: string): Promise<void> => {
    const result = await requestCode(phoneNumber);
    if ("error" in result) {
      const { data } = result.error as FetchBaseQueryError;
      if (data) {
        return setAlert({ message: data as string, isError: true });
      } else {
        return setAlert({ message: "Unknown error", isError: true });
      }
    } else if ("data" in result) {
      setAlert({ message: result.data, isError: false });
    }
  };
  return { handleRequest };
};
