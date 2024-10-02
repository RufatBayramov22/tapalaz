import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({  params }) => {
    const res = await apiRequest("posts/" + params.id);
    return res.data;
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts");
  return defer({
    postResponse: postPromise,
  });
};
export const profilePageLoader = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  const postPromise = apiRequest(`users/profilePosts`);
  return defer({
    postResponse: postPromise,
  });
};



export const postLoader = async ({ params }) => {
  try {
    const res = await apiRequest.get(`/posts/${params.id}`);
    console.log("API'den dönen veri:", res.data); // Gelen veriyi kontrol edin
    return { post: res.data, error: null };
  } catch (error) {
    console.error("Error loading post:", error);
    return { post: null, error: "Post not found" };
  }
};


