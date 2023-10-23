/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from "react";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface UserType {
  _id: string;
  email: string;
  username: string;
  image: string;
  firstName: string;
  lastName: string;
  slug: string;
}

export interface PostType {
  _id: string;
  creator: UserType;
  text: string;
  city: string;
  title: string;
  principalImage: string;
  medias: ImageProps[];
  slug: string;
}

export interface MediaType {
  _id: string;
  post: string;
  url: string;
}

export interface FormProps {
  onSubmit: SubmitHandler<any>;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setStatus: Dispatch<SetStateAction<string>>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  principalImage: File[] | string;
  setPrincipalImage: Dispatch<SetStateAction<File[] | string>>;
  multipleFiles: File[] | ImageProps[] | any[];
  onChangeMultipleFields: (files: FileList | ImageProps[] | null) => void;
  isUpdate: boolean;
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  deletePost: () => void;
}

export interface FormProviderProps extends FormProps {
  setValue: any;
  setSubmitURL: Dispatch<SetStateAction<string>>;
  onDeleteMultipleFile: (file: File) => void;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
}

export interface ImageProps {
  createdAt: string;
  post: string;
  updatedAt: string;
  url: string;
  __v: number;
  _id: string;
}

export interface LoginProps {
  enteredEmail: string | undefined;
  enteredPassword: string | undefined;
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

export interface MediaCreateProps {
  post: string;
  url: string;
}

export interface PostCreateProps {
  creator: string | undefined;
  text: string;
  city: string;
  title: string;
  principalImage?: string;
  status: string;
}

export interface PostUpdateProps {
  creator?: string | undefined;
  text?: string;
  city?: string;
  title?: string;
  principalImage?: string;
  status?: string;
}