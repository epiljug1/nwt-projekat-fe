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
import { fetchSubforumPosts } from "../api/fetchSubforumPosts";
import { FcSearch } from "react-icons/fc";

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
  width: 250px;
  position: fixed;
  top: 64px;
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

const SubforumSearch = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
`;

const SearchContainer = styled.div<{ hasUser?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 190px;

  margin-left: ${(props) => (props?.hasUser ? "15px" : 0)};
`;

const SearchIcon = styled(FcSearch)`
  position: absolute;
  scale: 1.1;
  left: 8px;
`;

const Search = styled.input`
  border-radius: 10px;
  width: 450px;
  height: 30px;
  border: 0;
  padding-left: 35px;

  font-size: 18px;

  border: 1px solid #ccc;
  border-radius: 6px;
`;

const HeadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchPosts, setSearchPosts] = useState("");

  const [subforumModal, setSubforumModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [activeSubforum, setActiveSubforum] = useState(0);

  const userId = localStorage.getItem("userId");
  const subforumId = localStorage.getItem("subforumId");
  const searchPost = localStorage.getItem("searchPost");

  console.log("searchPost: ", searchPost);

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

  const { data: subforumPosts } = useQuery({
    queryKey: ["subforum-posts", activeSubforum],
    queryFn: () => {
      if (subforumId) {
        return fetchSubforumPosts({ subforumId });
      }
    },
    enabled: !!subforumId,
    keepPreviousData: true,
  });

  const postsList = activeSubforum ? subforumPosts : listOfPosts;

  return (
    <>
      <Navbar />
      <SubforumWrapper>
        <h2>Subforums</h2>
        <SubforumSearch
          type="text"
          placeholder="Search subforum..."
          onChange={(value) => setSearch(value.target.value)}
        />
        {listOfSubforums ? (
          listOfSubforums
            .filter((item: any) => {
              if (!search) return true;
              return item.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((item: any, index: number) => (
              <SubforumButton
                active={
                  item.id.toString() === localStorage.getItem("subforumId")
                }
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
        <HeadContainer>
          {!!userId && (
            <ButtonWrapper key={userId}>
              {!activeSubforum && (
                <Button onClick={() => setSubforumModal(true)}>
                  Add Subforum
                </Button>
              )}
              <Button onClick={() => setPostModal(true)}>Add Post</Button>
            </ButtonWrapper>
          )}
          <SearchContainer hasUser={!userId}>
            <SearchIcon />
            <Search
              placeholder="Search post..."
              onChange={(item) => setSearchPosts(item.target.value)}
            />
          </SearchContainer>
        </HeadContainer>
        <PostsContainer>
          {postsList && postsList.length ? (
            postsList
              .filter((post: any) => {
                if (!searchPosts) return true;
                return post.title
                  .toLowerCase()
                  .includes(searchPosts.toLowerCase());
              })
              .map((item: any, index: number) => {
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
            <i style={{ marginTop: "50px" }}>No Posts</i>
          )}
        </PostsContainer>
      </MainWrapper>
    </>
  );
}
