import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { conversationsApi } from "api/coversation-api";
import { IConversation } from "models";

export const fetchListConversation: any = createAsyncThunk("conversation/fetch", async () => {
  const data = await conversationsApi.getAll();
  console.log(data)
  return data;
});

export interface ConversationState {
  conversation: IConversation[];
  totalConv: number;
  loading: boolean;
}

const initialState: ConversationState = {
  conversation: [],
  totalConv: 0,
  loading: false,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListConversation.pending]: (state) => {
      state.loading = true;
    },
    [fetchListConversation.fulfilled]: (state, action: PayloadAction<any>) => {
      state.conversation = action.payload.data;
      state.totalConv = action.payload.totalRows;
      console.log(action.payload)
      state.loading = false;
    },
    [fetchListConversation.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// export const {} = conversationlice.actions;
const conversationReducer = conversationSlice.reducer;

export default conversationReducer;
