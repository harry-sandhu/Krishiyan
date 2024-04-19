import React, { useState, useEffect } from "react";

interface Props {
  base64ImageString: string;
}

function ImageComponent({ base64ImageString }: Props) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (base64ImageString) {
      // Convert the base64 string to an image source
      console.log("convert satrt");
      const src = `data:image/jpeg;base64,${base64ImageString}`;
      setImageSrc(src);
      console.log("its done");
    }
  }, [base64ImageString]);

  return <div>{imageSrc && <img src={imageSrc} alt="Image" />}</div>;
}

export default ImageComponent;
