// 📋 TASKLIST COMPONENT - Container component cho danh sách tasks
import React from 'react';
import TaskItem from './TaskItem';

/**
 * 🎯 TASKLIST COMPONENT - CONTAINER COMPONENT CHO TASK MANAGEMENT
 * 
 * 📋 CHỨC NĂNG CHÍNH:
 * 1. 📊 LIST RENDERING: Render dynamic list of tasks từ array
 * 2. 🎭 EMPTY STATE: Hiển thị friendly message khi không có tasks
 * 3. 📡 PROPS DELEGATION: Forward callbacks xuống TaskItem children
 * 4. 📈 PERFORMANCE: Optimized rendering với React.memo
 * 5. 🎨 UI STRUCTURE: Semantic HTML với accessibility support
 * 6. 📊 STATISTICS: Display task count và summary information
 * 
 * 🏗️ KIẾN TRÚC COMPONENT:
 * - Type: Container/Presentational hybrid
 * - Responsibility: List management và child coordination
 * - State: Stateless (nhận data qua props)
 * - Communication: Props drilling pattern cho deep component tree
 * - Performance: Memoized với React.memo cho stable rendering
 * 
 * 📦 PROPS INTERFACE:
 * - tasks: Array of task objects để render
 * - onToggle: Callback khi toggle task completion
 * - onDelete: Callback khi delete task
 * - onEdit: Callback khi edit task content
 * - emptyMessage: Custom message cho empty state (optional with default)
 */

