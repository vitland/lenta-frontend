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
  async ({ email, password }: any) => {
    const response = await axios.post(`${BASE_URL}${ApiRoutes.GET_USER}`, {
      email,
      password
    })
    return response.data
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
      return response.data
    } catch (error: any) {
      return error.message
    }

  },
)
export const logoutUser = createAsyncThunk(
  "user/logout",
  async ({ email, password }: any) => {
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
  },
})
export const getCurrentUser = (state: RootState) =>
  state.user.user

export default userSlice.reducer
