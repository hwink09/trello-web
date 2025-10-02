import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'

// Khơi tạo giá trị của một cái Slice trong Redux
const initialState = {
  currentUser: null
}

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const res = await authorizeAxiosInstance.post(
      `${API_ROOT}/v1/users/login`,
      data
    )
    // axios sẽ trả kết quả về qua property của nó là data
    return res.data
  }
)

// Khởi tạo một cái Slice trong kho lưu trữ - Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {},
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

// Actions: Là nơi dành cho các Components bên dưới gọi bằng dispatch() tới nó để cặp nhật lại dữ liệu thông qua reducer(chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái action này đơn giản là được thằng redux tạo tự động theo tên của reducer

// export const {  } = userSlice.actions

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho Redux store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
