"use client";

import Unauthorized from "@components/Unauthorized";
import { STATUS, TEXTOPTIONS } from "@utils/contants";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadCloudImages } from "@utils/cloudinary";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postFormSchema } from "@utils/formSchemas";

const Editor = dynamic(() => import("@components/Editor"), { ssr: false });

const CreatePost = () => {
  const { data: session } = useSession();
  const [status, setStatus] = useState<string>(STATUS.DRAFT);
  const router = useRouter();
  const [text, setText] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(postFormSchema)
  });

  const onSubmit = async () => {
    const filesInput = getValues("multipleFiles");
    let principalImage: string[] | undefined;

    if (getValues("multipleFiles")) {
      principalImage = await uploadCloudImages(getValues("multipleFiles"));
    }

    const title = getValues("title");

    const postData = {
      title,
      text,
      creator: session?.user?._id,
      city: "Junin, Bs As",
      status,
      principalImage: principalImage ? principalImage[0] : undefined
    };

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const data = await res.json();
      const post = JSON.parse(data.object);
      const imagesData = [];

      if (res.status == 201) {
        if (filesInput.length > 0) {
          const images = await uploadCloudImages(filesInput);
          for (let url in images) {
            imagesData.push({ post: post._id, url: images[url] });
          }
          try {
            await fetch("/api/images", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(imagesData)
            });
          } catch (error) {
            console.log(error);
          }
        }
        router.push(`/post/${post.slug}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setValue("title", "");
      setValue("multipleFiles", "");
      setValue("principalFile", "");
      setValue("city", "");
    }
  };

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

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
          <form className="flex-center flex-col mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-4/5">
              <input
                type="text"
                placeholder="Post Title.."
                required
                className="search_input peer mb-7"
                id="id_title"
                {...register("title")}
              />
              {errors.title && <small id="emailHelp">Title is a required field</small>}

              <label className="custom-file-upload mb-6">
                <input type="file" className="hidden" {...register("principalFile")} />
                Principal Image
              </label>
              {errors.principalFile && <small id="emailHelp">Email is a required field</small>}
              <Editor text={text} setText={setText} />

              <label className="custom-file-upload">
                <input type="file" className="hidden" {...register("multipleFiles")} multiple />
                Upload Images
              </label>
              {errors.multipleFiles && <small id="emailHelp">photo error</small>}
              <input type="text" placeholder="City.." required className="search_input peer mb-7" id="id_city" {...register("city")} />
              {errors.city && <small id="emailHelp">City is a required field</small>}
            </div>
            <div className="flex flex-row w-full align-middle justify-between mt-7">
              <button className="outline_btn">Delete</button>
              <div className="flex flex-row">
                <button type="submit" className="black_btn mr-5" onClick={() => setStatus(STATUS.DRAFT)}>
                  Save as draft
                </button>
                <button type="submit" className="black_btn" onClick={() => setStatus(STATUS.TOAPPROVE)}>
                  Save and publish
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

CreatePost.requireAuth = true;

export default CreatePost;
