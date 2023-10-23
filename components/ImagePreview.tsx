import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImageProps } from "@utils/schemasTypes";
import { useFormContext } from "@provider/formProvider";
import { deleteApiMedia } from "@requests/media";
import { deletePrincipalImage } from "@requests/post";

interface Props {
  image: string | File | File[] | ImageProps;
  isPrincipal?: boolean;
}

const ImagePreview = ({ image, isPrincipal = false }: Props) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [style, setStyle] = useState({ display: "none" });
  const [isHoverImg, setisHoverImg] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleDeleteImage = async () => {
    if (imageURL === null) {
      return;
    }
    if (isPrincipal) {
      if (imageURL.includes("blob")) {
        setPrincipalImage([]);
        return;
      }
      await deletePrincipalImage(imageURL);
    } else {
      if (imageURL.includes("blob")) {
        onDeleteMultipleFile(image as File);
        return;
      }
      await deleteApiMedia(imageURL);
    }
    setIsVisible(false);
  };

  const { onDeleteMultipleFile, setPrincipalImage } = useFormContext();

  const imgStyle = { borderWidth: "2px", borderColor: "rgb(0 0 0)", opacity: "0.1" };
  useEffect(() => {
    // create the preview
    if (typeof image === "string") {
      setImageURL(image);
    } else if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setImageURL(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (Array.isArray(image)) {
      const objectUrl = URL.createObjectURL(image[0]);
      setImageURL(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageURL(image.url);
    }
  }, [image]);

  if (imageURL === null) return null;
  if (isVisible === false) return null;
  return (
    <div
      className="relative w-full h-fit"
      onMouseEnter={() => {
        setStyle({ display: "block" });
        setisHoverImg(true);
      }}
      onMouseLeave={() => {
        setStyle({ display: "none" }), setisHoverImg(false);
      }}>
      <Image
        src={imageURL}
        width={100}
        height={100}
        alt="preview"
        loading="lazy"
        className="flex-1 break-inside-avoid w-full h-fit border-2 border-transparent"
        style={{
          ...(isHoverImg
            ? {
                ...imgStyle
              }
            : {})
        }}
      />
      <Image
        src={"/assets/icons/delete.svg"}
        width={37}
        height={37}
        alt="delete"
        className="rounded-full absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={style}
        onClick={() => {
          handleDeleteImage();
        }}
      />
    </div>
  );
};

export default ImagePreview;
