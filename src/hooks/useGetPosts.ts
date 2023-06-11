import { useQuery } from "react-query";
import { fetchPosts } from "../api/fetchPosts";

export const useGetPosts = () => {
  const { data: posts } = useQuery({
    queryKey: ["fetch-posts"],
    queryFn: () => fetchPosts(),
  });
  console.log("posts hook: ", posts);
};
