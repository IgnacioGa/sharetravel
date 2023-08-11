export const uploadCloudImages = async (images: []) => {
  const urlsImages = [];
  for (const file of images) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "share-files");

    try {
      const resp = await fetch("https://api.cloudinary.com/v1_1/dqonycdut/image/upload", {
        method: "POST",
        body: fd
      });
      const data = await resp.json();
      urlsImages.push(data.secure_url);
    } catch (error) {
      console.log(error);
    }
  }
  return urlsImages;

  // try {
  //   await fetch("/api/images", {
  //     method: "POST",
  //     body: fd
  //   })
  //     .then(async function (response) {
  //       console.log(response, response.status);
  //       const er = await response.json();
  //       console.log(er);
  //     });
  // } catch (error) {
  //   console.log(error);
  // }
};
