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

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

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

        state.status = action.payload.message; // Получение сообщения из ответа сервера
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.loading = false;
        state.status = null;
      }) ////////////////////////////////
      //Get the posts
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message; // Получение сообщения из ответа сервера
        state.posts = action.payload.posts;
        state.popularPosts = action.payload.popularPosts;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.loading = false;
        state.status = null;
      });
  }
});
export const { clear } = postSlice.actions;
export default postSlice.reducer;
