// // 📦 IMPORT CÁC MODULES CẦN THIẾT
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // React: Thư viện chính để tạo components
// // useState: Hook quản lý state trong functional component
// // useEffect: Hook xử lý side effects (như localStorage, API calls, DOM manipulation)

// import './styles/TaskManager.scss';
// // Import file SCSS để style cho toàn bộ TaskManager app

// // 🌐 IMPORT CÁC CONTEXT PROVIDERS
// import { ThemeProvider } from './contexts/ThemeContext';
// import { UserProvider } from './contexts/UserContext';
// import { filterTasks, sortTasks, getTaskStats } from './utils/taskHelpers';
// // ThemeProvider: Cung cấp theme data (light/dark) cho toàn app
// // UserProvider: Cung cấp user data cho toàn app (sẽ dùng sau)

// // 🧩 IMPORT CÁC COMPONENTS
// import ThemeToggle from './components/ThemeToggle';
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';
// import TaskFilters from './components/TaskFilters';
// import UserProfile from './components/UserProfile';
// // ThemeToggle: Button để switch light/dark mode
// // TaskInput: Form component để user nhập task mới

// // 🏗️ MAIN TASKMANAGER COMPONENT
// function TaskManagerApp() {
//     // 📋 TASKS STATE với localStorage PERSISTENCE
//     const [tasks, setTasks] = useState(() => {
//         const savedTasks = localStorage.getItem('tasks');
//         console.log('🚀 LOADING - Tasks from localStorage:', savedTasks);
//         return savedTasks ? JSON.parse(savedTasks) : [];
//     });

//     // 🔍 FILTER & SORT STATE
//     const [currentFilter, setCurrentFilter] = useState('all');
//     const [sortBy, setSortBy] = useState('created-desc');
//     const [searchTerm, setSearchTerm] = useState('');

//     // ➕ OPTIMIZED HANDLE ADD TASK với useCallback
//     const handleAddTask = useCallback(async (taskText) => {
//         try {
//             console.log('Adding task:', taskText);

//             const newTask = {
//                 id: Date.now(),
//                 text: taskText,
//                 completed: false,
//                 createdAt: new Date()
//             };

//             setTasks(prevTasks => [...prevTasks, newTask]);
//             console.log('Task added successfully!');
//         } catch (error) {
//             console.error('Error adding task:', error);
//             throw error;
//         }
//     }, []);

//     // ✅ OPTIMIZED HANDLE TOGGLE TASK
//     const handleToggleTask = useCallback((taskId) => {
//         setTasks(prevTasks =>
//             prevTasks.map(task =>
//                 task.id === taskId
//                     ? { ...task, completed: !task.completed }
//                     : task
//             )
//         );
//     }, []);

//     // 🗑️ OPTIMIZED HANDLE DELETE TASK
//     const handleDeleteTask = useCallback((taskId) => {
//         setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//     }, []);

//     // ✏️ OPTIMIZED HANDLE EDIT TASK
//     const handleEditTask = useCallback((taskId, newText) => {
//         setTasks(prevTasks =>
//             prevTasks.map(task =>
//                 task.id === taskId
//                     ? { ...task, text: newText }
//                     : task
//             )
//         );
//     }, []);

//     // 🔄 OPTIMIZED HANDLE TOGGLE ALL
//     const handleToggleAll = useCallback(() => {
//         const allCompleted = tasks.every(task => task.completed);
//         setTasks(prevTasks =>
//             prevTasks.map(task => ({ ...task, completed: !allCompleted }))
//         );
//     }, [tasks]);

//     // 🗑️ OPTIMIZED HANDLE CLEAR COMPLETED
//     const handleClearCompleted = useCallback(() => {
//         setTasks(prevTasks => prevTasks.filter(task => !task.completed));
//     }, []);

//     // 💾 AUTO-SAVE TASKS TO localStorage
//     useEffect(() => {
//         console.log('💾 SAVING - Tasks to localStorage:', tasks);
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//         console.log('✅ SAVED - Tasks saved successfully');
//     }, [tasks]);

//     // 🔍 PROCESS TASKS (Filter, Sort, Search) với useMemo optimization
//     const processedTasks = useMemo(() => {
//         let filtered = filterTasks(tasks, currentFilter, searchTerm);
//         let sorted = sortTasks(filtered, sortBy);
//         return sorted;
//     }, [tasks, currentFilter, searchTerm, sortBy]);

//     // 📊 CALCULATE STATISTICS với useMemo optimization
//     const taskStats = useMemo(() => getTaskStats(tasks), [tasks]);

//     // 🖼️ RENDER JSX - UI STRUCTURE
//     return (
//         // ✅ CONTEXT PROVIDERS WRAPPER - Bọc app với các Context
//         <ThemeProvider>
//             {/* ThemeProvider: Cung cấp theme data cho tất cả child components */}
//             {/* Mọi component con có thể dùng useTheme() để access theme data */}
//             <UserProvider>
//                 {/* UserProvider: Cung cấp user data cho tất cả child components */}
//                 {/* Nested providers: ThemeProvider > UserProvider > App */}

