// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../model/user";
import { IResponse } from "../../model/response";
import { setUser, userSlice } from "../slices/user";
import { addError } from "../slices/error";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4000/",
  }),
  endpoints: (build) => ({
    login: build.mutation<IResponse<IUser>, IUser>({
      query: (loginRequest) => ({
        url: "login",
        method: "POST",
        // params: { email: loginRequest.email },
        body: loginRequest,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.code === 0 && data.data !== undefined) {
            dispatch(userSlice.actions.setUser(data.data));
          } else {
            dispatch(
              addError({
                text: "Неправильный формат логина.",
                description: "Попробуйте сделать более уникальный логин!",
              })
            );
          }
        } catch (error) {
          console.error("Something was wrong: ", error);
        }
      },
    }),
    logout: build.mutation<IResponse<null>, string>({
      query: (login) => ({
        url: "logout",
        method: "POST",
        body: { login },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.code ===0 ) {
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
