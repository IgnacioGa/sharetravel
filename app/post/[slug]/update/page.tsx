"use client";

import Form from "@components/Form";
import NotFound from "@components/NotFound";
import { getApiPost } from "@requests/post";
import { PostType } from "@utils/schemasTypes";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "@provider/formProvider";
import { INDIVIDUAL_PAGE_STATUS } from "@utils/contants";

const UpdatePost = ({ params }: { params: { slug: string } }) => {
  const [pageStatus, setPageStatus] = useState<INDIVIDUAL_PAGE_STATUS>(INDIVIDUAL_PAGE_STATUS.LOADING);

  const getPost = async () => {
    const response = await getApiPost(params.slug);
    if (response.status == 404) return setPageStatus(INDIVIDUAL_PAGE_STATUS.NOT_FOUND);
    const postData = response.data;
    if (postData.medias && postData.medias.length > 0) {
      onChangeMultipleFields(postData.medias);
    }
    setInitialData(postData);
  };

  const setInitialData = (postData: PostType) => {
    setValue("title", postData?.title);
    setText(postData?.text);
    setValue("city", postData?.city);
    console.log('postdata ->', postData)
    setPageStatus(INDIVIDUAL_PAGE_STATUS.READY);
    if (postData.principalImage) setPrincipalImage(postData.principalImage);
  };

  useEffect(() => {
    getPost();
  }, []);

  const { data: session } = useSession();

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
    onChangeMultipleFields
  } = useFormContext();

  if (pageStatus === INDIVIDUAL_PAGE_STATUS.LOADING) return <div>Loading</div>;
  if (pageStatus === INDIVIDUAL_PAGE_STATUS.NOT_FOUND) return <NotFound />;

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
