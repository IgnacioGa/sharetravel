"use client";

import Unauthorized from "@components/Unauthorized";
import { TEXTOPTIONS } from "@utils/contants";
import { useSession } from "next-auth/react";
import Form from "@components/Form";
import { useFormContext } from "@provider/formProvider";

const CreatePost = () => {
  const { data: session } = useSession();

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
    onChangeMultipleFields
  } = useFormContext();

  return (
    <section className="flex justify-start align-middle flex-col w-full h-screen">
      {!session?.user ? (
        <Unauthorized text={TEXTOPTIONS.unlogged} />
      ) : (
        <>
          <h1 className="head_text text-center">Create Post</h1>
          <p className="desc text-center">
            Create your post, can be published directly or put in on draft until is ready. You can publish whatever you want but the idea is
            to post most personal experiencies in general than cultural or informative posts.
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
          />
        </>
      )}
    </section>
  );
};

CreatePost.requireAuth = true;

export default CreatePost;
