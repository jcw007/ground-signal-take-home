import React, { useState, useEffect } from "react";

const getMessageDiv = (message: string) => (
  <div className="w-full h-full min-h-28 flex border justify-center items-center border-gray-400">
    {message}
  </div>
);

// A component that tries to load an image internally
// and renders it on the screen if the URL is valid.
// If URL is invalid, an error message is displayed.
function CheckImage(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const { src } = props;

  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (src) {
      const img = new Image();

      img.src = src;
      img.onload = () => setIsValid(true);
      img.onerror = () => setIsValid(false);
    }
  }, [src]);

  return isValid === null ? (
    <div {...props}>{getMessageDiv("Loading...")}</div>
  ) : isValid ? (
    <img {...props} />
  ) : (
    <div {...props}>{getMessageDiv("Image not available")}</div>
  );
}

export default CheckImage;
