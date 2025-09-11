import axios from "axios";
import { API_ROOT } from "~/utils/constants";

/**
 * Tất cả function bên dưới sẽ chỉ request và lấy data luôn, mà không có try catchhay then catch gì để bắt lỗi
 * Lí do vì ở Front-end không cần thiết làm như vậy đối với mọi request và bởi nó sẽ gây ra việc dư thừa code catch lõi quá nhiều
 * Giải pháp clean code gọn gàng là sẽ catch lỗi tập trung tại một nơi bằng cách vận dụng Intercaptors
 * Hiểu đơn giản Intercaptors là cách mà chúng ta đánh chặn vào giữa request hoặc response để xử lí logic mà chúng ta muốn
 */

/** Boards */
export const fetchBoardDetailsAPI = async (boardId) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  // axios sẽ trả kết quả về qua property của nó là data
  return res.data;
};

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return res.data;
};

/** Cards */
export const createNewCardAPI = async (newCardData) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return res.data;
};
