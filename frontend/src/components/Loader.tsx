import loaderIcon from "../public/images/loaderIcon.svg";
export const Loader = () => {
  return (
    <div className="loader">
      <div className="container">
        <div className="loader-content">
          <img src={loaderIcon} />
          <p className="default-bold-text">Almost there</p>
        </div>
      </div>
    </div>
  );
};
