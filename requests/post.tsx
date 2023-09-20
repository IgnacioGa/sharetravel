import { STATUS } from "@utils/contants";

export const getApiPost = async (slug: string) => {
  const response = await fetch(`/api/post/${slug}`);
  if (response.status == 404) return { status: 404, data: "Post Not Found" };
  const data = await response.json();
  return { status: 200, data: JSON.parse(data) };
};

export const deletePrincipalImage = async (url: string) => {
  const response = await fetch(`/api/post`, { method: "POST", body: JSON.stringify(url) });
  if (response.status == 404) return { status: 404, data: "Post Not Found" };
  const data = await response.json();
  return { status: 200, data: JSON.parse(data.object) };
};

export const getPosts = async () => {
  const response = await fetch("/api/post");
  const data = await response.json();
  return { status: 200, data: JSON.parse(data.object) };
};

export const getFeedPosts = async() => {
  const response = await fetch('api/post?' + new URLSearchParams({status: STATUS.TOAPPROVE}));
  const data = await response.json();
  return { status: 200, data: JSON.parse(data.object) };
}