import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";
import { IMessage } from "../../types/message";

const socket = io("wss://127.0.0.1:8080/ws");

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getMessage: builder.query<IMessage[], void>({
      query: () => "getMessage",
    }),
    sendMessage: builder.mutation({
      // Определяем функцию, которая будет отправлять сообщение на сервер
      query: (message: IMessage) => {
        // Отправляем сообщение через сокет
        socket.emit("sendMessage", { message });
      },
      // Необязательный колбэк-функция, которая вызывается после успешной отправки сообщения
      onQueryStarted: () => {
        console.log("Sending message...");
      },
    }),
  }),
});

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("newMessage", (data) => {
  messageApi.endpoints.getMessage.invalidate(); // Обновляем данные RTK Query при получении новых сообщений
});

export const { useGetMessageQuery, useLazyGetMessageQuery,useSendMessageMutation } = messageApi;
