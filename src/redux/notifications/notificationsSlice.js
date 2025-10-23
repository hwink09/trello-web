import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Khởi tạo giá trị của một Slice trong Redux
const initialState = {
  currentNotifications: null
}

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng createAsyncThunk đi kèm với extraReducers

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const res = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return res.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const res = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return res.data
  }
)

// Khởi tạo một Slice trong Redux
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    // Thêm một thông báo mới vào currentNotifications
    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      // unshift() để thêm vào đầu mảng
      state.currentNotifications.unshift(incomingInvitation)
    }
  },

  // Extra reducers để xử lí các hành động bất đồng bộ (gọi API)
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      // Đảo ngược lại mảng invitation để hiện thông báo mới nhất lên đầu
      state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload
      // Cập nhật lại dữ liệu boardInvitation trong currentNotifications
      const getInvitation = state.currentNotifications.find(i => i._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

// Action creators được tạo tự động dựa trên reducers đã khai báo
export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationsSlice.actions

// Selector để lấy dữ liệu từ Redux store
export const selectCurrentNotifications = (state) => state.notifications.currentNotifications

export const notificationsReducer = notificationsSlice.reducer