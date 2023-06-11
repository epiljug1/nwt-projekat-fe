import React, { useState } from "react";
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

const POSTS: any = [
  {
    title: "Naslov",
    content: "Content",
    likes: 10,
    comments: 10,
  },
  {
    title: "Naslov",
    content: "Content",
    likes: 10,
    comments: 10,
  },
  {
    title: "Naslov",
    content: "Content",
    likes: 10,
    comments: 10,
  },
  {
    title: "Naslov",
    content: "Content",
    likes: 10,
    comments: 10,
  },
  {
    title: "Naslov",
    content: "Content",
    likes: 10,
    comments: 10,
  },
];

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
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* margin-left: 10px; */

  height: 700px;
  overflow: auto;

  border-radius: 10px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  padding-right: 10px;
  padding-left: 10px;
`;

const SubforumButton = styled.button`
  border-radius: 10px;
  padding: 10px 50px;
  font-style: italic;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    background-color: #fff;
  }
`;

export default function Home() {
  const [subforumModal, setSubforumModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const userId = localStorage.getItem("userId");

  useGetPosts();

  const { data: listOfPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return fetchPosts();
    },
  });

  const { data: listOfSubforums } = useQuery({
    queryKey: ["subforums"],
    queryFn: () => {
      return fetchSubforums();
    },
  });

  if (listOfPosts) {
    console.log("listOfPosts: ", listOfPosts);
  }

  return (
    <>
      <Navbar />
      <SubforumWrapper>
        <h2>Subforums</h2>
        {listOfSubforums ? (
          listOfSubforums.map((item: any, index: number) => (
            <SubforumButton key={index}>{item.name}</SubforumButton>
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
          {/* {POSTS.map((item: any) => {
            return <RedditCard key={Math.random()} {...item} />;
          })} */}
          {listOfPosts ? (
            listOfPosts.map((item: any, index: number) => {
              return (
                <RedditCard
                  key={index}
                  content={item.content}
                  title={item.title}
                  likes={0}
                  comments={0}
                  creator={`${item?.creator?.firstName} ${item?.creator?.lastName}`}
                  subforum={
                    listOfSubforums.find((subforum: any) =>
                      subforum.posts.some((item2: any) => item2.id === item.id)
                    )?.name ?? ""
                  }
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
