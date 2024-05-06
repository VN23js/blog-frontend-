import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  messageTimerId: null
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    // это функция, которая используется в библиотеке redux-toolkit для отклонения запроса асинхронного действия с предоставленным значением.
    if (!password || !username) {
      return rejectWithValue({
        message: "Заполните все поля! "
      });
    }

    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    if (!password || !username) {
      return rejectWithValue({
        message: "Заполните все поля!"
      });
    }
    try {
      const { data } = await axios.post("/auth/login", {
        //запрос
        username,
        password
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/loginUser2", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.username;
        state.token = action.payload.token;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = action.payload.message;
        state.isLoading = false;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.username;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = action.payload.message;
        state.isLoading = false;
      })
      // getME user  auth
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = null;
        state.user = action.payload?.username;
        state.token = action.payload?.token;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = action.payload.message;
        state.isLoading = false;
      });
  }
});

export const checkIsAuth = (state) => Boolean(state.auth.token);
export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const isLoading = (state) => state.loading;
