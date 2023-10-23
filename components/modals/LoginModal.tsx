import { signIn } from "next-auth/react";
import React, { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { signUpRequest } from "@requests/user";
import { LoginProps } from "@utils/schemasTypes";

// This goes to our signup API endpoint
async function createUser({ enteredEmail, enteredPassword, username, firstName, lastName }: LoginProps) {
  const response = await signUpRequest({ enteredEmail, enteredPassword, username, firstName, lastName });
  const data = response.data;

  if (response.status != 200) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function LoginModal({ onCancel }: any) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);

  // We keep track of whether in a login / or register state
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function loginUser({ email, password }: { email: string | undefined; password: string | undefined }) {
    await signIn("credentials", {
      email: email,
      password: password
    });
  }

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;
    const enteredPassword = passwordInputRef?.current?.value;
    const username = usernameInputRef?.current?.value;
    const firstName = firstNameInputRef?.current?.value;
    const lastName = lastNameInputRef?.current?.value;

    // optional: Add validation here

    let email = enteredEmail;
    let password = enteredPassword;
    if (isLogin) {
      loginUser({ email, password });
    } else {
      try {
        await createUser({
          enteredEmail,
          enteredPassword,
          username,
          firstName,
          lastName
        });
        loginUser({ email, password });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div
      className={"modal"}>
      <div className="flex flex-col items-center">
        <Image src="/assets/images/logo.svg" width={100} height={100} alt="logo" className="object-coantain mb-4" />
      </div>
      <div className={"flex flex-col items-center gap-4 p-1 md:p-3 rounded-[7px]"}>
        {isLogin ? <h1>Welcome back to Share Travel</h1> : <h1>Create an Account</h1>}
      </div>
      <form onSubmit={submitHandler} className="flex flex-col align-middle items-start justify-center gap-3">
        <div className="flex flex-col items-center gap-2 justify-center align-middle w-full">
          <div className="input-login">
            <label className="w-4/5 mb-1" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          {!isLogin && (
            <>
              <div className="input-login">
                <label className="w-4/5 mb-1" htmlFor="username">
                  Username
                </label>
                <input type="input" id="username" required ref={usernameInputRef} />
              </div>
              <div className="input-login">
                <label className="w-4/5 mb-1" htmlFor="fistName">
                  First Name
                </label>
                <input type="input" id="fistName" required ref={firstNameInputRef} />
              </div>
              <div className="input-login">
                <label className="w-4/5 mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <input type="input" id="lastName" required ref={lastNameInputRef} />
              </div>
            </>
          )}
          <div className="input-login">
            <label className="w-4/5 mb-1" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" required ref={passwordInputRef} />
          </div>
        </div>
        <div className="my-5 flex flex-row w-full">
          <button className="black_btn mr-4">{isLogin ? "Login" : "Create Account"}</button>
          <button className="outline_btn" type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "No Account? Create One" : "Already a user? Login"}
          </button>
        </div>
        <hr />
      </form>
      <button
        className="outline_btn"
        type="button"
        onClick={() => {
          signIn("google");
        }}>
        Or login with google
      </button>
      <div className={"w-full row justify-center items-center mt-4"}>
        <div className={"w-[182px]"}>
          <button onClick={onCancel} className={"outline_btn"}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
