type ErrorProps = {
  message?: string;
};
export function ErrorPopUp({ message }: ErrorProps) {
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
}
