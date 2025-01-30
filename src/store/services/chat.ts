// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../../model/response";
import { IChat } from "../../model/chat";

// Define a service using a base URL and expected endpoints
export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4000/",
  }),
  endpoints: (builder) => ({
    getAllChats: builder.query<IResponse<IChat[]>, string>({
      query: (login) => ({
        url: "get_user_chat",
        method: "GET",
        params: { login },
      }),
    }),
    createChat: builder.mutation({
      query: (userLogins: string[]) => ({
        url: "create_chat",
        method: "POST",
        // params: { email: loginRequest.email },
        body: userLogins,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateChatMutation,
  useGetAllChatsQuery,
  useLazyGetAllChatsQuery,
} = chatApi;
