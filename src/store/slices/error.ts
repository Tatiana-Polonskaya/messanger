import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IError } from "../../types/error";

export interface IErrorState {
  queue: IError[];
}

const initialState: IErrorState = {
  queue: [],
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<Omit<IError, "id">>) => {
      state.queue.push({
        id: uuidv4(),
        text: action.payload.text,
        description: action.payload.description,
      });
    },
    deleteError: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((el) => el.id !== action.payload);
    },
    clearAllError: (state) => {
      state.queue = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addError, clearAllError, deleteError } = errorSlice.actions;

export default errorSlice.reducer;
