import authReducer from "features/auth/authSlice";
import { history } from "utils";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import alertReducer from "./alertSlice";
import notificationReducer from "./notificationSlice";
import PostReducer from "./postSlice";
import conversationReducer from "./conversationSlice";
import CommentReducer from "./commentSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  user: userReducer,
  notification: notificationReducer,
  alert: alertReducer,
  post: PostReducer,
  conversation: conversationReducer,
  comment: CommentReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
});

export const persistor = persistStore(store);

export default store;

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
