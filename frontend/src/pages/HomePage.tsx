import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { NoPhotosYet } from "../components/HomePage/NoPhotosYet/NoPhotosYet";
import { UserContent } from "../components/HomePage/UserContent/UserContent";
import { useGetAllUserAlbumsQuery } from "../api/albums";
import { Loader } from "../components/Loader/Loader";
import { useGetAllUserPhotosQuery } from "../api/photos";

export function HomePage() {
  const {
    data: albums,
    isLoading: isAlbumsLoading,
    isFetching: isAlbumsFetching,
  } = useGetAllUserAlbumsQuery();
  const {
    data: photos,
    isLoading: isPhotosLoading,
    isFetching: isPhotosFetching,
  } = useGetAllUserPhotosQuery();
  return (
    <>
      {isAlbumsFetching ||
      isPhotosFetching ||
      isAlbumsLoading ||
      isPhotosLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          {albums && albums.length !== 0 && photos ? (
            <UserContent albums={albums} photos={photos} />
          ) : (
            <NoPhotosYet />
          )}
          <Footer />
        </>
      )}
    </>
  );
}
