import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMessage } from "../../types/message";
import { IResponse } from "../../model/response";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:4000/" }),
  endpoints: (builder) => ({
    getAllMessage: builder.query<IResponse<IMessage[]>, string>({
      query: (chatId) => ({
        url: "get_messages",
        method: "GET",
        params: { chat_id: chatId },
      }),
    }),
  }),
});

export const { useGetAllMessageQuery, useLazyGetAllMessageQuery } = messageApi;
