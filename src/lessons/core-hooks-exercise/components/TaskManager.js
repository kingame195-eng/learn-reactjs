// 📦 IMPORT CÁC HOOKS CẦN THIẾT TỪ REACT
import React, { useState, useEffect } from 'react';
// React: Thư viện chính để tạo functional components
// useState: Hook quản lý state trong component (local state)
// useEffect: Hook xử lý side effects (localStorage, DOM updates, API calls)

// 🏗️ TASKMANAGER COMPONENT - Component quản lý tasks với đầy đủ features
function TaskManager() {
    // 📊 TASKS STATE - Array chứa tất cả tasks
    const [tasks, setTasks] = useState([]);
    // tasks: Current tasks array - [{id, text, completed, createdAt, updatedAt}, ...]
    // setTasks: Function để update tasks state
    // useState([]): Initialize với empty array (no tasks initially)

    // 🔍 FILTER STATE - Lọc tasks theo trạng thái  
    const [filter, setFilter] = useState('all');
    // filter: Current filter value ('all', 'active', 'completed')
    // setFilter: Function để change filter
    // 'all': Hiển thị tất cả tasks
    // 'active': Chỉ hiển thị tasks chưa hoàn thành (completed: false)
    // 'completed': Chỉ hiển thị tasks đã hoàn thành (completed: true)

    // 🔎 SEARCH STATE - Tìm kiếm tasks theo text
    const [searchTerm, setSearchTerm] = useState('');
    // searchTerm: Current search text user nhập
    // setSearchTerm: Function để update search term
    // Dùng để filter tasks có text chứa searchTerm (case-insensitive)

    // ⏳ LOADING STATE - Trạng thái loading cho async operations
    const [isLoading, setIsLoading] = useState(false);
    // isLoading: Boolean flag để show/hide loading spinner
    // setIsLoading: Function để toggle loading state
    // Dùng khi perform async operations (API calls, file operations)

    // ➕ FUNCTION THÊM TASK MỚI
    const addTask = (taskText) => {
        // taskText: String - nội dung task user nhập vào
        // Function này nhận text và tạo complete task object

        // 🏗️ TẠO TASK OBJECT MỚI VỚI FULL METADATA
        const newTask = {
            id: Date.now(),                    // Unique ID từ timestamp (milliseconds)
            text: taskText.trim(),             // Task content, remove whitespace đầu/cuối
            completed: false,                  // Default: task chưa hoàn thành
            createdAt: new Date(),             // Timestamp khi task được tạo
            updatedAt: new Date()              // Timestamp lần update cuối (ban đầu = createdAt)
        };
        // Date.now(): Return số milliseconds từ Jan 1, 1970 → unique ID
        // taskText.trim(): Remove spaces, tabs, newlines từ đầu và cuối string
        // new Date(): Tạo Date object với current date/time
        // 
        // VD: newTask = {
        //   id: 1698165234567,
        //   text: "Learn React Hooks",
        //   completed: false, 
        //   createdAt: "2025-10-24T08:30:25.123Z",
        //   updatedAt: "2025-10-24T08:30:25.123Z"
        // }

        // ➕ THÊM TASK VÀO TASKS ARRAY (IMMUTABLE UPDATE)
        setTasks(prevTasks => [...prevTasks, newTask]);
        // setTasks(): React state setter function
        // prevTasks => ...: Callback pattern để access current state
        // prevTasks: Current tasks array (before update)
        // [...prevTasks, newTask]: Spread operator để copy existing + add new
        // 
        // ⚡ IMMUTABLE UPDATE PATTERN:
        // ❌ WRONG: prevTasks.push(newTask) - mutate original array
        // ✅ CORRECT: [...prevTasks, newTask] - create new array
        // 
        // React cần immutable updates để detect changes và re-render
        // VD: prevTasks = [{id:1, text:"Old"}]
        //     Result = [{id:1, text:"Old"}, {id:2, text:"New"}]
    };

    // ✅ FUNCTION TOGGLE TASK COMPLETION STATUS
    const toggleTask = (id) => {
        // id: Number - unique ID của task cần toggle
        // Function này switch completed: true ↔ false

        setTasks(prevTasks =>
            // prevTasks: Current tasks array
            prevTasks.map(task =>
                // map(): Array method - loop qua từng task và transform
                // Return new array với same length nhưng có thể có items modified

                task.id === id ?
                    // 🎯 CONDITIONAL UPDATE - Chỉ update task có matching ID
                    {
                        ...task,                        // Spread: copy tất cả properties hiện tại
                        completed: !task.completed,    // Toggle: true → false, false → true  
                        updatedAt: new Date()          // Update timestamp để track modification
                    }
                    :
                    // 📋 KEEP UNCHANGED - Tasks khác giữ nguyên
                    task
                // Ternary operator: condition ? valueIfTrue : valueIfFalse
                // 
                // 🔄 LOGIC FLOW:
                // - Loop qua tất cả tasks
                // - Nếu task.id === id (match) → create new object với completed flipped
                // - Nếu task.id !== id (no match) → return original task unchanged
                // - Result: Array mới với 1 task updated, others unchanged
                // 
                // VD: id = 2, prevTasks = [
                //   {id:1, completed:false}, 
                //   {id:2, completed:false}, ← Target
                //   {id:3, completed:true}
                // ]
                // Result = [
                //   {id:1, completed:false},     ← Unchanged  
                //   {id:2, completed:true},      ← Toggled
                //   {id:3, completed:true}       ← Unchanged
                // ]
            )
        );
    };

    // 🗑️ FUNCTION XÓA TASK
    const deleteTask = (id) => {
        // id: Number - unique ID của task cần xóa
        // Function này remove task khỏi tasks array

        setTasks(prevTasks =>
            prevTasks.filter(task => task.id !== id)
            // filter(): Array method - tạo array mới chỉ chứa items thỏa điều kiện
            // task => task.id !== id: Callback function - điều kiện để keep task
            // !== : Strict inequality - chỉ keep tasks có ID khác với target ID
            // 
            // 🔄 LOGIC FLOW:
            // - Loop qua tất cả tasks  
            // - Nếu task.id !== id (not match) → keep trong result array
            // - Nếu task.id === id (match) → exclude khỏi result array
            // - Result: Array mới không có task với target ID
            // 
            // VD: id = 2, prevTasks = [
            //   {id:1, text:"Task 1"},
            //   {id:2, text:"Task 2"}, ← Target to delete
            //   {id:3, text:"Task 3"}
            // ]
            // Result = [
            //   {id:1, text:"Task 1"},     ← Kept (1 !== 2)
            //   {id:3, text:"Task 3"}      ← Kept (3 !== 2)  
            // ]
            // Task với id=2 đã bị remove
        );
    };

    // ✏️ FUNCTION EDIT TASK TEXT
    const editTask = (id, newText) => {
        // id: Number - unique ID của task cần edit
        // newText: String - nội dung mới để replace current text

        setTasks(prevTasks =>
            prevTasks.map(task =>
                // map(): Transform array - same length, có thể modify items

                task.id === id ?
                    // 🎯 TARGET TASK - Update task có matching ID
                    {
                        ...task,                        // Copy tất cả properties hiện tại
                        text: newText.trim(),          // Update text với newText (remove whitespace)
                        updatedAt: new Date()          // Update modification timestamp
                    }
                    :
                    // 📋 OTHER TASKS - Giữ nguyên
                    task
                // 
                // 🔄 LOGIC FLOW tương tự toggleTask:
                // - Loop qua tất cả tasks
                // - Nếu match ID → create new object với updated text + timestamp
                // - Nếu không match → return original task
                // - Result: Array với 1 task có text updated
                // 
                // VD: id = 2, newText = "Updated Task"
                // prevTasks = [
                //   {id:1, text:"Task 1", updatedAt:"10:00"},
                //   {id:2, text:"Old Task", updatedAt:"10:05"}, ← Target
                //   {id:3, text:"Task 3", updatedAt:"10:10"}
                // ]
                // Result = [
                //   {id:1, text:"Task 1", updatedAt:"10:00"},      ← Unchanged
                //   {id:2, text:"Updated Task", updatedAt:"10:30"}, ← Text + timestamp updated
                //   {id:3, text:"Task 3", updatedAt:"10:10"}       ← Unchanged
                // ]
            )
        );
    };

    // 🧹 FUNCTION XÓA TẤT CẢ COMPLETED TASKS
    const clearCompletedTasks = () => {
        // Function này remove tất cả tasks có completed: true
        // Giữ lại chỉ active tasks (completed: false)

        setTasks(prevTasks =>
            prevTasks.filter(task => !task.completed)
            // filter(): Tạo array mới chỉ chứa items thỏa điều kiện
            // task => !task.completed: Callback - điều kiện để keep task
            // !task.completed: Logical NOT operator
            //   - Nếu task.completed = true → !true = false → exclude
            //   - Nếu task.completed = false → !false = true → include
            // 
            // 🔄 LOGIC FLOW:
            // - Loop qua tất cả tasks
            // - Chỉ keep tasks có completed: false (active tasks)
            // - Remove tất cả tasks có completed: true
            // - Result: Array chỉ chứa active tasks
            // 
            // VD: prevTasks = [
            //   {id:1, text:"Active Task 1", completed:false},   ← Keep
            //   {id:2, text:"Completed Task", completed:true},   ← Remove
            //   {id:3, text:"Active Task 2", completed:false},   ← Keep  
            //   {id:4, text:"Another Done", completed:true}      ← Remove
            // ]
            // Result = [
            //   {id:1, text:"Active Task 1", completed:false},
            //   {id:3, text:"Active Task 2", completed:false}
            // ]
            // Tất cả completed tasks đã bị clear
        );
    };

    // 📱 LOAD TASKS FROM localStorage KHI COMPONENT MOUNT
    useEffect(() => {
        // useEffect với empty dependency array [] → chỉ chạy 1 lần khi component mount
        // Mount: Lần đầu component được add vào DOM tree

        // 🔍 TÌM SAVED TASKS TRONG BROWSER STORAGE
        const savedTasks = localStorage.getItem('tasks');
        // localStorage.getItem('tasks'): Lấy data từ browser storage
        // Return: JSON string hoặc null nếu key không tồn tại
        // Browser storage persistent across sessions (không mất khi đóng browser)

        if (savedTasks) {
            // Check xem có saved data không (tránh parse null)
            try {
                // try-catch: Error handling cho JSON parsing
                const parsedTasks = JSON.parse(savedTasks);
                // JSON.parse(): Convert JSON string → JavaScript array/object
                // VD: '[{"id":1,"text":"Task"}]' → [{id:1, text:"Task"}]

                setTasks(parsedTasks);
                // Update tasks state với data từ localStorage
                // Component sẽ re-render với restored tasks
            } catch (error) {
                // catch: Bắt lỗi nếu JSON malformed hoặc corrupt
                console.error('Error loading tasks: ', error);
                // Log error để debug, nhưng không crash app
                // App sẽ continue với empty tasks array (default state)
            }
        }
        // Nếu savedTasks = null (first time) → không làm gì, giữ tasks = []
    }, []);
    // []: Empty dependency array - effect chỉ chạy khi component mount
    // Không có dependencies → không re-run khi state changes

    // 💾 AUTO-SAVE TASKS TO localStorage MỖI KHI TASKS THAY ĐỔI
    useEffect(() => {
        // useEffect với [tasks] dependency → chạy mỗi khi tasks state changes
        // Tự động sync React state với browser storage

        localStorage.setItem('tasks', JSON.stringify(tasks));
        // localStorage.setItem(key, value): Lưu data vào browser storage
        // 'tasks': Key name để identify data
        // JSON.stringify(tasks): Convert JavaScript array → JSON string
        // Browser storage chỉ accept strings, không lưu được objects/arrays
        // 
        // VD: tasks = [{id:1, text:"Learn React", completed:false}]
        //     JSON.stringify(tasks) = '[{"id":1,"text":"Learn React","completed":false}]'
        //     localStorage stores: key='tasks', value='[{"id":1,...}]'
        // 
        // 🔄 AUTO-SYNC WORKFLOW:
        // 1. User performs action (add/edit/delete/toggle task)
        // 2. State update function called (setTasks)
        // 3. React re-renders component với new tasks
        // 4. useEffect detects tasks change → trigger
        // 5. localStorage.setItem() saves new tasks to browser
        // 6. Next app load → first useEffect restores từ localStorage
    }, [tasks]);
    // [tasks]: Dependency array - effect chạy khi tasks reference changes
    // Mỗi immutable update (setTasks) tạo new array → trigger useEffect

    // 📄 UPDATE BROWSER TAB TITLE VỚI TASK COUNT
    useEffect(() => {
        // useEffect để update DOM element bên ngoài React component tree
        // document.title: Browser tab title (không phải React managed)

        // 📊 ĐẾM ACTIVE TASKS (chưa hoàn thành)
        const activeCount = tasks.filter(task => !task.completed).length;
        // tasks.filter(): Tạo array mới chỉ chứa items thỏa điều kiện
        // task => !task.completed: Chỉ lấy tasks có completed: false
        // .length: Đếm số elements trong filtered array
        // 
        // VD: tasks = [
        //   {completed:false}, ← Active
        //   {completed:true},  
        //   {completed:false}, ← Active  
        //   {completed:true}
        // ]
        // activeCount = 2

        // 🏷️ UPDATE BROWSER TAB TITLE
        document.title = `Task Manager (${activeCount} active)`;
        // document.title: Native DOM property để set browser tab title
        // Template literal với embedded expression
        // VD: activeCount=3 → "Task Manager (3 active)"
        //     activeCount=0 → "Task Manager (0 active)"
        // 
        // 💡 USER BENEFITS:
        // - User có thể thấy task count ngay ở browser tab
        // - Không cần switch tab để biết còn bao nhiêu tasks
        // - Professional app experience
    }, [tasks]);
    // [tasks]: Dependency - update title mỗi khi tasks changes
    // Khi add/delete/toggle tasks → activeCount changes → title updates

    // 🖼️ RENDER JSX - COMPONENT UI
    return (
        <div>
            {/* 📱 BASIC UI PLACEHOLDER */}
            <h2>Task Manager</h2>
            {/* h2: Heading level 2 cho component title */}
            {/* Đây chỉ là placeholder - sẽ build full UI sau */}

            {/* 🚧 TODO: COMPLETE UI IMPLEMENTATION
            - TaskInput component để add tasks
            - TaskList component để display tasks  
            - TaskFilters component để filter all/active/completed
            - Search input để search tasks
            - Stats component để show task counts
            - Clear completed button
            */}
        </div>
    );
}
// Đóng TaskManager function component

