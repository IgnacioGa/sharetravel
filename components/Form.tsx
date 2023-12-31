import { STATUS } from "@utils/contants";
import ImagePreview from "./ImagePreview";
import dynamic from "next/dynamic";
import { FormProps } from "@utils/schemasTypes";
import { instanceOfImage } from "@utils/utils";
import DismissableModal from "./DismisableModal";
import DeletePostModal from "./modals/DeletePostModal";

const Editor = dynamic(() => import("@components/Editor"), { ssr: false });

const Form = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  setStatus,
  text,
  setText,
  setPrincipalImage,
  principalImage,
  multipleFiles,
  onChangeMultipleFields,
  isUpdate,
  deleteModal,
  setDeleteModal,
  deletePost
}: FormProps) => {
  return (
    <>
      {deleteModal && (
        <DismissableModal>
          <DeletePostModal onAccept={deletePost} onCancel={() => setDeleteModal(false)} />
        </DismissableModal>
      )}
      <form className="flex-center flex-col mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-4/5">
          <input type="text" placeholder="Post Title.." required className="search_input peer mb-7" id="id_title" {...register("title")} />
          {errors.title && <small id="emailHelp">Title is a required field</small>}

          <label className="custom-file-upload mb-6">
            <input
              type="file"
              className="hidden"
              {...register("principalFile", {
                onChange(event) {
                  setPrincipalImage(event.currentTarget.files);
                }
              })}
            />
            Principal Image
          </label>
          {errors.principalFile && <small id="emailHelp">Email is a required field</small>}

          {principalImage.length > 0 ? (
            <div className="flex align-middle justify-center mb-4">
              <ImagePreview
                image={principalImage[0] instanceof File || instanceOfImage(principalImage[0]) ? principalImage[0] : principalImage}
                isPrincipal={true}
              />
            </div>
          ) : null}
          <Editor text={text} setText={setText} />

          <label className="custom-file-upload">
            <input
              type="file"
              className="hidden"
              multiple
              {...register("multipleFiles", {
                onChange(event) {
                  onChangeMultipleFields(event.currentTarget.files);
                }
              })}
            />
            Upload Images
          </label>
          {errors.multipleFiles && <small id="emailHelp">photo error</small>}
          {multipleFiles.length > 0 ? (
            <div className="prompt_layout mt-3 mb-5">
              {multipleFiles.map((file, i) => (
                <ImagePreview key={i} image={file} />
              ))}
            </div>
          ) : null}
          <input type="text" placeholder="City.." required className="search_input peer mb-7" id="id_city" {...register("city")} />
          {errors.city && <small id="emailHelp">City is a required field</small>}
        </div>
        <div className="flex flex-row w-full align-middle justify-between mt-7">
          {isUpdate ? (
            <>
              <button
                type="button"
                className="outline_btn"
                onClick={() => {
                  setDeleteModal(true);
                }}>
                Delete
              </button>
              <button className="outline_btn">Archive</button>
            </>
          ) : null}

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
  );
};

export default Form;
