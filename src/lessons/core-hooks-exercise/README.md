# 🎣 CORE HOOKS EXERCISE - HƯỚNG DẪN TỰ CODE

## 🎯 **MỤC TIÊU BÀI TẬP:**
Tự tay code một ứng dụng **Task Manager** để thực hành 3 Core Hooks:
- **useState**: Quản lý state
- **useEffect**: Side effects & lifecycle
- **useContext**: Chia sẻ data globally

---

## 📋 **ĐỀ BÀI: TASK MANAGER APP**

### **🏗️ TÍNH NĂNG YÊU CẦU:**

#### **1. Task Management**
- ✅ Thêm task mới
- ✅ Đánh dấu complete/incomplete
- ✅ Xóa task
- ✅ Chỉnh sửa task
- ✅ Filter tasks (All/Active/Completed)
- ✅ Search tasks

#### **2. Theme System**
- 🎨 Dark/Light mode toggle
- 🎨 Theme persistence
- 🎨 Apply theme toàn app

#### **3. User Settings**
- 👤 Username setting
- 👤 Task display preferences
- 👤 Settings persistence

---

## 📁 **CẤU TRÚC FOLDER (ĐÃ TẠO):**

```
src/lessons/core-hooks-exercise/
├── contexts/          [EMPTY - Chờ bạn tạo contexts]
├── components/        [EMPTY - Chờ bạn tạo components]  
├── styles/           [EMPTY - Chờ bạn tạo styles]
└── README.md         [FILE NÀY - Hướng dẫn]
```

**🎯 Bạn sẽ tự tạo tất cả files từ đầu!**

---

## 🚀 **HƯỚNG DẪN TỪNG BƯỚC:**

### **📌 BƯỚC 1: SETUP MAIN APP (15 phút)**

#### **Task 1.1: Tạo file `index.js`**
```javascript
// File: src/lessons/core-hooks-exercise/index.js
// YÊU CẦU: Tạo component chính của app

// TODO 1: Import React
// TODO 2: Import các providers (sẽ tạo sau)
// TODO 3: Import các components chính (sẽ tạo sau)
// TODO 4: Import CSS

function TaskManagerApp() {
    return (
        // TODO 5: Wrap app với các Providers
        // TODO 6: Tạo layout cơ bản với header/main/sidebar
        <div className="task-app">
            <h1>🎯 Task Manager</h1>
            {/* Components sẽ được thêm vào đây */}
        </div>
    );
}

export default TaskManagerApp;
```

#### **🎯 Kết quả bước 1:** App hiển thị title cơ bản

---

### **📌 BƯỚC 2: TẠO THEME CONTEXT (20 phút)**

#### **Task 2.1: Tạo `contexts/ThemeContext.js`**
```javascript
// YÊU CẦU: useContext để manage theme

// STEPS:
// 1. createContext()
// 2. ThemeProvider component với useState
// 3. theme state: 'light' hoặc 'dark'
// 4. toggleTheme function
// 5. useEffect để save/load từ localStorage
// 6. useEffect để apply CSS class vào body
// 7. Custom hook useTheme()
// 8. Error handling khi dùng ngoài provider

// PROPERTIES CẦN PROVIDE:
// - theme: 'light' | 'dark'
// - toggleTheme: function
// - isLight: boolean
// - isDark: boolean
```

#### **Task 2.2: Test ThemeContext**
```javascript
// Tạo component test đơn giản để verify context hoạt động
// Thêm button toggle theme
// Check console.log để verify state changes
```

#### **🎯 Kết quả bước 2:** Theme context hoạt động, có thể toggle

---

### **📌 BƯỚC 3: TẠO USER CONTEXT (20 phút)**

#### **Task 3.1: Tạo `contexts/UserContext.js`**
```javascript
// YÊU CẦU: useContext để manage user settings

// STEPS:
// 1. createContext()
// 2. UserProvider với useState cho:
//    - username: string
//    - preferences: object {showCompleted: true, sortBy: 'date'}
// 3. Functions: setUsername, updatePreferences
// 4. useEffect để persistence với localStorage
// 5. Custom hook useUser()

// PROPERTIES CẦN PROVIDE:
// - username: string
// - preferences: object
// - setUsername: function
// - updatePreferences: function
// - isConfigured: boolean (có username chưa)
```

