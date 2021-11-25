import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { post } from "../reducers/post";
import { apiUrl, POSTS_LOADED_FAIL } from "../constants/AuthConstants";
import { getPostsAction, addPostAction, deletePostAction, updatePostAction, findPostAction } from "../actions";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //Set State Open - Close Modal
  const [showModal, setShowModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);


  //State Toast
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //initialState
  const [postInitialState, dispatch] = useReducer(post, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  // Get all post
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        // console.log("test getPost PostContext: ", response.data.posts);
        dispatch(getPostsAction(response.data.posts));
      }
    } catch (error) {
      // console.log("test getPost PostContext: false");

      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // Add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch(addPostAction(response.data.post));
        // trả về post mới và success
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) dispatch(deletePostAction(postId));
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user updating posts
  const findPost = postId => {
    const post = postInitialState.posts.find(post => post._id ===postId)
    dispatch(findPostAction(post))
  }

  // Update post
  const updatePost = async updatedPost => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost)
      if(response.data.success){
        dispatch(updatePostAction(response.data.post))
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }

  // xuất post state
  const postContextData = {
    postInitialState,
    getPosts,
    addPost,
    showModal,
    setShowModal,
    showUpdateModal,
    setShowUpdateModal,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
