import { createSlice } from '@reduxjs/toolkit'

// Khỏi tạo giá trị của một slice trong redux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

// Khơi tạo một Slice trong kho lưu trữ - redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Reducers: Nơi xử lí dữ liệu đồng bộ
  reducers: {
    // Lưu ý ở đây cần cặp ngoặc nhọn {} cho fuction trong reducer cho dù code bên trong chỉ có 1 dòng - rule của redux
    showModalActiveCard: (state) => { state.isShowModalActiveCard = true },

    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    },
    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload
      state.currentActiveCard = fullCard
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => { }
})

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các components bên dưới gọi bằng ditpatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const {
  clearAndHideCurrentActiveCard,
  updateCurrentActiveCard,
  showModalActiveCard
} = activeCardSlice.actions

// Selector: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ state của redux store
export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard
export const selectIsShowModalActiveCard = (state) => state.activeCard.isShowModalActiveCard

// File tên acticeCardSlice NHƯNG mình sẽ export một thứ tên là Reducer

// export default activeCardSlice.reducer
export const activeCardReducer = activeCardSlice.reducer