// 📤 EXPORT COMPONENT
export default TaskManager;
// export default: Export TaskManager như default export của file
// Cho phép import component từ files khác
// VD: import TaskManager from './TaskManager'

/* 
🔄 TỔNG QUAN COMPONENT ARCHITECTURE:

📊 STATE MANAGEMENT:
- tasks: Main data array chứa tất cả tasks
- filter: UI filter state ('all', 'active', 'completed')  
- searchTerm: Search input value để filter tasks by text
- isLoading: Loading state cho async operations

🔧 TASK OPERATIONS:
- addTask(): Thêm task mới với metadata (id, timestamps)
- toggleTask(): Toggle completed status + update timestamp
- deleteTask(): Remove task khỏi array (immutable filter)
- editTask(): Update task text + timestamp  
- clearCompletedTasks(): Bulk delete completed tasks

💾 PERSISTENCE LAYER:
- Mount useEffect: Load tasks từ localStorage (with error handling)
- Tasks useEffect: Auto-save tasks khi state changes (real-time sync)
- Title useEffect: Update browser tab với active task count

⚡ PERFORMANCE PATTERNS:
- Immutable updates: [...prevTasks, newTask] thay vì mutation
- Functional state updates: prevTasks => ... để avoid stale closures
- Lazy initial state: có thể optimize với useState(() => loadFromStorage())
- Error boundaries: try-catch cho localStorage operations

🎯 REACT BEST PRACTICES:
- Single responsibility: Mỗi function handle 1 specific operation
- Predictable state updates: Immutable patterns
- Side effects separation: useEffect cho external operations  
- Error handling: Graceful degradation khi localStorage fail
- Semantic JSX: Proper HTML elements và structure

🚀 EXTENSIBILITY:
- Component có thể easily integrate với UI components
- State structure supports advanced features (priorities, categories, due dates)
- Functions có thể easily được pass như props cho child components
- localStorage pattern có thể easily switch to API/database later
*/