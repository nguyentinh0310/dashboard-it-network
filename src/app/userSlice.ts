import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "models";
import { userApi } from "../api/userApi";

export const fetchListUser: any = createAsyncThunk(
  "user/fetch",
  async (params?: any) => {
    const data = await userApi.getAll(params);
    return data;
  }
);

export const fetchListUserLimit: any = createAsyncThunk(
  "user-limit/fetch",
  async () => {
    const data = await userApi.getUsers();
    return data;
  }
);

export interface UsersState {
  items: IUser[];
  totalRows: number;
  loading: boolean;
}

const initialState: UsersState = {
  items: [],
  totalRows: 0,
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchListUser.fulfilled]: (state, action: PayloadAction<any>) => {
      state.items = action.payload.data;
      state.totalRows = action.payload.totalRows;
      state.loading = false;
    },
    [fetchListUserLimit.fulfilled]: (state, action: PayloadAction<any>) => {
      state.items = action.payload.data;
      state.totalRows = action.payload.totalRows;
      state.loading = false;
    },
    [fetchListUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// export const {} = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
