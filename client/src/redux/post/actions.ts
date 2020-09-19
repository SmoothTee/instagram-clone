import { clientFetch } from "../../utils/clientFetch";
import { User } from "../auth/types";
import { AppThunk } from "../types";
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  READ_POSTS_FAILURE,
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
} from "./constants";
import { PostActionTypes, Post, PostMedia, PostComment } from "./types";

const createPostRequest = (): PostActionTypes => ({
  type: CREATE_POST_REQUEST,
});

const createPostSuccess = (): PostActionTypes => ({
  type: CREATE_POST_SUCCESS,
});

const createPostFailure = (error?: any): PostActionTypes => ({
  type: CREATE_POST_FAILURE,
  error,
});

const readPostsRequest = (): PostActionTypes => ({
  type: READ_POSTS_REQUEST,
});

const readPostsSuccess = (data: {
  posts: Post[];
  users: User[];
  postMedia: PostMedia[];
  comments: PostComment[];
}): PostActionTypes => ({
  type: READ_POSTS_SUCCESS,
  posts: data.posts,
  users: data.users,
  postMedia: data.postMedia,
  comments: data.comments,
});

const readPostsFailure = (error: any) => ({
  type: READ_POSTS_FAILURE,
  error,
});

export const createPostAction = (formData: FormData): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(createPostRequest());
    const { success, res } = await clientFetch(
      "/api/post",
      {
        body: formData,
      },
      true
    );
    if (success) {
      dispatch(createPostSuccess());
    } else {
      dispatch(createPostFailure());
    }
  } catch (err) {
    dispatch(createPostFailure(`Failed to create post: ${err}`));
  }
};

export const readPostsAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(readPostsRequest());
    const { success, res } = await clientFetch("/api/post");
    if (success) {
      dispatch(readPostsSuccess(res));
    } else {
      dispatch(readPostsFailure(res));
    }
  } catch (err) {
    dispatch(readPostsFailure(`Failed to read posts: ${err}`));
  }
};