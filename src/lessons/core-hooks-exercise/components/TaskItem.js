// 📝 TASKITEM COMPONENT - Component quản lý từng task item individual
import React, { useState } from 'react';

/**
 * 🎯 TASKITEM COMPONENT - COMPONENT QUẢN LÝ TASK INDIVIDUAL
 * 
 * 📋 CHỨC NĂNG CHÍNH:
 * 1. 📖 DISPLAY: Hiển thị thông tin task (text, date, status)
 * 2. ✅ TOGGLE: Chuyển đổi trạng thái completed/uncompleted
 * 3. ✏️ EDIT: Chỉnh sửa nội dung task inline (không reload page)
 * 4. 🗑️ DELETE: Xóa task với confirmation dialog
 * 5. ⌨️ KEYBOARD: Hỗ trợ shortcuts (Enter/Escape)
 * 6. 📱 UX: Responsive design với visual feedback
 * 
 * 🏗️ KIẾN TRÚC COMPONENT:
 * - Type: Smart Component (có internal state để quản lý edit mode)
 * - State Management: Local useState cho UI interactions
 * - Communication: Props callbacks để giao tiếp với parent
 * - Patterns: Controlled inputs, conditional rendering, event handling
 * 
 * 📦 PROPS INTERFACE:
 * - task: Object chứa thông tin task {id, text, completed, createdAt}
 * - onToggle: Function callback khi toggle completed status
 * - onDelete: Function callback khi delete task
 * - onEdit: Function callback khi save edit changes
 */

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {

    // 🖊️ LOCAL STATE QUẢN LÝ EDIT MODE
    const [isEditing, setIsEditing] = useState(false);
    /* 
    🔄 USESTATE - EDIT MODE MANAGEMENT:
    - isEditing: Boolean state điều khiển hiện tại component đang ở mode nào
    - false: View mode (hiển thị task text + action buttons)
    - true: Edit mode (hiển thị input + save/cancel buttons)
    - useState(false): Khởi tạo với View mode là default
    - Local state vì chỉ component này cần biết edit mode
    */

    const [editText, setEditText] = useState(task.text);
    /* 
    📝 USESTATE - EDIT TEXT MANAGEMENT:
    - editText: String chứa text user đang edit trong input
    - useState(task.text): Khởi tạo với text hiện tại của task
    - Giữ giá trị độc lập với task.text để user có thể edit mà không ảnh hưởng original
    - Chỉ update task.text thật sự khi user save
    - Pattern: Optimistic UI với local state buffer
    */

    // 🐛 DEBUG LOG: Theo dõi render cycle và task data
    console.log('🔄 RENDER - TaskItem:', {
        taskId: task.id,           // ID của task này
        taskText: task.text,       // Text hiện tại của task
        isCompleted: task.completed, // Trạng thái completed
        isEditing: isEditing,      // Có đang edit không
        editText: editText,        // Text trong edit buffer
        timestamp: new Date().toLocaleTimeString()
    });

    // ✅ HANDLE TOGGLE COMPLETED STATUS
    const handleToggle = () => {
        /* 
        🔄 TOGGLE COMPLETION LOGIC:
        - Function được gọi khi user click vào checkbox/toggle button
        - Không trực tiếp modify task state trong component này
        - Gọi onToggle callback prop để thông báo parent component
        - Parent sẽ update task state và re-render component này với data mới
        - Pattern: Unidirectional data flow trong React
        */
        console.log('🔄 TOGGLE - Task:', task.id, 'Current completed:', task.completed);
        onToggle(task.id);
        /* 
        📡 CALLBACK COMMUNICATION:
        - onToggle(task.id): Gọi function parent đã truyền xuống
        - Chỉ truyền task.id vì parent biết cách toggle task này
        - Parent có thể implement complex logic (ví dụ: save to database)
        - Component này chỉ lo về UI interaction
        */
    };

    // 🗑️ HANDLE DELETE với USER CONFIRMATION
    const handleDelete = () => {
        /* 
        🛡️ CONFIRMATION PATTERN:
        - window.confirm(): Browser native confirmation dialog
        - Hiển thị task text để user biết chính xác cái gì sẽ bị xóa
        - Blocking operation: code dừng lại chờ user response
        - Return true nếu user click OK, false nếu Cancel
        */
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa task "${task.text}"?`
        );

        if (confirmed) {
            /* 
            🗑️ DELETE EXECUTION:
            - Chỉ execute delete nếu user confirmed
            - onDelete(task.id): Gọi parent callback với task ID
            - Parent sẽ remove task khỏi state array
            - Component này sẽ unmount sau khi parent re-render
            */
            console.log('🗑️ DELETE - Task:', task.id, 'Text:', task.text);
            onDelete(task.id);
        } else {
            console.log('❌ DELETE CANCELLED - Task:', task.id);
        }
    };

    // ✏️ HANDLE ENTER EDIT MODE
    const handleEdit = () => {
        /* 
        📝 EDIT MODE ACTIVATION:
        - setIsEditing(true): Chuyển component sang Edit Mode
        - Component sẽ re-render và hiển thị input thay vì text
        - setEditText(task.text): Reset edit buffer về text hiện tại
        - Đảm bảo input có giá trị ban đầu là text của task
        - User sẽ thấy input với text sẵn sàng để edit
        */
        console.log('✏️ ENTER EDIT MODE - Task:', task.id);
        setIsEditing(true);
        setEditText(task.text); // Initialize edit buffer với current text
    };

    // 💾 SAVE EDIT CHANGES
    const handleSaveEdit = () => {
        /* 
        🔍 INPUT VALIDATION:
        - editText.trim(): Remove whitespace đầu và cuối
        - Prevent empty tasks và tasks chỉ có spaces
        - trimmedText: Clean version của user input
        */
        const trimmedText = editText.trim();

        if (trimmedText && trimmedText !== task.text) {
            /* 
            📋 SAVE CONDITIONS:
            - trimmedText: Phải có content (không empty)
            - trimmedText !== task.text: Phải khác với text hiện tại
            - Chỉ save nếu thực sự có changes
            - Tránh unnecessary API calls và state updates
            */
            console.log('💾 SAVE EDIT - Task:', task.id, {
                oldText: task.text,
                newText: trimmedText,
                hasChanged: trimmedText !== task.text
            });
            onEdit(task.id, trimmedText);
            /* 
            📡 PARENT COMMUNICATION:
            - onEdit(taskId, newText): Gọi parent callback
            - Parent sẽ update task trong state array
            - Component sẽ re-render với updated task data
            */
        } else {
            console.log('⚠️ SAVE SKIPPED - No changes or empty text');
        }

        /* 
        🔚 EXIT EDIT MODE:
        - setIsEditing(false): Chuyển về View Mode
        - Component re-render hiển thị text updated (nếu có)
        - Action buttons xuất hiện lại
        */
        setIsEditing(false);
    };

    // ❌ CANCEL EDIT OPERATION
    const handleCancelEdit = () => {
        /* 
        🔄 RESET EDIT STATE:
        - setEditText(task.text): Restore edit buffer về original text
        - Discard tất cả changes user đã nhập
        - setIsEditing(false): Exit edit mode
        - Component trở về View Mode với original text
        */
        console.log('❌ CANCEL EDIT - Task:', task.id, 'Discarding changes');
        setEditText(task.text); // Revert to original text
        setIsEditing(false);
    };

    // ⌨️ HANDLE KEYBOARD SHORTCUTS trong EDIT MODE
    const handleKeyDown = (e) => {
        /* 
        ⌨️ KEYBOARD SHORTCUTS UX:
        - e: KeyboardEvent object từ React synthetic event system
        - e.key: String chứa tên key được nhấn (modern way, cross-browser)
        - Alternative: e.keyCode (deprecated) hoặc e.which (deprecated)
        
        🎯 UX PATTERNS:
        - Enter: Save action (intuitive for users)
        - Escape: Cancel action (universal cancel shortcut)
        - Keyboard shortcuts giúp power users work faster
        */

        if (e.key === 'Enter') {
            /* 
            💾 ENTER = SAVE:
            - Gọi handleSaveEdit() để save changes
            - User không cần click Save button
            - Common pattern trong forms và editing interfaces
            */
            console.log('⌨️ KEYBOARD SAVE - Enter pressed');
            handleSaveEdit();

        } else if (e.key === 'Escape') {
            /* 
            ❌ ESCAPE = CANCEL:
            - Gọi handleCancelEdit() để discard changes
            - Universal "get me out of here" shortcut
            - Matches behavior của modals, dropdowns, etc.
            */
            console.log('⌨️ KEYBOARD CANCEL - Escape pressed');
            handleCancelEdit();
        }

        /* 
        🔄 EVENT FLOW:
        1. User nhấn key trong input
        2. Browser tạo KeyboardEvent
        3. React wrap trong SyntheticEvent
        4. onKeyDown handler được gọi
        5. Function này check key type
        6. Execute appropriate action
        7. Component state updates → re-render
        */
    };

    // 📅 FORMAT CREATED DATE với RELATIVE TIMING
    const formatDate = (date) => {
        /* 
        📊 DATE CALCULATION LOGIC:
        - now: Current timestamp
        - taskDate: Task creation timestamp  
        - diffInHours: Difference trong hours (float number)
        - Math calculation: (now - taskDate) milliseconds → hours
        */
        const now = new Date();
        const taskDate = new Date(date);
        const diffInHours = (now - taskDate) / (1000 * 60 * 60);
        /* 
        🔢 TIME CONVERSION MATH:
        - (now - taskDate): Difference in milliseconds
        - / 1000: Convert to seconds
        - / 60: Convert to minutes  
        - / 60: Convert to hours
        - Result: Hours since task creation (float)
        */

        if (diffInHours < 1) {
            /* 
            ⏰ RECENT TASKS (< 1 hour):
            - Hiển thị "Vừa tạo" cho better UX
            - User hiểu ngay đây là task mới
            - Không cần precise time cho recent items
            */
            return 'Vừa tạo';

        } else if (diffInHours < 24) {
            /* 
            📈 TODAY TASKS (1-24 hours):
            - Math.floor(diffInHours): Round down to whole hours
            - "X giờ trước" format dễ hiểu cho users
            - Relative time better than absolute cho recent items
            */
            return `${Math.floor(diffInHours)} giờ trước`;

        } else {
            /* 
            📅 OLDER TASKS (> 24 hours):
            - toLocaleDateString('vi-VN'): Format theo locale Việt Nam
            - Absolute date cho old tasks vì relative time becomes impractical
            - dd/mm/yyyy format familiar cho Vietnamese users
            */
            return taskDate.toLocaleDateString('vi-VN');
        }

        /* 
        💡 UX CONSIDERATIONS:
        - Progressive detail: Recent = relative, Old = absolute
        - Localized formatting cho better user experience
        - Performance: Simple math operations, không expensive
        - Scalability: Works với any number of tasks
        */
    };

    // 🖼️ JSX RETURN - RENDER UI COMPONENT
    return (
        <li className={`task-item ${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            {/* 
            🎨 DYNAMIC CSS CLASSES SYSTEM:
            - Template literal cho multiple dynamic classes
            - task-item: Base class cho tất cả task items
            - ${task.completed ? 'completed' : ''}: Conditional class cho completed tasks
            - ${isEditing ? 'editing' : ''}: Conditional class khi đang edit
            
            📋 CSS CLASS COMBINATIONS:
            - Normal: "task-item"
            - Completed: "task-item completed" 
            - Editing: "task-item editing"
            - Completed + Editing: "task-item completed editing"
            
            🎯 CSS STYLING BENEFITS:
            - CSS có thể style từng state khác nhau
            - .task-item.completed → strikethrough text, faded colors
            - .task-item.editing → highlight border, focus styles
            - Smooth animations với CSS transitions
            */}

            {/* ✅ TASK TOGGLE BUTTON - Checkbox alternative với better UX */}
            <button
                className="task-toggle"
                onClick={handleToggle}
                title={task.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
            >
                {task.completed ? '✅' : '⭕'}
            </button>
            {/* 
            � TOGGLE BUTTON ANALYSIS:
            - onClick={handleToggle}: Direct function reference, không cần arrow function
            - title prop: Dynamic tooltip based on current completion state  
            - Visual indicators: ✅ (completed) vs ⭕ (uncompleted)
            - Better UX than standard checkbox: larger touch target, clear visual feedback
            - Accessibility: title attribute helps screen readers
            */}

            {/* 📝 TASK CONTENT SECTION - Dynamic content based on edit mode */}
            <div className="task-content">
                {isEditing ? (
                    /* ✏️ EDIT MODE - Input form với save/cancel actions */
                    <div className="task-edit">
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="edit-input"
                            placeholder="Nhập nội dung task..."
                            autoFocus
                        />
                        {/* 
                        📝 CONTROLLED INPUT ANALYSIS:
                        - value={editText}: Controlled by React state, not DOM
                        - onChange: Updates local editText state on every keystroke
                        - onKeyDown: Handles keyboard shortcuts (Enter/Escape)
                        - autoFocus: Automatically focus input when entering edit mode
                        - placeholder: Guides user about expected input
                        */}

                        <div className="edit-actions">
                            <button
                                onClick={handleSaveEdit}
                                className="save-btn"
                                title="Lưu (Enter)"
                            >
                                💾
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="cancel-btn"
                                title="Hủy (Escape)"
                            >
                                ❌
                            </button>
                        </div>
                        {/* 
                        ⚡ EDIT ACTIONS ANALYSIS:
                        - Save button: Calls handleSaveEdit to validate & save changes
                        - Cancel button: Calls handleCancelEdit to discard changes
                        - Title tooltips: Show keyboard shortcuts for power users
                        - Icon buttons: Universal symbols for save/cancel actions
                        */}
                    </div>
                ) : (
                    /* 📖 VIEW MODE - Display task information */
                    <div className="task-view">
                        <span className="task-text">{task.text}</span>
                        <small className="task-date">
                            📅 {formatDate(task.createdAt)}
                        </small>
                    </div>
                    /* 
                    📖 VIEW MODE ANALYSIS:
                    - task-text: Main content của task
                    - task-date: Formatted creation timestamp
                    - formatDate(): Custom function cho relative/absolute time display
                    - <small>: Semantic HTML cho secondary information
                    - 📅 icon: Visual indicator cho date information
                    */
                )}
            </div>
            {/* 
            🔄 CONDITIONAL RENDERING PATTERN:
            - {isEditing ? EditMode : ViewMode}: Ternary operator
            - Completely different UI based on component state
            - EditMode: Input + action buttons
            - ViewMode: Text display + metadata
            - Single source of truth: isEditing state controls entire UI
            */}

            {/* 🎛️ TASK ACTIONS - Edit và Delete buttons */}
            {!isEditing && (
                <div className="task-actions">
                    <button
                        onClick={handleEdit}
                        className="edit-btn"
                        title="Chỉnh sửa task"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={handleDelete}
                        className="delete-btn"
                        title="Xóa task"
                    >
                        🗑️
                    </button>
                </div>
            )}
            {/* 
            🎛️ ACTION BUTTONS ANALYSIS:
            - {!isEditing && ...}: Conditional rendering - chỉ hiện khi KHÔNG editing
            - Edit button: Enters edit mode, changes UI to input form
            - Delete button: Shows confirmation dialog, then deletes if confirmed
            - Icon buttons: ✏️ (edit) và 🗑️ (delete) - universal symbols
            - title tooltips: Explain button functionality
            - Clean UX: Actions hidden during edit mode to avoid confusion
            */}
        </li>
    );
    /* 
    🏗️ COMPONENT STRUCTURE SUMMARY:
    <li> Root element với dynamic CSS classes
      ├── <button> Toggle completion status
      ├── <div> Content area (conditional rendering)
      │   ├── Edit Mode: <input> + save/cancel buttons
      │   └── View Mode: <span> text + <small> date
      └── <div> Action buttons (edit/delete) - hidden during edit mode
    */
};

export default TaskItem;

/*
🎓 KIẾN THỨC REACT TOÀN DIỆN - TASKITEM COMPONENT DEEP DIVE

📋 REACT PATTERNS VÀ CONCEPTS:

🎯 1. LOCAL STATE MANAGEMENT:
   ✅ useState Hook Applications:
   - isEditing: Boolean state cho UI mode switching
   - editText: String state cho form input control
   - State initialization: useState(initialValue)
   - State updates trigger re-renders automatically
   
   🔧 Internal State vs Props:
   - Local state: UI interactions chỉ component này quan tâm
   - Props: Data từ parent, read-only trong component này
   - State lifting: Khi nào nên move state lên parent
   - State isolation: Keep state càng local càng tốt

🎨 2. CONDITIONAL RENDERING MASTERY:
   📋 Ternary Operator Pattern:
   - {condition ? <ComponentA /> : <ComponentB />}
   - Hoàn toàn different UI based on state
   - Clean và readable code structure
   
   🔍 Logical AND Pattern:
   - {condition && <Component />}
   - Show/hide elements based on conditions
   - Prevent unnecessary DOM nodes
   
   🎭 Dynamic CSS Classes:
   - Template literals: `base ${condition ? 'extra' : ''}`
   - Multiple conditional classes
   - CSS styling based on component state

🎛️ 3. EVENT HANDLING EXCELLENCE:
   ⚡ Event Types:
   - onClick: Mouse/touch interactions
   - onChange: Form input changes
   - onKeyDown: Keyboard shortcuts
   
   📡 Event Flow:
   - Browser event → React SyntheticEvent → Handler function
   - Event object properties: e.target.value, e.key
   - Prevent default behaviors khi cần
   
   🔄 Callback Communication:
   - Parent-to-child: Props
   - Child-to-parent: Callback functions
   - Unidirectional data flow pattern

⌨️ 4. USER EXPERIENCE PATTERNS:
   🎯 Keyboard Shortcuts:
   - Enter: Confirm/Save actions
   - Escape: Cancel/Exit actions
   - Standard UX conventions
   - Power user productivity
   
   💬 User Feedback:
   - Confirmation dialogs cho destructive actions
   - Tooltips giải thích button functionality
   - Visual states (completed, editing)
   - Loading states và error handling
   
   🎨 Visual Design:
   - Icon buttons with universal symbols
   - Color coding cho different states
   - Smooth transitions và animations
   - Mobile-friendly touch targets

🏗️ COMPONENT ARCHITECTURE DEEP DIVE:

📦 1. COMPONENT TYPE CLASSIFICATION:
   🎯 Smart Component (có state):
   - Quản lý internal UI state
   - Business logic cho user interactions
   - Coordinate giữa UI và data
   
   vs Dumb Component (pure):
   - Chỉ hiển thị data từ props
   - Không có internal state
   - Dễ test và reuse hơn

� 2. COMPONENT COMMUNICATION:
   📥 Props Interface Design:
   - task: Data object với structure defined
   - onToggle, onDelete, onEdit: Action callbacks
   - Clear separation of concerns
   - Type safety với PropTypes/TypeScript
   
   📤 Callback Pattern:
   - Child gọi parent function qua props
   - Parent updates state → child re-renders
   - Unidirectional data flow maintained

🔄 3. LIFECYCLE VÀ RE-RENDERING:
   📊 When Component Re-renders:
   - Props change từ parent
   - Internal state updates
   - Parent component re-renders
   - Context value changes
   
   ⚡ Performance Considerations:
   - Minimize unnecessary re-renders
   - Stable callback references
   - React.memo() cho expensive components
   - useMemo() và useCallback() optimization

🎨 STYLING VÀ CSS INTEGRATION:

🎭 1. CSS CLASS MANAGEMENT:
   📋 Dynamic Classes Strategy:
   - Base classes cho core styling
   - Modifier classes cho states
   - BEM methodology compatibility
   - CSS-in-JS alternative approaches
   
   🎨 State-based Styling:
   - .task-item.completed: Completed task styling
   - .task-item.editing: Edit mode styling  
   - CSS transitions cho smooth animations
   - Responsive design considerations

📱 2. ACCESSIBILITY EXCELLENCE:
   ♿ Semantic HTML:
   - <button> cho interactive elements
   - <li> cho list item structure
   - title attributes cho screen readers
   - Proper ARIA labels khi cần
   
   ⌨️ Keyboard Navigation:
   - Tab order logical và intuitive
   - Enter/Space activation cho buttons
   - Escape key cho modal/edit cancel
   - Focus management trong edit mode

� PERFORMANCE VÀ OPTIMIZATION:

⚡ 1. RENDERING PERFORMANCE:
   🔧 Optimization Techniques:
   - React.memo() wrap component
   - useCallback() cho stable functions
   - useMemo() cho expensive calculations
   - Key props cho list rendering
   
   📊 Performance Monitoring:
   - React DevTools Profiler
   - Console logging cho debug
   - Measure render times
   - Memory leak detection

💾 2. MEMORY MANAGEMENT:
   🔄 Cleanup Patterns:
   - useEffect cleanup functions
   - Event listener removal
   - Timer clearance
   - Subscription unsubscribe

🧪 TESTING STRATEGIES:

🔍 1. UNIT TESTING:
   ✅ Test Cases:
   - Render với different props
   - User interactions (click, type, keyboard)
   - State changes và UI updates
   - Callback function calls
   
   🎯 Testing Tools:
   - Jest cho test runner
   - React Testing Library cho DOM testing
   - Enzyme alternative approaches
   - Mock functions cho callbacks

🎭 2. INTEGRATION TESTING:
   🔗 Component Integration:
   - Parent-child communication
   - State management flows
   - User workflows end-to-end
   - Error boundary handling

TaskItem component này demonstrates production-ready React development
với comprehensive patterns, user experience, performance, và maintainability.
Perfect foundation cho building complex task management applications! 🚀
*/