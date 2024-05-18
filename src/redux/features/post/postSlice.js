import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  postId: null,
  comments: [],
  createdAt: null,
  imgUrl: null,
  title: null,
  text: null,
  views: null,
  author: null,
  username: null,
  _id: [],
  popularPosts: [],
  loading: false,
  error: null,
  status: null,
  message: null,
  loading2: false
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

export const getByIdPost = createAsyncThunk(
  "post/getIdPost",
  async (params) => {
    try {
      const { data } = await axios.get(`/posts/${params}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteByIdPost = createAsyncThunk(
  "post/deleteByIdPost",
  async (id) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`, id);
      return data;
    } catch (error) {}
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (updatePost) => {
    try {
      const { data } = await axios.put(`/posts/${updatePost.id}`, updatePost);
      return data;
    } catch (error) {}
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`comments/${postId}`, {
        postId,
        comment
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (postId) => {
    try {
      const { data } = await axios.get(`posts/comments/${postId}`);
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
        state.status = action.payload.message;
        state.posts.push(
          action.payload.newPostWithImage || action.payload.newPostWithoutImage
        );
        const postId =
          action.payload.newPostWithImage?._id ||
          action.payload.newPostWithoutImage?._id;
        state.postId = postId;
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
        const postPopular = action.payload.popularPosts;
        state.popularPosts = postPopular;
        action.postPopular = state.popularPosts;
        console.log(postPopular, "postPopular");

        console.log((state.popularPosts = action.payload.popularPosts));
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.loading = false;
        state.status = null;
      })
      //Get post byID
      .addCase(getByIdPost.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(getByIdPost.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message; // Получение сообщения из ответа сервера
        state.username = action.payload.username;
        //    state.comments = action.payload.comments;//////////////////////////////// dont use here
        state.imgUrl = action.payload.imgUrl;
        state.title = action.payload.title;
        state.text = action.payload.text;
        state.views = action.payload.views;
        state.createdAt = action.payload.createdAt;
        state.author = action.payload.author;
      })
      .addCase(getByIdPost.rejected, (state) => {
        state.loading = false;
        state.status = null;
      })
      //Delete byIDPost
      .addCase(deleteByIdPost.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(deleteByIdPost.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message; // Получение сообщения из ответа сервера
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deleteByIdPost.rejected, (state) => {
        state.loading = false;
        state.status = null;
      })
      //Edit byIDPost
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message; // Получение сообщения из ответа сервера
      })
      .addCase(updatePost.rejected, (state) => {
        state.loading = false;
        state.status = null;
      })
      /////comments
      .addCase(createComment.pending, (state) => {
        state.loading2 = true;
        state.status = null;
      })

      .addCase(createComment.fulfilled, (state, action) => {
        state.loading2 = false;
        state.status = action.payload.message;
        state.comments.push(action.payload);
      })

      .addCase(createComment.rejected, (state) => {
        state.loading2 = false;
        state.status = null;
      })
      //Get comments
      .addCase(getComment.pending, (state) => {
        state.loading2 = true;
        state.status = null;
      })

      .addCase(getComment.fulfilled, (state, action) => {
        state.loading2 = false;
        state.status = action.payload.message;
        state.comments = action.payload;
        console.log("Comments in Redux state:", state.comments);
      })

      .addCase(getComment.rejected, (state) => {
        state.loading2 = false;
      });
  }
});

export const selectPostId = (state) => state.post.postId;
export const { clear } = postSlice.actions;
export default postSlice.reducer;
