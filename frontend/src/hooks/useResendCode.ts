import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useResendCodeMutation } from "../api/auth";
import { AlertData } from "../components/Alert";

interface Props {
  setAlert: React.Dispatch<React.SetStateAction<AlertData | null>>;
}
export const useResendCode = ({ setAlert }: Props) => {
  const [requestCode] = useResendCodeMutation();
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