#### **🎯 Kết quả bước 3:** User context quản lý settings

---

### **📌 BƯỚC 4: TẠO TASK MANAGER LOGIC (30 phút)**

#### **Task 4.1: Tạo `components/TaskManager.js`**
```javascript
// YÊU CẦU: useState + useEffect cho task management

// STATES CẦN QUẢN LÝ:
// - tasks: array of task objects
// - filter: 'all' | 'active' | 'completed' 
// - searchTerm: string
// - isLoading: boolean

// TASK OBJECT STRUCTURE:
// {
//   id: number,
//   text: string,
//   completed: boolean,
//   createdAt: Date,
//   updatedAt: Date
// }

// FUNCTIONS CẦN TẠO:
// - addTask(text)
// - toggleTask(id) 
// - deleteTask(id)
// - editTask(id, newText)
// - clearCompleted()
// - getFilteredTasks()

// useEffect CẦN:
// - Load tasks từ localStorage khi mount
// - Save tasks khi tasks thay đổi
// - Update document title với task count
```

#### **Task 4.2: Tạo helper functions**
```javascript
// Tạo các pure functions để xử lý tasks:
// - filterTasks(tasks, filter, searchTerm)
// - sortTasks(tasks, sortBy)
// - getTaskStats(tasks) => {total, active, completed}
```

#### **🎯 Kết quả bước 4:** Core task logic hoàn chỉnh

---

### **📌 BƯỚC 5: UI COMPONENTS (40 phút)**

#### **Task 5.1: Tạo `components/TaskInput.js`**
```javascript
// YÊU CẦU: useState cho input form

// FEATURES:
// - Input field để nhập task mới
// - Submit on Enter hoặc button click
// - Validation (không được empty)
// - Clear input sau khi submit
// - Loading state khi đang add
// - Character count (optional)
```

#### **Task 5.2: Tạo `components/TaskList.js`**
```javascript
// YÊU CẦU: Hiển thị danh sách tasks

// FEATURES:
// - Map qua filtered tasks
// - TaskItem component cho mỗi task
// - Empty state khi không có tasks
// - Loading skeleton (optional)
// - Drag & drop reorder (bonus)
```

#### **Task 5.3: Tạo `components/TaskItem.js`**
```javascript
// YÊU CẦU: Individual task component

// FEATURES:
// - Checkbox để toggle completed
// - Text hiển thị task content
// - Edit mode khi double click
// - Delete button
// - Timestamps
// - CSS classes theo completed state
```

#### **Task 5.4: Tạo `components/TaskFilters.js`**
```javascript
// YÊU CẦU: Filter và search controls

// FEATURES:
// - Filter buttons: All/Active/Completed
// - Search input với debounce
// - Clear filters button
// - Task count display
// - Sort options dropdown
```

#### **🎯 Kết quả bước 5:** UI components đầy đủ chức năng

---

### **📌 BƯỚC 6: CONTEXT CONSUMERS (25 phút)**

#### **Task 6.1: Tạo `components/ThemeToggle.js`**
```javascript
// YÊU CẦU: useContext để consume ThemeContext

// FEATURES:
// - Button toggle theme
// - Icon thay đổi theo theme (🌙/☀️)
// - Smooth transition animation
// - Keyboard support
```

#### **Task 6.2: Tạo `components/UserSettings.js`**
```javascript
// YÊU CẦU: useContext để consume UserContext

// FEATURES:
// - Username input field
// - Preferences toggles
// - Save/Cancel buttons
// - Settings persistence
// - Form validation
```

#### **Task 6.3: Tạo `components/Header.js`**
```javascript
// YÊU CẦU: Header với theme toggle và user info

// FEATURES:
// - App title
// - ThemeToggle component
// - User greeting (từ UserContext)
// - Task stats summary
```

#### **🎯 Kết quả bước 6:** Context integration hoàn tất

---

### **📌 BƯỚC 7: STYLING (30 phút)**

#### **Task 7.1: Tạo `styles/TaskManager.scss`**
```scss
// YÊU CẦU: Complete styling system

// CẦN STYLE:
// 1. CSS Variables cho light/dark theme
// 2. Layout: header, main, sidebar
// 3. Task components: input, list, item
// 4. Filters và controls
// 5. Animations: hover, transitions
// 6. Responsive design
// 7. Theme classes (.theme-light, .theme-dark)
```

