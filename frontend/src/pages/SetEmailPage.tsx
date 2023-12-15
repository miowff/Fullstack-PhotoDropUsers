import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Header } from "../components/Header/Header";
import { WhatsYourEmail } from "../components/SetUserData/WhatsYourEmail/WhatsYourEmail";

export const SetEmailPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <>User not found</>;
  }
  const { fullName } = user;
  return (
    <>
      <Header />
      <WhatsYourEmail fullName={fullName as unknown as string} />
    </>
  );
};
