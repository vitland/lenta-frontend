import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
import { BASE_URL } from "../../utils/consts"

const initialState = {
  user: null,
  isLogin: false,
  error: "",
}
export const logInuser = createAsyncThunk(
  "user/login",
  async ({ email, password }: any) => {
    const response = await axios.post(`${BASE_URL}/api/auth/token/login/`,)
    return response.data
  },
)
export const logOutuser = createAsyncThunk(
  "user/logout",
  async ({ email, password }: any) => {
    const response = await axios.post(`${BASE_URL}/api/auth/token/logout/`, {
      email,
      password
    })
    return response.data
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
      .addCase(logInuser.pending, (state, action) => {
        state.isLogin = false
      })
      .addCase(logInuser.fulfilled, (state, action) => {
        state.isLogin = true
      })
      .addCase(logInuser.rejected, (state, action) => {
        state.isLogin = false
        state.error = action.error.message
      })

      .addCase(logOutuser.pending, (state, action) => {
        state.isLogin = true
      })
      .addCase(logOutuser.fulfilled, (state, action) => {
        state.isLogin = false

      })
      .addCase(logOutuser.rejected, (state, action) => {
        state.isLogin = false
        state.error = action.error.message
      })
  },
})
export const getUser = (state: RootState) =>
  state.user.user

export default userSlice.reducer
