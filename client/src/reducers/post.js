import * as types from "../constants/AuthConstants";

export const post = (state, action) => {
  // const {type, payload} = action
  switch (action.type) {
    case types.POSTS_LOADED_SUCCESS:
      // console.log("Get posts success: prev state", state);
      let newState = {
        ...state,
        postsLoading: false,
        posts: action.payload,
      };
      // console.log("Get posts success: new state", newState);

      return { ...newState };
    case types.POSTS_LOADED_FAIL:
      // console.log("Get posts fail", action.payload);

      return {
        ...state,
        postsLoading: false,
        posts: [],
      };
    case types.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case types.DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.payload)],
      };
    case types.FIND_POST:
      return {
        ...state,
        post: action.payload,
      };
    case types.UPDATE_POST:
      let newPosts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      return { ...state, posts: newPosts };
    default:
      return state;
  }
};
