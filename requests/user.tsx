import { LoginProps } from "@utils/schemasTypes";

export const signUpRequest = async (body: LoginProps) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    })
  });
  const data = await response.json();
  return { status: 200, data: JSON.parse(data) };
};
