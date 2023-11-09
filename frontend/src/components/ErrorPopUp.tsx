type ErrorProps = {
  message?: string;
};
export const ErrorPopUp = ({ message }: ErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <>
      <div className="error-popUp">
        <div> {message}</div>
      </div>
    </>
  );
};
