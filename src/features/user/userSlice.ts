import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"
import { ApiRoutes } from "../../utils/consts"
import { UserState } from "../../types/types"
const initialState: UserState = {
  user: null,
  isLogin: false,
  error: "",
}

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({id}: any) => {
    const response = await axios.get<User[]>(`${BASE_URL}${ApiRoutes.GET_USER}`);

    const user = response.data.find((user) => user?.id === id)
    return user
  },
)

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: any) => {
    try {
      const response = await axios.post(`${BASE_URL}${ApiRoutes.LOGIN}`, {
        email,
        password
      })
      localStorage.setItem('userId', response.data?.user?.id)
      return response.data
    } catch (error: any) {
      return error.message
    }

  },
)
export const logoutUser = createAsyncThunk(
  "user/logout",
  async ({email, password}: any) => {
    try {
      const response = await axios.post(`${BASE_URL}${ApiRoutes.LOGOUT}`,)
      return response.data
    } catch (error: any) {
      return error.mesage
    }

  },
)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state, action) => {

    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLogin = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogin = true
        state.user = action.payload.data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLogin = false
        state.error = action.error.message
      })

      .addCase(logoutUser.pending, (state, action) => {
        state.isLogin = true
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLogin = false

      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLogin = false
        state.error = action.error.message
      })

      .addCase(getUser.pending, (state, action) => {
        state.isLogin = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLogin = false
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLogin = false
        state.error = action.error.message
      })
  },
})
export const getCurrentUser = (state: RootState) =>
  state.user.user

export default userSlice.reducer
