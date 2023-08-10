import Image from "next/image";

const post = {
  _id: "3",
  user: {
    _id: "64bfabbdefce6b61574a708a",
    email: "ignacio.vilden@gmail.com",
    username: "nachoodh",
    image:
      "https://lh3.googleusercontent.com/a/AAcHTtdV930lsHav43501x89N3oIjfpahTgAuBhfWphL3J4WBQ=s96-c",
    firstName: "Nachoo ",
    lastName: "DH",
    slug: "nachoodh",
  },
  slug: "title-slug",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  city: "Pergamino, Buenos Aires",
  title: "title",
  principalImage:
    "https://cdn.britannica.com/32/20032-050-B0CF9E76/Shoppers-Galleria-Vittorio-Emanuele-II-Italy-Milan.jpg",
};

const IndividualPost = () => {
  return (
    <section className="flex-center flex-col w-full">
      <h1 className="head_text text-center">{post?.title}</h1>
      <div className="flex-between flex-row w-full align-middle mt-4">
        <div className="flex flex-row justify-center">
          <Image
            src={post.user.image}
            width={20}
            height={20}
            alt="profile"
            className="rounded-full mr-2"
            loading="lazy"
          />
          <span>{post.user.username}</span>
        </div>
        <span>{post.city}</span>
      </div>
    </section>
  );
};

export default IndividualPost;
