import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
//import { NoPhotosYet } from "../components/HomePage/NoPhotosYet";
import { UserContent } from "../components/HomePage/UserContent";

export function HomePage() {
  return (
    <>
      <Header />
      <UserContent/>
      <Footer />
    </>
  );
}