#### **Task 7.2: Theme variables**
```scss
// Light theme variables
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #333333;
  --border-color: #dee2e6;
  // ... more variables
}

// Dark theme variables  
.theme-dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --border-color: #555555;
  // ... more variables
}
```

#### **🎯 Kết quả bước 7:** App đẹp và responsive

---

### **📌 BƯỚC 8: INTEGRATION & TESTING (20 phút)**

#### **Task 8.1: Connect tất cả components**
```javascript
// Trong index.js:
// 1. Wrap với tất cả Providers
// 2. Import và sử dụng tất cả components
// 3. Test data flow giữa components
// 4. Handle errors và edge cases
```

#### **Task 8.2: Testing checklist**
```javascript
// MANUAL TESTING:
// ✅ Add new task
// ✅ Toggle task completion
// ✅ Edit task text
// ✅ Delete task
// ✅ Filter tasks (All/Active/Completed)
// ✅ Search tasks
// ✅ Theme toggle works
// ✅ Settings persist after refresh
// ✅ Tasks persist after refresh
// ✅ Responsive design
```

#### **🎯 Kết quả bước 8:** App hoàn chỉnh và ổn định

---

## 🎯 **THÁCH THỨC BONUS (Nâng cao):**

### **🔥 Advanced Features:**
1. **Drag & Drop**: Reorder tasks
2. **Categories**: Group tasks by category
3. **Due Dates**: Add deadline cho tasks
4. **Priority Levels**: High/Medium/Low priority
5. **Task Statistics**: Charts và analytics
6. **Import/Export**: JSON data
7. **Keyboard Shortcuts**: Hotkeys cho actions
8. **Offline Support**: Service worker

### **⚡ Performance Optimization:**
1. **useMemo**: Memoize filtered tasks
2. **useCallback**: Memoize event handlers
3. **React.memo**: Prevent unnecessary re-renders
4. **Virtual Scrolling**: Large task lists
5. **Debounced Search**: Optimize search input

---

## 📚 **KIẾN THỨC SẼ HỌC:**

### **🎣 useState Mastery:**
- Multiple state variables
- State updates với objects/arrays
- Derived state vs useState
- State initialization functions

### **⚡ useEffect Mastery:**
- Dependency arrays
- Cleanup functions
- localStorage integration
- Performance optimization

### **🌐 useContext Mastery:**
- Context creation và providers
- Custom hooks pattern
- Context composition
- Error boundaries cho contexts

### **🏗️ Architecture Patterns:**
- Separation of concerns
- Component composition
- Props vs Context decision
- State lifting strategies

---

## 🎉 **TIÊU CHÍ HOÀN THÀNH:**

### **✅ Cơ bản (Pass):**
- All CRUD operations work
- Theme toggle functions
- Data persists across refresh
- No console errors
- Clean code structure

### **🔥 Giỏi (Good):**
- Smooth animations
- Error handling
- Edge cases covered
- Responsive design
- Performance optimized

### **💎 Xuất sắc (Excellent):**
- All bonus features implemented
- Custom hooks created
- TypeScript conversion
- Unit tests written
- Documentation complete

---

## 🚀 **BẮT ĐẦU NGAY:**

### **📝 Checklist đầu tiên:**
1. [ ] Đọc hết hướng dẫn này
2. [ ] Tạo file `index.js` với component cơ bản
3. [ ] Test app chạy được trong browser
4. [ ] Commit initial setup
5. [ ] Bắt đầu BƯỚC 2: ThemeContext

### **💡 Tips thành công:**
- **Làm từng bước nhỏ** - đừng rush
- **Test liên tục** - mỗi feature xong là test
- **Commit thường xuyên** - backup progress
- **Debug với console.log** - hiểu data flow
- **Tham khảo docs** - không thuộc lòng cũng được

**🎯 READY? LET'S CODE! 🚀**

---

## 📞 **HỖ TRỢ:**
Nếu gặp khó khăn, check lại:
1. Import/Export syntax
2. Hook rules (chỉ dùng ở top level)
3. Context provider wrapping
4. State update patterns
5. Dependency arrays trong useEffect

**Good luck! Bạn sẽ master được Core Hooks sau bài này! 💪**