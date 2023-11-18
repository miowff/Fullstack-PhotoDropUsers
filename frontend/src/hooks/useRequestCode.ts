
import { Dispatch, SetStateAction } from "react";
import { isErrorWithMessage } from "../utils/errorParser";
import { useRequestCodeMutation} from "../api/auth";
interface Props {
  setError: Dispatch<SetStateAction<string>>;
}
export const useRequestCode = ({ setError }: Props) => {
  const [requestCode] = useRequestCodeMutation();
  const handleRequest = async (phoneNumber: string): Promise<void> => {
    try {
      await requestCode(phoneNumber);
    } catch (err) {
      const error = isErrorWithMessage(err);
      if (error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  };
  return { handleRequest };
};