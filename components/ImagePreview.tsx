import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImageProps } from "@utils/schemasTypes";

interface Props {
  image: string | File | File[] | ImageProps;
}

const ImagePreview = ({ image }: Props) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    // create the preview
    if(typeof image === 'string') {
      setImageURL(image);
    }
    else if(image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setImageURL(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    else if(Array.isArray(image)) {
      const objectUrl = URL.createObjectURL(image[0]);
      setImageURL(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    else {
      setImageURL(image.url);
    }
    
    
  }, [image]);

  if (imageURL === null) return null;
  return <Image src={imageURL} width={100} height={100} alt="preview" loading="lazy" />;
};

export default ImagePreview;
