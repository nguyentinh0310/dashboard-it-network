import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postApi } from "api/post-api";
import { IPost } from "models";

export const fetchListPost: any = createAsyncThunk("post/fetch", async () => {
  const data = await postApi.getAll();
  return data;
});


export const fetchPostsLimit: any = createAsyncThunk("post-limit/fetch", async () => {
  const data = await postApi.getPosts();
  return data;
});

export interface PostsState {
  posts: IPost[];
  totalPost: number;
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  totalPost: 0,
  loading: false,
};

const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListPost.pending]: (state) => {
      state.loading = true;
    },
    [fetchListPost.fulfilled]: (state, action: PayloadAction<any>) => {
      state.posts = action.payload.data;
      state.totalPost = action.payload.totalRows;
      state.loading = false;
    },
    [fetchPostsLimit.fulfilled]: (state, action: PayloadAction<any>) => {
      state.posts = action.payload.data;
      state.totalPost = action.payload.totalRows;
      state.loading = false;
    },
    [fetchListPost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// export const {} = PostSlice.actions;
const PostReducer = PostSlice.reducer;

export default PostReducer;
