"use client";

import Unauthorized from "@components/Unauthorized";
import { STATUS, TEXTOPTIONS } from "@utils/contants";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("@components/Editor"), { ssr: false });

const CreatePost = () => {
  const { data: session } = useSession();
  const [status, setStatus] = useState<string>(STATUS.DRAFT);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.multipleFiles.files;
    const postData: { [key: string]: any } = {
      title: title,
      text: text,
      user: session?.user?._id,
      city: "Junin, Bs As",
      status
    };
    const fd = new FormData();
    for (let key in postData) {
      fd.append(key, postData[key]);
    }
    for (const file of fileInput) {
      fd.append("file", file);
    }
    fd.append("upload_preset", "share-files");

    try {
      await fetch("/api/post/create", {
        method: "POST",
        body: fd
      })
        .then(async function (response) {
          console.log(response, response.status);
          if (response.status == 201) return response.json();
          const er = await response.json();
          console.log(er);
        })
        .then(function (data) {
          router.push(`/post/${data.slug}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
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
          <form className="flex-center flex-col mt-8 w-full" onSubmit={handleSubmit}>
            <div className="w-4/5">
              <input
                type="text"
                placeholder="Post Title.."
                value={title}
                onChange={handleTitleChange}
                required
                className="search_input peer mb-7"
                name="title"
                id="id_title"
              />

              <label className="custom-file-upload mb-6">
                <input type="file" className="hidden" name="principalFile" />
                Principal Image
              </label>

              <Editor text={text} setText={setText} />

              <label className="custom-file-upload">
                <input type="file" className="hidden" name="multipleFiles" multiple />
                Upload Images
              </label>
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
