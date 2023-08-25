export const getApiPost = async (slug: string) => {
  const response = await fetch(`/api/post/${slug}`);
  if (response.status == 404) return { status: 404, data: "Post Not Found" };
  const data = await response.json();
  return { status: 200, data: JSON.parse(data) };
};
