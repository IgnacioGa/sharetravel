export const deleteApiMedia = async (url: string) => {
  const response = await fetch(`/api/image`, { method: "DELETE", body: JSON.stringify(url) });
  if (response.status == 405) return { status: 405, data: "Error on delete" };
  const data = await response.json();
  return { status: 200, data };
};
