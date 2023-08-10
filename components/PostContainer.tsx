import { PostType } from "@utils/schemasTypes";
import PostCard from "./PostCard";

interface PropsType {
  data: PostType[];
  handleTagClick: () => void;
}

export const PostContainer = ({ data, handleTagClick }: PropsType) => {
  return (
    <div className="flex flex-col w-full ">
      <div
        className="w-full justify-start align-middle flex font-satoshi border-solid border-0 border-b border-blue-900 mb-3
"
      >
        <h2 className="text-lg">Best weekly posts</h2>
      </div>
      <div className="prompt_layout w-full justify-center align-middle gap-3">
        {data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </div>
  );
};
