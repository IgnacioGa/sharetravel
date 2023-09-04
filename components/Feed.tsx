"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { PostType } from "@utils/schemasTypes";
import { PostContainer } from "./PostContainer";
import { getPosts } from "@requests/post";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for city, tag or user..."
          value={searchText}
          onChange={handleSearchText}
          required
          className="search_input peer"
        />
      </form>

      <div className="flex flex-col gap-3 w-full mt-16">
        <PostContainer data={posts} />
        {/* <PostContainer data={posts} /> */}
      </div>
    </section>
  );
};

export default Feed;