const TaskList = ({
    // 📊 DATA PROPS - Dữ liệu để render
    tasks,              // Array: Danh sách tasks cần hiển thị

    // 📡 CALLBACK PROPS - Functions để communicate với parent
    onToggle,           // Function: Toggle completion status của task
    onDelete,           // Function: Delete task khỏi list
    onEdit,             // Function: Update task content

    // 🎨 CUSTOMIZATION PROPS - Tùy chỉnh UI
    emptyMessage = "Chưa có task nào. Hãy thêm task đầu tiên!"
    /* 
    💡 DEFAULT PARAMETER PATTERN:
    - emptyMessage = "...": ES6 default parameter
    - Cho phép parent component customize empty state message
    - Nếu parent không truyền prop này, sử dụng default value
    - Better UX: component flexible và reusable trong contexts khác nhau
    - Alternative: có thể dùng defaultProps (older pattern)
    */
}) => {

    // 🐛 DEBUG LOG: Theo dõi component render và data state
    console.log('🔄 RENDER - TaskList', {
        taskCount: tasks.length,        // Số lượng tasks hiện tại
        isEmpty: tasks.length === 0,    // Kiểm tra empty state
        firstTask: tasks[0]?.text,      // Text của task đầu tiên (nếu có)
        timestamp: new Date().toLocaleTimeString()
    });
    /* 
    📊 DEBUG LOG ANALYSIS:
    - console.log(): Development debugging, should remove in production
    - Object destructuring để log multiple values clearly
    - Optional chaining (?.) để avoid errors khi array empty
    - Timestamp để track render frequency và performance
    */

    // 📝 EMPTY STATE RENDERING - Early return pattern
    if (tasks.length === 0) {
        /* 
        🎯 EARLY RETURN PATTERN:
        - Kiểm tra edge case đầu tiên (empty array)
        - Return early để avoid nested conditional rendering
        - Cleaner code structure, easier to read
        - Guard clause pattern: handle special cases first
        */

        return (
            <div className="task-list-empty">
                {/* 
                🎨 EMPTY STATE UI DESIGN:
                - Visual hierarchy: icon → message → hint
                - Friendly tone để encourage user action
                - Clear call-to-action (implicit: "thêm task đầu tiên")
                - CSS class "task-list-empty" cho styling flexibility
                */}

                <div className="empty-icon">📝</div>
                {/* 📝 VISUAL ICON: Universal symbol for tasks/notes */}

                <p className="empty-message">{emptyMessage}</p>
                {/* 
                💬 DYNAMIC MESSAGE:
                - {emptyMessage}: Sử dụng prop value (customizable)
                - Default value đã set trong parameter
                - Parent có thể override message cho different contexts
                - <p> semantic HTML cho text content
                */}

                <p className="empty-hint">Bắt đầu với task đầu tiên của bạn!</p>
                {/* 
                💡 ENCOURAGEMENT TEXT:
                - Secondary message để guide user action
                - Positive, encouraging tone
                - Clear next step hint
                - Separate <p> cho different styling options
                */}
            </div>
        );
        /* 
        🎭 EMPTY STATE UX PRINCIPLES:
        - Clear visual feedback: user hiểu app đang work
        - Positive messaging: không làm user feel bad
        - Actionable guidance: hint về next steps
        - Visual appeal: icon + typography hierarchy
        - Accessibility: semantic HTML structure
        */
    }

    // 📋 TASK LIST RENDERING - Main component content
    return (
        <div className="task-list">
            {/* 
            🏗️ MAIN CONTAINER:
            - CSS class "task-list" cho styling và layout
            - Flexbox/Grid container trong CSS
            - Semantic structure cho accessibility
            */}

            <div className="task-list-header">
                {/* 📊 LIST HEADER - Title và statistics */}
                <h3>📋 Danh sách công việc</h3>
                {/* 
                🎯 SEMANTIC HEADING:
                - <h3>: Proper heading hierarchy (assuming h1, h2 ở higher levels)
                - Screen readers navigate by headings
                - SEO benefits nếu app có search indexing
                - Icon 📋 cho visual appeal
                */}

                <span className="task-count">
                    {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </span>
                {/* 
                📈 DYNAMIC TASK COUNT:
                - {tasks.length}: Real-time count of tasks
                - Conditional pluralization: "task" vs "tasks"
                - tasks.length !== 1 ? 's' : '': Grammar-correct English
                - <span> cho inline styling, không break layout
                - User feedback: immediate visual confirmation of list size
                */}
            </div>

            <ul className="task-items">
                {/* 
                📋 SEMANTIC LIST STRUCTURE:
                - <ul>: Unordered list, semantically correct
                - Screen readers announce as list với item count
                - CSS styling có thể remove default bullets
                - Accessibility: proper list navigation
                */}

                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
                {/* 
                � ARRAY.MAP() RENDERING ANALYSIS:
                - tasks.map(task => <TaskItem />): Transform array thành JSX elements
                - key={task.id}: Unique React key cho efficient reconciliation
                - task={task}: Pass entire task object làm prop
                - Callback props: onToggle, onDelete, onEdit drilling xuống children
                - Pattern: Parent quản lý data, children handle user interactions
                - Performance: React chỉ re-render changed items với proper keys
                */}
            </ul>
            {/* 
            🎯 LIST RENDERING ANALYSIS:
            - Dynamic rendering: list size thay đổi theo tasks array
            - Each TaskItem independent: có thể edit, delete riêng biệt
            - Performance: React chỉ re-render changed items (with proper keys)
            - Scalability: works với any number of tasks
            */}
        </div>
    );
    /* 
    🏗️ COMPONENT STRUCTURE SUMMARY:
    <div className="task-list">
      ├── <div className="task-list-header">
      │   ├── <h3> Title với icon
      │   └── <span> Task count với pluralization
      └── <ul className="task-items">
          └── TaskItem components (mapped từ tasks array)
    */
};

// 🚀 PERFORMANCE OPTIMIZATION với React.memo
export default React.memo(TaskList);
/* 
🚀 REACT.MEMO() OPTIMIZATION:
- React.memo(): Higher-Order Component cho performance optimization
- Shallow comparison của props trước mỗi render
- Skip re-render nếu props không thay đổi
- Perfect cho list components với stable props
- Alternative: useMemo() cho individual values, React.PureComponent cho class components

📊 WHEN TO USE REACT.MEMO:
- Component renders frequently
- Props comparison cost < render cost
- Props thường stable between renders
- Parent re-renders often but child props unchanged

⚠️ MEMO CONSIDERATIONS:
- Shallow comparison only: nested objects cần careful handling
- Callback props should be stable (useCallback trong parent)
- Over-optimization có thể hurt performance
*/

/*
🎓 KIẾN THỨC REACT TOÀN DIỆN - TASKLIST COMPONENT DEEP DIVE

📋 REACT PATTERNS VÀ CONCEPTS:

🔄 1. PROPS DRILLING PATTERN:
   📡 Component Communication:
   - Parent → Child: Data props (tasks array)
   - Child → Parent: Callback props (onToggle, onDelete, onEdit)
   - Multi-level: TaskManagerApp → TaskList → TaskItem
   - Unidirectional data flow: data down, events up
   
   🎯 Props Drilling Trade-offs:
   ✅ Advantages:
   - Explicit data flow, easy to trace
   - Type-safe với TypeScript
   - Simple to understand và debug
   - No magic, clear dependencies
   
   ⚠️ Disadvantages:
   - Boilerplate khi component tree deep
   - Intermediate components pass unused props
   - Refactoring khó khi move components
   
   🔧 Alternatives:
   - Context API cho shared state
   - State management libraries (Redux, Zustand)
   - Component composition patterns

📊 2. CONDITIONAL RENDERING MASTERY:
   🎭 Early Return Pattern:
   - if (condition) return <ComponentA />
   - Avoid nested ternary operators
   - Handle edge cases first
   - Cleaner code structure
   
   🔍 Guard Clauses:
   - Check for null, undefined, empty arrays
   - Prevent runtime errors
   - Better user experience với meaningful messages
   - Performance: avoid expensive operations on invalid data

🔄 3. LIST RENDERING EXCELLENCE:
   📋 Array.map() Best Practices:
   - Stable keys: task.id thay vì array index
   - Key uniqueness across entire list
   - Performance: React reconciliation algorithm
   - Avoid creating objects trong render (use useMemo nếu cần)
   
   🎯 Dynamic List Considerations:
   - Add/remove operations efficiency
   - Sort operations và key stability
   - Infinite scrolling với pagination
   - Virtual scrolling cho very large lists

🏗️ COMPONENT ARCHITECTURE DEEP DIVE:

📦 1. COMPONENT RESPONSIBILITIES:
   🎯 TaskList Scope:
   - List management và coordination
   - Empty state handling
   - Child component composition
   - Performance optimization
   
   ❌ NOT TaskList's Job:
   - Individual task business logic
   - Form validation
   - API calls (should be in parent/custom hooks)
   - Complex state management

🔗 2. COMPONENT COMPOSITION:
   🧩 Composition vs Inheritance:
   - React favors composition over inheritance
   - TaskList composes TaskItem components
   - Flexible, reusable component architecture
   - Easy testing và maintenance
   
   📡 Props Interface Design:
   - Minimal props surface area
   - Clear contracts between components
   - Optional props với sensible defaults
   - Callback props cho event handling

🎨 3. UI/UX ARCHITECTURE:
   📱 Responsive Design Considerations:
   - Semantic HTML cho accessibility
   - CSS classes cho styling flexibility
   - Mobile-first design patterns
   - Touch-friendly interfaces
   
   ♿ Accessibility Excellence:
   - Proper heading hierarchy (h1 → h2 → h3)
   - Screen reader navigation
   - Keyboard accessibility
   - ARIA labels khi cần

🚀 PERFORMANCE VÀ OPTIMIZATION:

⚡ 1. RENDERING PERFORMANCE:
   🔧 React.memo() Strategy:
   - Wrap expensive components
   - Stable props với useCallback/useMemo trong parent
   - Profile before và after optimization
   - Measure actual performance improvements
   
   📊 Re-render Triggers:
   - Props changes (shallow comparison)
   - Parent component re-renders
   - Context value changes
   - State updates trong ancestors

💾 2. MEMORY OPTIMIZATION:
   🔄 Cleanup Patterns:
   - Avoid memory leaks trong large lists
   - Cleanup subscriptions trong TaskItem
   - Proper key management
   - Virtual scrolling cho massive datasets

🧪 TESTING STRATEGIES:

🔍 1. UNIT TESTING:
   ✅ Test Scenarios:
   - Empty state rendering
   - List rendering với different task counts
   - Props passing to children
   - React.memo optimization behavior
   
   🎯 Testing Tools:
   - Jest + React Testing Library
   - Mock TaskItem component
   - Snapshot testing cho stable UI
   - Performance testing với large datasets

� 2. INTEGRATION TESTING:
   🔗 Component Integration:
   - Parent-child communication
   - Event bubbling và handling
   - State updates flow
   - Error boundary integration

📈 SCALABILITY CONSIDERATIONS:

🔧 1. LARGE DATASETS:
   📊 Performance Patterns:
   - Virtual scrolling implementation
   - Pagination strategies
   - Search và filtering optimization
   - Lazy loading techniques
   
   💾 Memory Management:
   - Component unmounting
   - Event listener cleanup
   - Large object references
   - Browser resource limits

🌐 2. REAL-WORLD SCENARIOS:
   🚀 Production Patterns:
   - Error boundaries cho robustness
   - Loading states và skeleton screens
   - Offline support với service workers
   - Analytics và user behavior tracking

TaskList component này demonstrates production-ready React architecture
với performance optimization, accessibility, và scalability considerations.
Perfect foundation cho building complex list-based applications! 🎯
*/