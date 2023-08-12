"use client";

import { MediaType, PostType } from "@utils/schemasTypes";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import parse from "html-react-parser";
import NotFound from "@components/NotFound";
import Gallery from "@components/Gallery";

const IndividualPost = ({ params }: { params: { slug: string } }) => {
  const [post, setPost] = useState<PostType | any>(undefined);
  const [notFoundBool, setNotFoundBool] = useState(false);
  const [medias, setMedias] = useState<MediaType[]>([]);

  const getPost = useCallback(async () => {
    const response = await fetch(`/api/post/${params.slug}`);
    const data = await response.json();
    const postData = JSON.parse(data);
    console.log("POST -> ", postData);
    response.status == 404 ? setNotFoundBool(true) : setPost(postData);
    if (postData.medias && postData.medias.length > 0) {
      setMedias(postData.medias);
    }
  }, [params.slug]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <>
      {!post && !notFoundBool ? (
        <div>Loading</div>
      ) : (
        <>
          {notFoundBool ? (
            <NotFound />
          ) : (
            <section className="flex-center flex-col w-full">
              <div className="head_text text-center mb-5">{post?.title}</div>
              <div className="flex-between flex-row w-full align-middle mt-4">
                <div className="flex flex-row justify-center">
                  <Image
                    src={post?.creator.image as string}
                    width={20}
                    height={20}
                    alt="profile"
                    className="rounded-full mr-2"
                    loading="lazy"
                  />
                  <span>{post?.creator.username}</span>
                </div>
                <span>{post?.city}</span>
              </div>
              <div className="mt-12 justify-start w-full">{parse(`${post.text}`)}</div>

              {medias.length > 0 && (
                <div className="w-3/4 h-[15rem] align-middle justify-center pt-4">
                  <Gallery medias={medias} />
                </div>
              )}
            </section>
          )}
        </>
      )}
    </>
  );
};

export default IndividualPost;
