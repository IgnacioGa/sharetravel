import React from "react";

const Unauthorized = ({ text }: any) => {
  return (
    <div className="flex flex-col w-full align-middle items-center justify-center">
      <h1 className="head_text text-center">{text.title}</h1>
      <p className="desc text-center">{text.text}</p>
      {text.showLogin && (
        <button
          type="button"
          //   onClick={() => {
          //     signIn(provider.id);
          //   }}
          className="black_btn mt-4 w-2/5">
          Sign in or Log In
        </button>
      )}
    </div>
  );
};

export default Unauthorized;
