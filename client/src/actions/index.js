import * as types from "../constants/ActionTypes";
import {
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST
} from "../constants/AuthConstants";
export const setAuth = (payload) => ({
  type: types.SET_AUTH,
  payload,
});

export const getPostsAction = (payload) => ({
  type: POSTS_LOADED_SUCCESS,
  payload,
});

export const addPostAction = (payload) => ({
  type: ADD_POST,
  payload,
});

export const deletePostAction = (payload) => ({
  type: DELETE_POST,
  payload,
});

export const updatePostAction = (payload) => ({
  type: UPDATE_POST,
  payload,
});

export const findPostAction = (payload) => ({
  type: FIND_POST,
  payload,
});