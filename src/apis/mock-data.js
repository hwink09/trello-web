export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'Hwink MERN Stack Board',
    description: 'Pro MERN stack Course',
    type: 'public', // 'private'
    ownerIds: [], // Những users là Admin của board
    memberIds: [], // Những users là member bình thường của board
    columnOrderIds: [
      'column-id-01',
      'column-id-02',
      'column-id-03',
      'column-id-04'
    ], // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-01',
        title: 'To Do Column 01',
        cardOrderIds: [
          'card-id-01',
          'card-id-02',
          'card-id-03',
          'card-id-04',
          'card-id-05',
          'card-id-06',
          'card-id-07'
        ],
        cards: [
          {
            _id: 'card-id-01',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 01',
            description: 'Markdown Syntax (sẽ ở khóa nâng cao nhé)',
            cover:
              'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/484774516_1812310886286635_2228981112631681889_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=3t1jOwjsE70Q7kNvwEQ2aJ5&_nc_oc=Adldr7cm_NfYb3w6LoXZKXuVhakAM4hhbV0be4pMVay0rNvCeT9iJoaE-OMrqjG5Ep8&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=l1XcLfheGecRTfSzI6P_fQ&oh=00_AfWPG7VihcE4MY05VMCVd8OKE72URWoLocGnLV3608z1Jw&oe=689B7EDF',
            memberIds: ['test-user-id-01'],
            comments: ['test comment 01', 'test comment 02'],
            attachments: [
              'test attachment 01',
              'test attachment 02',
              'test attachment 03'
            ]
          },
          {
            _id: 'card-id-02',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 02',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-03',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 03',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-04',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 04',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-05',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 05',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-06',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 06',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-07',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 07',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-02',
        boardId: 'board-id-01',
        title: 'Inprogress Column 02',
        cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
        cards: [
          {
            _id: 'card-id-08',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'Title of card 08',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-09',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'Title of card 09',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-10',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'Title of card 10',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-01',
        title: 'Done Column 03',
        cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13'],
        cards: [
          {
            _id: 'card-id-11',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Title of card 11',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-12',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Title of card 12',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-13',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Title of card 13',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-04',
        boardId: 'board-id-01',
        title: 'Empty Column 04',
        /**  Xử lí bug thư viện dnd-kit khi column là rỗng:
         * Phía FE sẽ tạo ra một card đặc biệt: Placeholder Card, không liên quan tới BE
         * Card này sẽ được ẩn ở giao diện UI người dùng
         * Cấu trúc Id của cái card này để Unique rất đơn giản, không cần phải làm random phức tạp
         * 'columnId-placeholder-card' (mỗi column sẽ có một card placeholder riêng)
         * Quan trọng khi tạo phải đầy đủ (_id, boardId, columnId, FE_PlaceholderCard)
         *** Kỹ hơn nữa về cách tạo chuẩn ở bước nào thì ở phần tích hợp API BE vào dự án
         */
        cardOrderIds: ['column-id-04-placeholder-card'],
        cards: [
          {
            _id: 'column-id-04-placeholder-card',
            boardId: 'board-id-01',
            columnId: 'column-id-04',
            FE_PlaceholderCard: true
          }
        ]
      }
    ]
  }
}
