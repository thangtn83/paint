import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { endStroke } from "../sharedAction";

const initialState: RootState["strokes"] = [];
const strokesSlice = createSlice({
  name: "strokes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { stroke } = action.payload;
      state.push(stroke);
    });
  },
});

export default strokesSlice.reducer;
