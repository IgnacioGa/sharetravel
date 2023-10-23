/* eslint-disable no-unused-vars */
"use client";

import React from "react";
import { BaseSyntheticEvent, createContext, useContext, useMemo, useState } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadCloudImages } from "@utils/cloudinary";
import { STATUS } from "@utils/contants";
import { postFormSchema } from "@utils/formSchemas";
import { FormProviderProps, ImageProps } from "@utils/schemasTypes";
import { instanceOfImage } from "@utils/utils";
import { createApiMedia } from "@requests/media";
import { createPost, updatePost } from "@requests/post";

const INITIAL_VALUES: FormProviderProps = {
  onSubmit: () => (e?: React.FormEvent<HTMLFormElement>) => new Promise<void>(() => {}),
  handleSubmit: () => (e?: BaseSyntheticEvent<object, any, any> | undefined) => new Promise<void>(() => {}),
  register: (data: any): UseFormRegisterReturn<any> => data,
  setValue: () => {},
  errors: {},
  setStatus: () => {},
  text: "",
  setText: () => {},
  principalImage: [],
  setPrincipalImage: () => {},
  multipleFiles: [],
  onChangeMultipleFields: (files: FileList | ImageProps[] | null) => {},
  setSubmitURL: () => "",
  onDeleteMultipleFile: () => null,
  isUpdate: false,
  setIsUpdate: () => {},
  setDeleteModal: () => {},
  deleteModal: false,
  deletePost: () => {}
};

const FormContext = createContext(INITIAL_VALUES);

export const FormContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [multipleFiles, setMultipleFiles] = useState<File[] | ImageProps[]>([]);
  const [principalImage, setPrincipalImage] = useState<File[] | string>([]);
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<string>(STATUS.DRAFT);
  const [submitURL, setSubmitURL] = useState<string>("/api/post/create");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const router = useRouter();

  const onChangeMultipleFields = (files: FileList | ImageProps[] | null) => {
    if (files && files.length > 0) {
      for (let file in files) {
        if (files[file] instanceof File || instanceOfImage(files[file])) {
          setMultipleFiles((prevState: any) => [...prevState, files[file]]);
        }
      }
    }
    if (files == null) setMultipleFiles([]);
  };

  const onDeleteMultipleFile = (file: File) => {
    setMultipleFiles((prevState: any) => prevState.filter((i: File) => i !== file));
  };

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
    let filesInput: File[] = [];
    let urlPrincipalImage;

    for (let file in multipleFiles) {
      if (multipleFiles[file] instanceof File) filesInput.push(multipleFiles[file] as File);
    }

    if (principalImage.length > 0 && principalImage[0] instanceof File) {
      urlPrincipalImage = await uploadCloudImages(principalImage as File[]);
    }

    const title: string = getValues("title");
    const city = getValues("city");

    const postData = {
      title,
      text,
      creator: session?.user?._id,
      city,
      status,
      principalImage: urlPrincipalImage ? urlPrincipalImage[0] : undefined
    };

    let res;
    try {
      if (submitURL === "/api/post/create") {
        res = await createPost(postData);
      } else {
        res = await updatePost(postData, submitURL);
      }
      const post = res.data;
      const imagesData = [];

      if (res.status == 201) {
        if (filesInput.length > 0) {
          const images = await uploadCloudImages(filesInput);
          for (let url in images) {
            imagesData.push({ post: post._id, url: images[url] });
          }
          try {
            const response = await createApiMedia(imagesData);
            if (response.status == 201) router.push(`/post/${post.slug}`);
          } catch (error) {
            console.log(error);
          }
        }
        router.push(`/post/${post.slug}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    console.log("de;etetasf", submitURL);
    const postDeleteData = {
      status: STATUS.DELETED
    };
    await updatePost(postDeleteData, submitURL);
    router.push("/");
  };

  const memorizedValue = useMemo(() => {
    return {
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
      setSubmitURL,
      onDeleteMultipleFile,
      setIsUpdate,
      isUpdate,
      setDeleteModal,
      deleteModal,
      deletePost
    };
  }, [errors, text, principalImage, multipleFiles, isUpdate, deleteModal, setDeleteModal]);

  return <FormContext.Provider value={memorizedValue}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
