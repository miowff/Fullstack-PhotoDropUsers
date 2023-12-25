import { Area } from "react-easy-crop";

export const createCroppedImage = async (
  file: File,
  area: Area
): Promise<File> => {
  try {
    const image = new Image();
    const reader = new FileReader();

    const imageLoadPromise = new Promise<void>((resolve) => {
      reader.onload = () => {
        image.src = reader.result as string;
        image.onload = () => resolve();
      };

      reader.readAsDataURL(file);
    });

    await imageLoadPromise;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = area.width;
    canvas.height = area.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        image,
        area.x * scaleX,
        area.y * scaleY,
        area.width * scaleX,
        area.height * scaleY,
        0,
        0,
        area.width,
        area.height
      );
    }
    const croppedDataURL = canvas.toDataURL("image/jpeg");
    const croppedBlob = await fetch(croppedDataURL).then((res) => res.blob());
    const croppedFile = new File([croppedBlob], file.name, {
      type: "image/jpeg",
    });
    console.log(croppedFile);
    return croppedFile;
  } catch (err) {
    console.log(err);
  }
};
