import { PostType } from "@utils/schemasTypes";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

interface PropsType {
  post: PostType;
}

const Post = ({ post }: PropsType) => {
  return (
    <div className="prompt_card">
      <Image src={post.principalImage || "/assets/images/grid.svg"} alt="post_image" width={100} height={40} className="w-full" />
      <div className="flex flex-col justify-center p-5 pb-0">
        <div className="flex justify-between items-start gap-5 flex-col">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image || "/assets/icons/profile.svg"}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-md object-contain"
            />
            <div className="flex flex-col ">
              <h3 className="font-satoshi font-semibold text-gray-900">{post?.title}</h3>
              <p className="font-inter text-sm text-gray-500">{post?.creator?.username}</p>
            </div>
          </div>
          {/* <div className="copy_btn" onClick={() => {}}>
            <Image src={copied === post.text ? 'assets/icons/tick.svg' : 'assets/icons/copy.svg'} width={12} height={12} />
          </div> */}
        </div>

        <div className="my-4 font-satoshi text-sm text-gray-700 fade">{parse(`${post.text}`)}</div>
        <div>
          <Link href={`post/${post.slug}`} className="flex gap-2 flex-center">
            <p className="font-inter text-sm blue_gradient cursor-pointer">See more...</p>
          </Link>
        </div>
        {/* <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p> */}
        <p className="font-inter text-sm cursor-pointer text-right mt-4 hover:underline w-5/5 ">{post.city}</p>
      </div>
    </div>
  );
};

export default Post;
