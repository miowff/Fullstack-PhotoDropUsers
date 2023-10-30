interface DefaultButtonProps {
  buttonText: string;
}
export function DefaultButton({ buttonText }: DefaultButtonProps) {
  return <button className="default-button">{buttonText}</button>;
}
