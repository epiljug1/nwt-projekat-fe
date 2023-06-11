import api from "../config/api";

export async function fetchPosts() {
  const data = await api.get("/administration/administration/posts");

  // const results: any = [];

  // await data.data.map(async (item: any) => {
  //   const { data: comData } = await api.get(
  //     "/postcom/post-com/comments-for-post/" + item.id
  //   );
  //   const { data: likesData } = await api.get(
  //     "/postcom/post-com/likes-for-post/" + item.id
  //   );
  //   console.log("likes");
  //   const newItem = {
  //     ...item,
  //     comments: comData,
  //     likes: likesData,
  //   };
  //   results.push(newItem);
  //   return newItem;
  // });

  // // console.log("POST FETCH: ", data.data);
  // console.log("RESULTS: ", results);

  return data.data;
}
