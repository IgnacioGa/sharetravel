"use client";

import { MediaType, PostType } from "@utils/schemasTypes";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import parse from "html-react-parser";
import NotFound from "@components/NotFound";
import Gallery from "@components/Gallery";
import { getApiPost } from "@requests/post";
import { INDIVIDUAL_PAGE_STATUS } from "@utils/contants";

const IndividualPost = ({ params }: { params: { slug: string } }) => {
  const [post, setPost] = useState<PostType | any>(undefined);
  const [medias, setMedias] = useState<MediaType[]>([]);
  const [pageStatus, setPageStatus] = useState<INDIVIDUAL_PAGE_STATUS>(INDIVIDUAL_PAGE_STATUS.LOADING)

  const getPost = useCallback(async () => {
    const response = await getApiPost(params.slug);
    if (response.status == 404) return setPageStatus(INDIVIDUAL_PAGE_STATUS.NOT_FOUND);
    const postData = response.data;
    console.log("POST -> ", postData);
    if (postData.medias && postData.medias.length > 0) {
      setMedias(postData.medias);
    }
    setPost(postData)
    setPageStatus(INDIVIDUAL_PAGE_STATUS.READY);
  }, [params.slug]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if(pageStatus === INDIVIDUAL_PAGE_STATUS.LOADING) return <div>Loading</div>
  if(pageStatus === INDIVIDUAL_PAGE_STATUS.NOT_FOUND) return <NotFound />

  return (
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
        <div className="w-3/4 h-[15rem] align-middle justify-center mt-10">
          <Gallery medias={medias} />
        </div>
      )}
    </section>
  );
};

export default IndividualPost;
