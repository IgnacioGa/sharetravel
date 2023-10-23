"use client";

import Unauthorized from "@components/Unauthorized";
import { INDIVIDUAL_PAGE_STATUS, TEXTOPTIONS } from "@utils/contants";
import { useSession } from "next-auth/react";
import Form from "@components/Form";
import { useFormContext } from "@provider/formProvider";
import { useCallback, useEffect, useState } from "react";

const CreatePost = () => {
  const { data: session } = useSession();

  const [pageStatus, setPageStatus] = useState<INDIVIDUAL_PAGE_STATUS>(INDIVIDUAL_PAGE_STATUS.LOADING);

  const {
    onSubmit,
    handleSubmit,
    register,
    errors,
    setStatus,
    text,
    setText,
    principalImage,
    setPrincipalImage,
    multipleFiles,
    onChangeMultipleFields,
    setValue,
    isUpdate
  } = useFormContext();

  const clearInitialData = useCallback(() => {
    onChangeMultipleFields(null);
    setPrincipalImage([]);
    setValue("title", "");
    setText("");
    setValue("city", "");
  }, [onChangeMultipleFields, setPrincipalImage, setText, setValue]);

  useEffect(() => {
    if (session?.user) {
      setPageStatus(INDIVIDUAL_PAGE_STATUS.READY);
      clearInitialData();
    }
    if (session === null) setPageStatus(INDIVIDUAL_PAGE_STATUS.UNAUTHORIZED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (pageStatus === INDIVIDUAL_PAGE_STATUS.LOADING) return <div>Loading</div>;
  if (pageStatus === INDIVIDUAL_PAGE_STATUS.UNAUTHORIZED) return <Unauthorized text={TEXTOPTIONS.unlogged} />;

  return (
    <section className="flex justify-start align-middle flex-col w-full h-screen">
      <h1 className="head_text text-center">Create Post</h1>
      <p className="desc text-center">
        Create your post, can be published directly or put in on draft until is ready. You can publish whatever you want but the idea is to
        post most personal experiencies in general than cultural or informative posts.
      </p>
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
        isUpdate={isUpdate}
      />
    </section>
  );
};

export default CreatePost;
