import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";
import { pokemonApi } from "./services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./slices/user";
import { userApi } from "./services/user";
import { errorSlice } from "./slices/error";
import { messageApi } from "./services/message";
import { chatApi } from "./services/chat";

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [errorSlice.name]: errorSlice.reducer,

    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pokemonApi.middleware,
      userApi.middleware,
      chatApi.middleware,
      messageApi.middleware
    ),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
