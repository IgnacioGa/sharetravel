import React from "react";
import PropTypes from "prop-types";

function DismissableModal({ children }: any) {
  return (
    <div
      className={
        "w-full h-full flex justify-center items-center fixed top-0 right-0 z-[9999]"
      }
      style={{
        background: "rgba(182, 250, 198, 0.35)",
        backdropFilter: "blur(3px)",
      }}
    >
      {children}
    </div>
  );
}

DismissableModal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DismissableModal;