//                 {/* 📱 MAIN APP CONTAINER */}
//                 <div className="task-app">
//                     {/* className="task-app": CSS class để style toàn bộ app */}

//                     {/* 🎯 HEADER SECTION */}
//                     <header className="app-header">
//                         {/* header: Semantic HTML element cho phần đầu trang */}
//                         <h1>🎯 Task Manager</h1>
//                         {/* h1: Main heading của app */}

//                         <div className="header-actions">
//                             <ThemeToggle />
//                             <UserProfile />
//                         </div>
//                     </header>

//                     {/* 📋 MAIN CONTENT AREA */}
//                     <div className="app-content">
//                         {/* Container cho main content và sidebar */}

//                         <main className="main-area">
//                             {/* main: Semantic HTML element cho nội dung chính */}

//                             {/* 📝 TASK INPUT */}
//                             <TaskInput onAddTask={handleAddTask} />

//                             {/* 📋 TASK LIST */}
//                             <TaskList
//                                 tasks={processedTasks}
//                                 onToggle={handleToggleTask}
//                                 onDelete={handleDeleteTask}
//                                 onEdit={handleEditTask}
//                                 emptyMessage={
//                                     searchTerm
//                                         ? `Không tìm thấy task nào với "${searchTerm}"`
//                                         : currentFilter === 'active'
//                                             ? "Không có task nào đang làm"
//                                             : currentFilter === 'completed'
//                                                 ? "Không có task nào đã hoàn thành"
//                                                 : "Chưa có task nào. Hãy thêm task đầu tiên!"
//                                 }
//                             />
//                         </main>

//                         {/* 🎛️ SIDEBAR AREA */}
//                         <aside className="sidebar-area">
//                             <TaskFilters
//                                 currentFilter={currentFilter}
//                                 onFilterChange={setCurrentFilter}
//                                 sortBy={sortBy}
//                                 onSortChange={setSortBy}
//                                 searchTerm={searchTerm}
//                                 onSearchChange={setSearchTerm}
//                                 taskStats={taskStats}
//                                 onClearCompleted={handleClearCompleted}
//                                 onToggleAll={handleToggleAll}
//                             />
//                         </aside>
//                     </div>
//                     {/* Đóng app-content container */}
//                 </div>
//                 {/* Đóng task-app main container */}
//             </UserProvider>
//             {/* Đóng UserProvider context */}
//         </ThemeProvider>
//         // {/* Đóng ThemeProvider context */}
//     );
//     // Đóng return statement
// }
// // Đóng TaskManagerApp function component

// // 📤 EXPORT COMPONENT
// export default TaskManagerApp;
// // export default: Export component như default export
// // Cho phép import TaskManagerApp từ file khác
// // VD: import TaskManagerApp from './TaskManagerApp'

// /*
// 🔄 TỔNG QUAN LUỒNG HOẠT ĐỘNG:

// 📱 APP INITIALIZATION (Lần đầu chạy app):
// 1. TaskManagerApp component được mount
// 2. useState lazy initial state chạy:
//    - localStorage.getItem('tasks') → null (first time)
//    - Return [] → tasks = []
// 3. useEffect([tasks]) chạy:
//    - localStorage.setItem('tasks', JSON.stringify([])) → save empty array
// 4. Render UI với empty task list

// ➕ ADD TASK WORKFLOW (User thêm task):
// 1. User nhập text vào TaskInput → click Add
// 2. TaskInput gọi onAddTask(taskText) prop
// 3. handleAddTask(taskText) được execute:
//    - Tạo newTask object với unique ID và timestamp
//    - setTasks([...prevTasks, newTask]) → add to array
// 4. React re-render với tasks mới
// 5. useEffect([tasks]) detect change:
//    - localStorage.setItem('tasks', JSON.stringify(newTasks))
//    - Save updated array to browser storage
// 6. UI re-render với task mới hiển thị

// 🔄 RELOAD PAGE (User refresh browser):
// 1. TaskManagerApp component mount lại
// 2. useState lazy initial state chạy:
//    - localStorage.getItem('tasks') → return saved JSON string
//    - JSON.parse() → convert back to array
//    - Return parsed array → tasks = [saved tasks]
// 3. useEffect([tasks]) chạy → save to localStorage (redundant nhưng safe)
// 4. Render UI với tasks đã được restore

// 💾 DATA PERSISTENCE:
// - localStorage: Browser API lưu data vào disk
// - Persistent across browser sessions (không mất khi đóng browser)
// - Domain-specific (mỗi website có storage riêng)
// - JSON format để lưu complex data structures
// - Automatic sync giữa React state và browser storage
// */