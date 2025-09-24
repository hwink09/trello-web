export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/**  Xử lí bug thư viện dnd-kit khi column là rỗng:
 * Phía FE sẽ tạo ra một card đặc biệt: Placeholder Card, không liên quan tới BE
 * Card này sẽ được ẩn ở giao diện UI người dùng
 * Cấu trúc Id của cái card này để Unique rất đơn giản, không cần phải làm random phức tạp
 * 'columnId-placeholder-card' (mỗi column sẽ có một card placeholder riêng)
 * Quan trọng khi tạo phải đầy đủ (_id, boardId, columnId, FE_PlaceholderCard)
 *** Kỹ hơn nữa về cách tạo chuẩn ở bước nào thì ở phần tích hợp API BE vào dự án
 */
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
