import { MediaCreateProps } from "@utils/schemasTypes";

export const deleteApiMedia = async (url: string) => {
  const response = await fetch(`/api/image`, { method: "DELETE", body: JSON.stringify(url) });
  if (response.status == 405) return { status: 405, data: "Error on delete" };
  const data = await response.json();
  return { status: 200, data };
};

export const createApiMedia = async (body: MediaCreateProps[]) => {
  const response = await fetch("/api/image/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (response.status == 405) return { status: 405, data: "Error on create images" };
  return { status: 201, data: {} };
};
