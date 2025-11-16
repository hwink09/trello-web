# Trello Clone - MERN Stack Frontend

![Trello Clone](https://img.shields.io/badge/Trello-Clone-0052CC?style=for-the-badge&logo=trello&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-4.3.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-5.13.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)

A modern, feature-rich Trello clone built with the MERN stack. This is the **frontend application** that provides an intuitive kanban board interface for project management and task organization with real-time collaboration features.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Integration](#-api-integration)
- [Key Features Breakdown](#-key-features-breakdown)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

- 🎯 **Drag & Drop Functionality** - Smooth card and column reordering using @dnd-kit
- 👥 **User Authentication** - Secure login, registration, and email verification
- 📊 **Kanban Board Management** - Create, edit, and delete boards, columns, and cards
- 🔄 **Real-time Updates** - Socket.IO integration for live collaboration
- 🎨 **Dark/Light Theme** - Material-UI themed interface with customizable modes
- 💾 **State Persistence** - Redux Persist for maintaining state across sessions
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🔐 **Protected Routes** - Secure routing with authentication guards
- 🔔 **Notifications** - Real-time toast notifications for user actions
- 👤 **User Settings** - Account and security settings management
- 🤝 **Board Collaboration** - Invite users to boards and manage permissions
- ✏️ **Markdown Support** - Rich text editing for card descriptions
- 🔍 **Search Functionality** - Search boards with autocomplete

---

## 🛠️ Tech Stack

### Core Technologies

- **React 18.2.0** - Modern UI library with hooks
- **Vite 4.3.2** - Next-generation frontend tooling
- **Material-UI (MUI) 5.13.0** - Comprehensive React component library
- **Redux Toolkit 2.9.0** - State management with Redux best practices
- **React Router DOM 6.30.1** - Declarative routing for React

### Key Libraries

#### UI & Styling
- `@mui/material` - Material Design components
- `@mui/icons-material` - Material Design icons
- `@emotion/react` & `@emotion/styled` - CSS-in-JS styling

#### Drag & Drop
- `@dnd-kit/core` - Modern drag and drop toolkit
- `@dnd-kit/sortable` - Sortable preset for dnd-kit
- `@dnd-kit/utilities` - Utility functions for dnd-kit

#### State Management
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - Official React bindings for Redux
- `redux-persist` - Persist and rehydrate Redux store

#### API & Real-time
- `axios` - Promise-based HTTP client
- `socket.io-client` - Real-time bidirectional communication

#### Forms & Validation
- `react-hook-form` - Performant form validation

#### Utilities
- `lodash` - JavaScript utility library
- `moment` - Date manipulation library
- `react-toastify` - Toast notifications
- `material-ui-confirm` - Confirmation dialogs
- `@uiw/react-md-editor` - Markdown editor component
- `randomcolor` - Generate random colors

---

## 📁 Project Structure

```
trello-web/
├── public/                      # Static assets
├── src/
│   ├── apis/                    # API service layer
│   │   ├── index.js            # API endpoint definitions
│   │   └── mock-data.js        # Mock data for development
│   │
│   ├── assets/                  # Images, fonts, and other assets
│   │   ├── 404/                # 404 page assets
│   │   └── auth/               # Authentication page assets
│   │
│   ├── components/              # Reusable components
│   │   ├── AppBar/             # Navigation bar
│   │   │   ├── Menus/          # Dropdown menus
│   │   │   ├── Notifications/  # Notification center
│   │   │   └── SearchBoards/   # Board search functionality
│   │   ├── Form/               # Form components
│   │   ├── Loading/            # Loading indicators
│   │   └── Modal/              # Modal dialogs
│   │       └── ActiveCard/     # Card detail modal
│   │
│   ├── customHooks/             # Custom React hooks
│   │   └── useDebounceFn.js    # Debounce hook
│   │
│   ├── customLibs/              # Custom library configurations
│   │   └── DndKitSensors.js    # Drag & drop sensors
│   │
│   ├── pages/                   # Page components
│   │   ├── 404/                # 404 Not Found page
│   │   ├── Auth/               # Authentication pages
│   │   ├── Boards/             # Board management pages
│   │   │   ├── BoardBar/       # Board header bar
│   │   │   └── BoardContent/   # Board content area
│   │   │       └── ListColumns/ # Column and card components
│   │   ├── Settings/           # User settings pages
│   │   └── Users/              # User profile pages
│   │
│   ├── redux/                   # Redux state management
│   │   ├── store.js            # Redux store configuration
│   │   ├── activeBoard/        # Active board slice
│   │   ├── activeCard/         # Active card slice
│   │   ├── notifications/      # Notifications slice
│   │   └── user/               # User authentication slice
│   │
│   ├── utils/                   # Utility functions
│   │   ├── authorizeAxios.js   # Axios interceptors & auth
│   │   ├── constants.js        # Application constants
│   │   ├── formatters.js       # Data formatting utilities
│   │   ├── sorts.js            # Sorting functions
│   │   └── validators.js       # Validation functions
│   │
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Application entry point
│   ├── socketClient.js          # Socket.IO client setup
│   └── theme.js                 # MUI theme configuration
│
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── jsconfig.json               # JavaScript configuration
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

### Authentication

The app uses **JWT-based authentication** with:
- **Access Token** - Stored in httpOnly cookies
- **Refresh Token** - Automatically refreshed when expired
- **Axios Interceptors** - Handle token refresh and error responses

### Real-time Features

**Socket.IO** is used for real-time updates:
- Live board changes
- Real-time notifications
- Collaborative editing

Socket client configuration: `src/socketClient.js`

---

## 🎯 Key Features Breakdown

### 1. Drag & Drop System

Built with `@dnd-kit` for smooth, accessible drag-and-drop:
- **Cards** can be moved within columns
- **Cards** can be moved between columns
- **Columns** can be reordered
- Custom sensors for mouse and touch devices

### 2. State Management

**Redux Toolkit** with persistence:
- `activeBoard` - Current board state
- `activeCard` - Selected card details
- `user` - Authentication state (persisted)
- `notifications` - User notifications

### 3. Authentication Flow

1. User registration with email verification
2. Email confirmation link sent to user
3. Account verification via unique token
4. Login with credentials
5. JWT token stored in httpOnly cookies
6. Auto-refresh on token expiration
7. Protected routes for authenticated users

### 4. Responsive Design

Material-UI breakpoints ensure optimal viewing on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

### 5. Error Handling

Centralized error handling via Axios interceptors:
- Network errors
- Authentication errors (401, 410)
- Validation errors
- Toast notifications for user feedback

---
## 📄 License

This project is licensed under the **MIT License**.

### MIT License

```
Copyright (c) 2025 hwink

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**hwink**

- GitHub: [@hwink09](https://github.com/hwink09)
- Project Link: [https://github.com/hwink09/trello-web](https://github.com/hwink09/trello-web)

### Backend Repository

This frontend works with a separate backend API. Make sure to set up the backend for full functionality:
- Backend API: `` (Production)
- Local Backend: `http://localhost:8017` (Development)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [@dnd-kit](https://dndkit.com/)
- [Vite](https://vitejs.dev/)
- [Socket.IO](https://socket.io/)

---

## 📞 Support

If you encounter any issues or have questions:

1. Check existing [Issues](https://github.com/hwink09/trello-web/issues)
2. Open a new issue with detailed description
3. Contact the author via GitHub

---

<div align="center">

**Made with ❤️ by hwink**

⭐ Star this repo if you find it useful!

</div>
