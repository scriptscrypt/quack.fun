import React, { useEffect } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard";
// import { apiGetPosts } from "src/services/BEApis/PostsAPIs/PostsApi";
// import { Spin } from "antd";
import { Outlet, useParams, Link } from "react-router-dom";
// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";

const SinglePostWrapper = () => {
  const { postId } = useParams();
  console.log("postId", postId);

  // const [posts, setPosts] = useState<PostType[]>([]);
  // const [loading, setLoading] = useState(false);

  // sample api call
  // const fnGetAllPosts = async () => {
  //   setLoading(true);
  //   const allPostsRes = await apiGetPosts();
  //   console.log(allPostsRes);
  //   setPosts(allPostsRes?.data?.posts);
  //   setLoading(false);
  // };

  // To ignore TS Warning
  // fnGetAllPosts();

  useEffect(() => {
    // fnGetAllPosts();
  }, []);
  return (
    <>
      <div className="m-4 md:m-0">
        <div className="flex m-2">
          <div className="mt-2">
            {" "}
            <Link to="/feed">
              {" "}
              <BsArrowLeft size={24} />{" "}
            </Link>{" "}
          </div>
          <div className="m-2">Post</div>
        </div>
      </div>

      {postId && (
        <PostDetailsCard
          userPostId={postId}
          postLikes={"10"}
          userProfileImage={`https://picsum.photos/${postId + 300}/400/40/40`}
          userProfileName={"Scripts"}
          userProfileUsername={`userid${postId}`}
          userPostImage={`https://picsum.photos/${postId + 300}600/800/600`}
          userProfilePostText={"test"}
        />
      )}
      <Outlet />
    </>
  );
};

export default SinglePostWrapper;
