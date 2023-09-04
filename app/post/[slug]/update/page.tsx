"use client";

import Form from "@components/Form";
import NotFound from "@components/NotFound";
import { getApiPost } from "@requests/post";
import { PostType } from "@utils/schemasTypes";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "@provider/formProvider";
import { INDIVIDUAL_PAGE_STATUS, TEXTOPTIONS } from "@utils/contants";
import Unauthorized from "@components/Unauthorized";

const UpdatePost = ({ params }: { params: { slug: string } }) => {
  const [pageStatus, setPageStatus] = useState<INDIVIDUAL_PAGE_STATUS>(INDIVIDUAL_PAGE_STATUS.LOADING);
  const [postData, setPostData] = useState<null | PostType>(null);

  const getPost = useCallback(async () => {
    const response = await getApiPost(params.slug);
    if (response.status == 404) return setPageStatus(INDIVIDUAL_PAGE_STATUS.NOT_FOUND);
    const postData = response.data;
    setPostData(postData);
    setSubmitURL(`/api/post/${postData.slug}`);
    setInitialData(postData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setInitialData = (postData: PostType) => {
    onChangeMultipleFields(null);
    if (postData.medias && postData.medias.length > 0) {
      onChangeMultipleFields(postData.medias);
    }
    setValue("title", postData?.title);
    setText(postData?.text);
    setValue("city", postData?.city);
    console.log("postdata ->", postData);
    if (postData.principalImage) setPrincipalImage(postData.principalImage);
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      if (pageStatus === INDIVIDUAL_PAGE_STATUS.NOT_FOUND) return;

      if (postData) {
        if (session.user._id === postData.creator._id) {
          setPageStatus(INDIVIDUAL_PAGE_STATUS.READY);
        } else {
          setPageStatus(INDIVIDUAL_PAGE_STATUS.UNAUTHORIZED);
        }
      }
    }
    if (session === null) setPageStatus(INDIVIDUAL_PAGE_STATUS.UNAUTHORIZED);
  }, [session, postData, pageStatus]);

  const {
    onSubmit,
    handleSubmit,
    register,
    setValue,
    errors,
    setStatus,
    text,
    setText,
    principalImage,
    setPrincipalImage,
    multipleFiles,
    onChangeMultipleFields,
    setSubmitURL
  } = useFormContext();

  if (pageStatus === INDIVIDUAL_PAGE_STATUS.LOADING) return <div>Loading</div>;
  if (pageStatus === INDIVIDUAL_PAGE_STATUS.NOT_FOUND) return <NotFound />;
  if (pageStatus === INDIVIDUAL_PAGE_STATUS.UNAUTHORIZED) return <Unauthorized text={TEXTOPTIONS.unlogged} />;

  return (
    <Form
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      setStatus={setStatus}
      text={text}
      setText={setText}
      principalImage={principalImage}
      setPrincipalImage={setPrincipalImage}
      multipleFiles={multipleFiles}
      onChangeMultipleFields={onChangeMultipleFields}
    />
  );
};

export default UpdatePost;
