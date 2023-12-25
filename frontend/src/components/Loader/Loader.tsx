import LoaderGif from "../../public/images/Loader.gif";
export const Loader = () => {
  return (
    <div className="loader">
      <div className="container">
        <div className="loader-content">
          <img className="loader-gif" src={LoaderGif} />
          <p className="default-bold-text">Almost there...</p>
        </div>
      </div>
    </div>
  );
};
