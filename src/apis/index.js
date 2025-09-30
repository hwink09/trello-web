import { toast } from 'react-toastify'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

/**
 * Tất cả function bên dưới sẽ chỉ request và lấy data luôn, mà không có try catchhay then catch gì để bắt lỗi
 * Lí do vì ở Front-end không cần thiết làm như vậy đối với mọi request và bởi nó sẽ gây ra việc dư thừa code catch lõi quá nhiều
 * Giải pháp clean code gọn gàng là sẽ catch lỗi tập trung tại một nơi bằng cách vận dụng Intercaptors
 * Hiểu đơn giản Intercaptors là cách mà chúng ta đánh chặn vào giữa request hoặc response để xử lí logic mà chúng ta muốn
 */

/** Boards */
// Đã move vào Redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//    axios sẽ trả kết quả về qua property của nó là data
//   return res.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const res = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  )
  return res.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const res = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  )
  return res.data
}

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const res = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/columns`,
    newColumnData
  )
  return res.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const res = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  )
  return res.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const res = await authorizeAxiosInstance.delete(
    `${API_ROOT}/v1/columns/${columnId}`
  )
  return res.data
}

/** Cards */
export const createNewCardAPI = async (newCardData) => {
  const res = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/cards`,
    newCardData
  )
  return res.data
}

/** Users */
export const registerUserAPI = async (data) => {
  const res = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/users/register`,
    data
  )
  toast.success(
    'Registration successful! Please check your email to verify your account.',
    { theme: 'colored' }
  )
  return res.data
}

export const verifyUserAPI = async (data) => {
  const res = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/users/verify`,
    data
  )
  toast.success(
    'Account verified! You can now log in to enjoy our services! Have a good day!.',
    { theme: 'colored' }
  )
  return res.data
}
