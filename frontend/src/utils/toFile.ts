export const toFile = (imageString: string) => {
  const byteCharacters = atob(imageString.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" });
  const imageFile = new File([blob], `${Date.now()}.jpg`, {
    type: "image/jpeg",
  });
  return imageFile;
};
