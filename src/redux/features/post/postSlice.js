import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
  error: null,
  status: null
};

export const createPost = createAsyncThunk(
  "post/createPost",

  async (parametr) => {
    try {
      const { data } = await axios.post("/posts", parametr);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    clear: (state) => {
      state.status = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
        state.status = action.payload.message; // Получение сообщения из ответа сервера
      })
      .addCase(createPost.rejected, (state) => {
        state.loading = false;
        state.status.message = null;
      });
  }
});
export const { clear } = postSlice.actions;
export default postSlice.reducer;
