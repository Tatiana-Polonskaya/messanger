// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../model/user";
import { IResponse } from "../../model/response";
import { setUser } from "../slices/user";
import { addError } from "../slices/error";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/",
  }),
  endpoints: (build) => ({
    login: build.mutation<IResponse<undefined>, IUser>({
      query: (loginRequest) => ({
        url: "users",
        method: "POST",
        // params: { email: loginRequest.email },
        body: loginRequest,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //   console.log("data", data, arg);

          if (data.success) {
            dispatch(setUser(arg));
          } else {
            dispatch(
              addError({
                text: "Этот логин уже занят.",
                description: "Попробуйте сделать более уникальный логин!",
              })
            );
          }
        } catch (error) {
          console.error("Something was wrong: ", error);
        }
      },
    }),
    logout: build.query<IResponse<null>, string>({
      query: (login) => ({
        url: "users",
        method: "DELETE",
        body: { login: login },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(setUser({ login: "", password: "" }));
          }
        } catch (error) {
          console.error("Something was wrong: ", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutQuery } = userApi;
