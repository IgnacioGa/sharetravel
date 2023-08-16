import * as Yup from "yup";
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig } from "./utils";

interface IForm {
  title: string;
  multipleFiles: FileList | undefined;
  principalFile: File | null | undefined;
  city: string;
}

export const postFormSchema: Yup.ObjectSchema<IForm> = Yup.object({
  title: Yup.string().required("Title is required"),
  multipleFiles: Yup.mixed<FileList>()
    .required("You need to provide a file")
    .test("fileSize", "The file is too large", (files) => {
      let toBig = false;
      for (let value in files) {
        if (files[value] instanceof File && files[value].size < 2000000) toBig = true;
      }
      return toBig;
    })
    .test("type", "Only the following formats are accepted: .jpeg, .jpg, .png", (files) => {
      let goodType = false;
      for (let value in files) {
        if (
          files[value] instanceof File &&
          (files[value].type === "image/jpeg" || files[value].type === "image/jpg" || files[value].type === "image/png")
        )
          goodType = true;
      }
      return goodType;
    }),

  principalFile: Yup.mixed<File>()
    .nullable()
    .test("is-correct-file", "VALIDATION_FIELD_FILE_BIG", checkIfFilesAreTooBig)
    .test("is-big-file", "VALIDATION_FIELD_FILE_WRONG_TYPE", checkIfFilesAreCorrectType),
  city: Yup.string().required("City is required")
});
