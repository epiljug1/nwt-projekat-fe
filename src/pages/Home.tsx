import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import styled from "styled-components";
import Post from "../components/Post";
import RedditCard from "../components/Card";
import SubforumModal from "../components/SubforumModal";
import PostModal from "../components/PostModal";
import { useQuery } from "react-query";
import { fetchPosts } from "../api/fetchPosts";
import { fetchSubforums } from "../api/fetchSubforums";
import { useGetPosts } from "../hooks/useGetPosts";
import { fetchPostsLikes } from "../api/fetchPostLikes";
import { fetchUserLikes } from "../api/fetchUserLikes";
import { useLocation, useNavigate } from "react-router-dom";

const MainWrapper = styled.div`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  margin: 20px auto;
`;

const PostsContainer = styled.div`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  margin: 0px auto;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #ff4500;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;

  &:hover {
    background-color: #a42f04;
  }
`;

const ButtonWrapper = styled.div`
  align-self: flex-start;
  margin-left: 15px;

  display: flex;
  gap: 10px;
`;

const SubforumWrapper = styled.div`
  /* position: absolute; */
  position: fixed;
  top: 84px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* margin-left: 10px; */

  height: fit-content;
  overflow: auto;

  border-radius: 10px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  padding-right: 10px;
  padding-left: 10px;

  padding-bottom: 10px;
`;

const SubforumButton = styled.button<{ active?: boolean }>`
  border-radius: 10px;
  padding: 10px 50px;
  font-style: italic;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    background-color: #ababab;
  }

  background-color: ${(props) => (props?.active ? "#736e6e" : "")};
  color: ${(props) => (props?.active ? "#ffffff" : "#000000")};
`;

export default function Home() {
  const [subforumModal, setSubforumModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [activeSubforum, setActiveSubforum] = useState(0);
  const userId = localStorage.getItem("userId");

  useGetPosts();

  const { data: listOfPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return fetchPosts();
    },
  });
  if (listOfPosts) console.log(listOfPosts);

  const { data: listOfSubforums } = useQuery({
    queryKey: ["subforums"],
    queryFn: () => {
      return fetchSubforums();
    },
  });

  const { data: postLikes } = useQuery({
    queryKey: ["likes-for-post"],
    queryFn: () => {
      return fetchPostsLikes({
        postsId: listOfPosts.map((item: any) => item.id),
      });
    },
    enabled: !!listOfPosts,
  });

  const { data: userLikes } = useQuery({
    queryKey: ["likes-for-user"],
    queryFn: () => {
      return fetchUserLikes({ userId: userId ?? "1" });
    },
    enabled: !!(postLikes && userId),
  });

  return (
    <>
      <Navbar />
      <SubforumWrapper>
        <h2>Subforums</h2>
        {listOfSubforums ? (
          listOfSubforums.map((item: any, index: number) => (
            <SubforumButton
              active={item.id.toString() === localStorage.getItem("subforumId")}
              onClick={() => {
                const subforumId = localStorage.getItem("subforumId");
                if (subforumId === item.id.toString()) {
                  localStorage.removeItem("subforumId");
                  setActiveSubforum(0);
                } else {
                  localStorage.setItem("subforumId", item.id);
                  setActiveSubforum(item.id);
                }
              }}
              key={index}
            >
              {item.name}
            </SubforumButton>
          ))
        ) : (
          <div>No Subforums</div>
        )}
      </SubforumWrapper>
      <MainWrapper>
        <SubforumModal
          isOpen={subforumModal}
          onCloseModal={() => setSubforumModal(false)}
        />
        <PostModal
          isOpen={postModal}
          onCloseModal={() => setPostModal(false)}
        />
        {!!userId && (
          <ButtonWrapper key={userId}>
            <Button onClick={() => setSubforumModal(true)}>Add Subforum</Button>
            <Button onClick={() => setPostModal(true)}>Add Post</Button>
          </ButtonWrapper>
        )}
        <PostsContainer>
          {listOfPosts ? (
            listOfPosts.map((item: any, index: number) => {
              const findPostLikes = postLikes?.find(
                (postLike) => postLike.postId === item.id
              );
              const userLike = userLikes?.find((userLike: any) =>
                findPostLikes?.likes?.some(
                  (postLike: any) => postLike.id === userLike.id
                )
              );
              return (
                <RedditCard
                  key={index}
                  postId={item.id}
                  content={item.content}
                  title={item.title}
                  creator={`${item?.creator?.firstName} ${item?.creator?.lastName}`}
                  subforum={
                    listOfSubforums?.find((subforum: any) =>
                      subforum?.posts?.some(
                        (item2: any) => item2?.id === item?.id
                      )
                    )?.name ?? ""
                  }
                  isLikedPost={!!userLike}
                  likes={findPostLikes?.likes.length ?? 0}
                  userLikeId={userLike?.id ?? null}
                />
              );
            })
          ) : (
            <div>No Posts</div>
          )}
        </PostsContainer>
      </MainWrapper>
    </>
  );
}
