import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commentApi } from "api/comment-api";
import { IComment } from "models";

export const fetchListComment: any = createAsyncThunk("comment/fetch", async () => {
  const data = await commentApi.getAll();
  return data;
});

export interface CommentsState {
  comments: IComment[];
  totalCmt: number;
  loading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  totalCmt: 0,
  loading: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListComment.pending]: (state) => {
      state.loading = true;
    },
    [fetchListComment.fulfilled]: (state, action: PayloadAction<any>) => {
      state.comments = action.payload.data;
      state.totalCmt = action.payload.totalRows;
      state.loading = false;
    },
    [fetchListComment.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// export const {} = commentSlice.actions;
const CommentReducer = commentSlice.reducer;

export default CommentReducer;
