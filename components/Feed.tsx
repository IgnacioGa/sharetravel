"use client";

import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { PostType } from "@utils/schemasTypes";
import { PostContainer } from "./PostContainer";

const post_data = [
  {
    _id: "1",
    user: {
      _id: "64bfabbdefce6b61574a708a",
      email: "ignacio.vilden@gmail.com",
      username: "nachoodh",
      image: "https://lh3.googleusercontent.com/a/AAcHTtdV930lsHav43501x89N3oIjfpahTgAuBhfWphL3J4WBQ=s96-c",
      firstName: "Nachoo ",
      lastName: "DH",
      slug: "nachoodh"
    },
    slug: "title-slug",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    city: "Pergamino, Buenos Aires",
    title: "title",
    principalImage: "https://cdn.britannica.com/32/20032-050-B0CF9E76/Shoppers-Galleria-Vittorio-Emanuele-II-Italy-Milan.jpg"
  },
  {
    _id: "2",
    user: {
      _id: "64bfabbdefce6b61574a708a",
      email: "ignacio.vilden@gmail.com",
      username: "nachoodh",
      image: "https://lh3.googleusercontent.com/a/AAcHTtdV930lsHav43501x89N3oIjfpahTgAuBhfWphL3J4WBQ=s96-c",
      firstName: "Nachoo ",
      lastName: "DH",
      slug: "nachoodh"
    },
    slug: "title-slug",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    city: "Pergamino, Buenos Aires",
    title: "title",
    principalImage: "https://cdn.britannica.com/32/20032-050-B0CF9E76/Shoppers-Galleria-Vittorio-Emanuele-II-Italy-Milan.jpg"
  },
  {
    _id: "3",
    user: {
      _id: "64bfabbdefce6b61574a708a",
      email: "ignacio.vilden@gmail.com",
      username: "nachoodh",
      image: "https://lh3.googleusercontent.com/a/AAcHTtdV930lsHav43501x89N3oIjfpahTgAuBhfWphL3J4WBQ=s96-c",
      firstName: "Nachoo ",
      lastName: "DH",
      slug: "nachoodh"
    },
    slug: "title-slug",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    city: "Pergamino, Buenos Aires",
    title: "title",
    principalImage: "https://cdn.britannica.com/32/20032-050-B0CF9E76/Shoppers-Galleria-Vittorio-Emanuele-II-Italy-Milan.jpg"
  }
];

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);

  console.log(posts);

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const fetchPosts = useCallback(async () => {
    const response = await fetch("/api/post");
    const data = await response.json();

    setPosts(data);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
        <PostContainer data={post_data} handleTagClick={() => {}} />
        <PostContainer data={post_data} handleTagClick={() => {}} />
      </div>
    </section>
  );
};

export default Feed;
