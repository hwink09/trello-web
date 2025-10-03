import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'
import { refreshTokenAPI } from '~/apis'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'

/**
 * không thể import ( store ) form '~/redux/store' theo cách thông thường ở đây
 * Giải pháp: Inject store: đây là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component như gile authorize hiện tại
 * Hiểu đơn giản: Khi ứng dụng bắt đầu chạy, code sẽ chạy vào main.jsx đầu tiên, từ bên đó ta sẽ gọi hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này
 */

let axiosReduxStore

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

// Khởi tạo một đối tượng Axios (authorizeAxiosInstance) mục đích để custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()
// Thời gian chờ tối đa của một request: để 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: sẽ cho phép axios tự dộng gửi cookie trong mỗi lần request lên BE (phục vụ việc lưu JWT tokens (refresh và access) vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

/**
 * Cấu hình Interceptors (Bộ đánh chặn vào giữa mọi Request và Response)
 *  https://axios-http.com/docs/interceptors
 */
// Interceptor Request: can thiệp vào giữa những cái request API
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Khởi tạo một promise để gọi api refresh token
// Mục đích để khi nào gọi api refresh_token xong thì mới retry lại nhiều api bị lỗi trước đó
let refreshTokenPromise = null

// Interceptor Response: can thiệp vào giữa những cái response nhận về
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    interceptorLoadingElements(false)
    // TH1: Nếu nhận mã 410 từ BE, thì gọi đến API logout luôn
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }
    // TH2: Nếu nhận mã 401 từ BE => gọi API refresh token để làm mới lại accessToken
    // Đầu tiền lấy được các request API đang bị lỗi thông qua error.config
    const originalRequests = error.config
    console.log('🚀 ~ originalRequests:', originalRequests)

    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true

      // gọi api refresh token đồng thời gán vào refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            // đồng thời accessToken đã nằm trong httpOnly cookie (xử lí từ phía BE)
            return data?.accessToken
          })
          .catch((_error) => {
            // Nếu nhận bất kì lỗi nào từ api refresh token thì logout luôn
            axiosReduxStore.dispatch(logoutUserAPI(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            // dù api có ok hay lỗi thì vẫn luôn gán lại cái refreshTokenPromise về null như ban đầu
            refreshTokenPromise = null
          })
      }

      // cần return trường hợp refreshTokenPromise chạy thành công và xử lí thêm ở đây:
      return refreshTokenPromise.then((accessToken) => {
        /**
         * B1: Đối với trường hợp dự án cần lưu accessToken vào localStorage hoặc đâu đó thì sẽ viết thêm code xử lí ở đây
         * Hiện tại ở đây không cần bước 1 này vì mình đã đưa accessToken vào cookie (xử lí từ BE) sau khi api refreshToken được gọi thành công
         */

        // B2: (QUAN TRỌNG) Return lại axios instance của chúng ta kết hợp các originalRequests để gọi lại những api ban đầu bị lỗi
        return authorizeAxiosInstance(originalRequests)
      })
    }

    // Xử lí tập trung phần hiển thị thông báo lỗi trả về từ mọi API (viết 1 lần: Clean Code)
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    //Dùng toastify để hiển thị bất kì mọi mã lỗi lên màn hình - Ngoại trừ mã 410 - Gone phục vụ việc tự động refresh lại token
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
