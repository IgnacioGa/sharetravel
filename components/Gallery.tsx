"use client";

import { MediaType } from "@utils/schemasTypes";
import React from "react";
import { Carousel } from "flowbite-react";
import Image from "next/image";

interface PostsProps {
  medias: MediaType[];
}

const Gallery: React.FC<PostsProps> = ({ medias }) => {
  return (
    <Carousel>
      {medias.map((image: MediaType) => (
        <Image
          src={image.url}
          key={image._id}
          width={500}
          height={500}
          alt={`image-${image._id}`}
          className="rounded-full mr-2"
          loading="lazy"
        />
      ))}
    </Carousel>
  );
};

export default Gallery;
