import React from 'react'

const DeletePostModal = ({onAccept, onCancel}: any) => {
  return (
    <div
      className={"modal"}>
      <div className={"flex flex-col items-center gap-4 p-1 md:p-3 rounded-[7px]"}>
        Are you sure you want to Delete ? This is irreversible
      </div>
      <div className={"w-full row justify-center items-center mt-4"}>
        <div className={"w-[182px]"}>
          <button onClick={onCancel} className={"outline_btn"}>
            Cancel
          </button>
          <button onClick={onAccept} className={"outline_btn"}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePostModal