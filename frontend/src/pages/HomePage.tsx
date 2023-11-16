import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { NoPhotosYet } from "../components/HomePage/NoPhotosYet";
import { UserContent } from "../components/HomePage/UserContent";
import { useLazyGetAllUserAlbumsQuery } from "../api/albums";
import { AlbumModel } from "../../../backend/src/models/albums";

export function HomePage() {
  const [getAlbums] = useLazyGetAllUserAlbumsQuery();
  const [albums, setAlbums] = useState<AlbumModel[]>([]);

  useEffect(() => {
    getAlbums()
      .unwrap()
      .then((albums) => {
        console.log(albums);
        setAlbums(albums);
      });
  }, []);
  return (
    <>
      <Header />
      {albums.length !== 0 ? <UserContent albums={albums} /> : <NoPhotosYet />}

      <Footer />
    </>
  );
}
