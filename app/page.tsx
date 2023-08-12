import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Share your Experiences
        <br />
        <span className="orange_gradient text-center">And let the World Knows</span>
      </h1>
      <p className="desc text-center">Share your experiences with people around the world and help to find the better places for city</p>

      <Feed />
    </section>
  );
};

export default Home;
