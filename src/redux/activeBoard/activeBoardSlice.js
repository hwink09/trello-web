import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROOT } from "~/utils/constants";
import { mapOrder } from "~/utils/sorts";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";

// Khơi tạo giá trị của một cái Slice trong Redux
const initialState = {
  currentActiveBoard: null,
};

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchBoardDetailsAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailsAPI",
  async (boardId) => {
    const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
    // axios sẽ trả kết quả về qua property của nó là data
    return res.data;
  }
);

// Khởi tạo một cái Slice trong kho lưu trữ - Redux Store
export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    // Lưu ý ở đây luôn luôn cần một cặp ngoặc nhọn {} cho func trong reducer cho dù code bên trong chỉ có một dòng, đây là rule của Redux
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer (ở đây gán ra một biến có nghĩa hơn)
      const board = action.payload;

      // Xử lý dữ liệu nếu cần thiết
      // ...

      // Update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board;
    },
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây là res.data trả về ở trên
      let board = action.payload;

      // Sắp xếp thứ tự các column ở đây luôn trước khi đưa xuống bên dưới
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

      // xử lí vấn đề kéo vào một column rỗng
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });

      // Update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board;
    });
  },
});

// Actions: Là nơi dành cho các Components bên dưới gọi bằng dispatch() tới nó để cặp nhật lại dữ liệu thông qua reducer(chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái action này đơn giản là được thằng redux tạo tự động theo tên của reducer
export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho Redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

// Cái file tên là activeBoardSlice NHƯNG mình sẽ export một thứ mới tên là Reducer
// export default activeBoardSlice.reducer;
export const activeBoardReducer = activeBoardSlice.reducer;
