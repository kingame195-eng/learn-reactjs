// 🔍 TASKFILTERS COMPONENT - Bộ lọc và sắp xếp tasks cực mạnh
import React from 'react';

/**
 * 🎯 TASKFILTERS COMPONENT - HỆ THỐNG LỌC VÀ SẮP XẾP TOÀN DIỆN
 * 
 * 📋 CHỨC NĂNG CHÍNH:
 * 1. 🔍 SEARCH: Tìm kiếm tasks theo nội dung text
 * 2. 🏷️ FILTER: Lọc tasks theo status (All/Active/Completed)  
 * 3. 🔄 SORT: Sắp xếp tasks theo tiêu chí khác nhau
 * 4. 📊 STATS: Hiển thị thống kê tổng quan
 * 5. ⚡ QUICK ACTIONS: Thao tác nhanh (toggle all, clear completed)
 * 6. 💡 USER GUIDANCE: Hướng dẫn sử dụng
 * 
 * 🏗️ KIẾN TRÚC COMPONENT:
 * - Type: Pure Presentational Component (không có state riêng)
 * - Pattern: Controlled Component (parent điều khiển tất cả state)
 * - Communication: Callback props để giao tiếp với parent
 * - Reusability: Có thể tái sử dụng cao, cấu hình qua props
 */

const TaskFilters = ({
    // 🔍 PROPS ĐIỀU KHIỂN FILTER & SEARCH
    currentFilter,      // string: Filter hiện tại ('all' | 'active' | 'completed')
    onFilterChange,     // function: Callback khi user thay đổi filter
    sortBy,            // string: Tiêu chí sắp xếp hiện tại
    onSortChange,      // function: Callback khi user thay đổi sort
    searchTerm,        // string: Từ khóa tìm kiếm hiện tại
    onSearchChange,    // function: Callback khi user nhập search

    // 📊 PROPS HIỂN THỊ DỮ LIỆU
    taskStats,         // object: Thống kê tasks { total, active, completed, completionRate }

    // ⚡ PROPS THAO TÁC NHANH
    onClearCompleted,  // function: Callback xóa completed tasks
    onToggleAll       // function: Callback toggle tất cả tasks
}) => {

    // 🐛 DEBUG LOG: Theo dõi render của component
    console.log('🔄 RENDER - TaskFilters', {
        currentFilter,    // Filter đang active
        sortBy,          // Phương thức sort hiện tại
        searchTerm,      // Query search hiện tại
        taskStats,       // Object thống kê
        timestamp: new Date().toLocaleTimeString()
    });

    // 🖼️ JSX RETURN - CẤU TRÚC UI COMPONENT
    return (
        <div className="task-filters">

            {/* 📊 PHẦN THỐNG KÊ TASKS - Tổng quan dashboard */}
            <div className="task-stats">
                <h3>📊 Thống kê</h3>
                <div className="stats-grid">

                    {/* 📈 BỘ ĐẾM TỔNG TASKS */}
                    <div className="stat-item">
                        <span className="stat-number">{taskStats.total}</span>
                        {/* 
                        📈 DATA BINDING ĐỘNG:
                        - {taskStats.total}: JSX expression hiển thị data
                        - taskStats object được truyền từ parent component
                        - Cập nhật real-time khi tasks thay đổi
                        */}
                        <span className="stat-label">Tổng cộng</span>
                    </div>

                    {/* 🏃‍♂️ BỘ ĐẾM TASKS ĐANG LÀM */}
                    <div className="stat-item">
                        <span className="stat-number">{taskStats.active}</span>
                        <span className="stat-label">Đang làm</span>
                    </div>

                    {/* ✅ BỘ ĐẾM TASKS HOÀN THÀNH */}
                    <div className="stat-item">
                        <span className="stat-number">{taskStats.completed}</span>
                        <span className="stat-label">Hoàn thành</span>
                    </div>

                    {/* 📈 TỶ LỆ HOÀN THÀNH */}
                    <div className="stat-item">
                        <span className="stat-number">{taskStats.completionRate}%</span>
                        {/* Tỷ lệ % = (completed / total) * 100 */}
                        <span className="stat-label">Tỷ lệ</span>
                    </div>
                </div>
            </div>

            {/* 🔍 PHẦN TÌM KIẾM - Real-time search */}
            <div className="search-section">
                <h4>🔍 Tìm kiếm</h4>
                <div className="search-box">

                    {/* 
                    🔄 CONTROLLED INPUT PATTERN:
                    - value={searchTerm}: Giá trị input được điều khiển bởi parent state
                    - searchTerm prop được truyền từ parent component
                    - "Controlled Component" pattern của React
                    - Đảm bảo single source of truth cho input value

                    ⚡ CHANGE EVENT HANDLER:
                    - onChange: React synthetic event handler
                    - (e) => ...: Arrow function xử lý event
                    - e.target.value: Lấy giá trị hiện tại từ DOM
                    - onSearchChange(): Callback prop thông báo parent
                    - Real-time search: chạy mỗi khi gõ phím
                        
                    🔄 LUỒNG EVENT:
                    1. User gõ vào input → onChange chạy
                    2. e.target.value chứa giá trị mới
                    3. onSearchChange(newValue) gọi function parent
                    4. Parent cập nhật searchTerm state
                    5. Component re-render với searchTerm mới
                    6. Input hiển thị giá trị đã cập nhật
                    7. Parent lọc tasks dựa trên searchTerm mới
                    */}

                    <input
                        type="text"
                        placeholder="Tìm task theo nội dung..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="search-input"
                    />

                    {searchTerm && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="clear-search"
                            title="Xóa tìm kiếm"
                        >
                            ❌
                        </button>
                    )}
                    {/* 
                    🔄 CONDITIONAL RENDERING - Nút Clear:
                    - {searchTerm && ...}: JSX conditional rendering
                    - searchTerm: kiểm tra truthy (không phải empty string)
                    - Chỉ hiện nút clear khi có text trong search
                    - Better UX: không làm rối UI khi không cần
                    - ❌ CLEAR SEARCH: Truyền empty string về parent
                    */}
                </div>
            </div>

            {/* 🏷️ PHẦN LỌC THEO STATUS - Phân loại tasks */}
            <div className="filter-section">
                <h4>🏷️ Lọc theo trạng thái</h4>
                <div className="filter-buttons">

                    {[
                        /* 📋 DỮ LIỆU CẤU HÌNH FILTER */
                        { key: 'all', label: '📋 Tất cả', icon: '📋' },
                        { key: 'active', label: '⏳ Đang làm', icon: '⏳' },
                        { key: 'completed', label: '✅ Hoàn thành', icon: '✅' }
                    ].map(filter => (
                        /* 
                        🔄 ARRAY.MAP() RENDERING:
                        - .map(): Chuyển đổi array elements thành JSX
                        - filter: Phần tử hiện tại trong vòng lặp
                        - Return JSX element cho mỗi filter option
                        - React sẽ render tất cả elements được return
                        */

                        <button
                            key={filter.key}
                            onClick={() => onFilterChange(filter.key)}
                            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
                        >
                            {filter.icon} {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🔄 PHẦN TÙY CHỌN SẮP XẾP - Điều khiển thứ tự tasks */}
            <div className="sort-section">
                <h4>🔄 Sắp xếp</h4>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="sort-select"
                >
                    {/* 
                    🔄 CONTROLLED SELECT ANALYSIS:
                    - value={sortBy}: Giá trị được điều khiển bởi parent state
                    - onChange: e.target.value lấy option được chọn
                    */}
                    {/* 📋 CÁC TÙY CHỌN SẮP XẾP */}
                    <option value="created-desc">🕐 Mới nhất trước</option>
                    {/* Sắp xếp theo ngày tạo, mới nhất trước */}

                    <option value="created-asc">🕐 Cũ nhất trước</option>
                    {/* Sắp xếp theo ngày tạo, cũ nhất trước */}

                    <option value="text-asc">🔤 A → Z</option>
                    {/* Sắp xếp theo alphabet A đến Z */}

                    <option value="text-desc">🔤 Z → A</option>
                    {/* Sắp xếp theo alphabet Z đến A */}

                    <option value="status">✅ Hoàn thành trước</option>
                    {/* Sắp xếp theo trạng thái hoàn thành */}
                </select>
            </div>

            {/* ⚡ PHẦN THAO TÁC NHANH - Batch operations */}
            <div className="quick-actions">
                <h4>⚡ Thao tác nhanh</h4>

                <button
                    onClick={onToggleAll}
                    className="action-btn toggle-all"
                    title="Đánh dấu tất cả hoàn thành/chưa hoàn thành"
                >
                    🔄 Toggle tất cả
                </button>
                {/* 
                🔄 TOGGLE ALL FUNCTIONALITY:
                - onClick={onToggleAll}: Direct function reference
                - Không cần arrow function vì không truyền parameters
                - Parent implement smart toggle logic:
                  * Nếu tất cả tasks completed → đánh dấu tất cả uncompleted
                  * Nếu có task chưa completed → đánh dấu tất cả completed
                - Batch operation tiết kiệm thời gian cho users có nhiều tasks
                */}

                {taskStats.completed > 0 && (
                    <button
                        onClick={onClearCompleted}
                        className="action-btn clear-completed"
                        title={`Xóa ${taskStats.completed} task đã hoàn thành`}
                    >
                        🗑️ Xóa đã hoàn thành ({taskStats.completed})
                    </button>
                )}
                {/* 
                🗑️ NÚT CLEAR CÓ ĐIỀU KIỆN:
                - {taskStats.completed > 0 && ...}: Chỉ hiện nếu có completed tasks
                - Tránh làm rối UI khi không có tasks để clear
                - Smart UX: action chỉ có sẵn khi có ý nghĩa
                - onClick={onClearCompleted}: Xóa tất cả completed tasks khỏi list
                */}
            </div>

            {/* 💡 PHẦN HƯỚNG DẪN - Giúp users hiểu các tính năng có sẵn */}
            <div className="tips-section">
                <h4>💡 Mẹo sử dụng</h4>
                <ul className="tips-list">
                    <li>📝 Click vào task để chỉnh sửa</li>
                    <li>⌨️ Enter để lưu, Escape để hủy</li>
                    <li>🔍 Tìm kiếm theo từ khóa</li>
                    <li>📊 Theo dõi tiến độ hoàn thành</li>
                </ul>
            </div>
        </div>
    );
};

export default TaskFilters;

/*
🎓 GHI CHÚ HỌC TẬP TOÀN DIỆN - KIẾN THỨC REACT NÂNG CAO

📋 PATTERNS KIẾN TRÚC COMPONENT:

🎯 1. PURE PRESENTATIONAL COMPONENT:
   ✅ Ưu điểm:
   - Không có internal state = dễ test và debug hơn
   - Hành vi dự đoán được: cùng props → cùng output
   - Có thể tái sử dụng cao trong các contexts khác nhau
   - Parent điều khiển tất cả data và behavior
   - Có thể optimize với React.memo() nếu cần

🔄 2. CONTROLLED COMPONENTS PATTERN:
   - Tất cả form inputs (search, select) được điều khiển bởi parent state
   - value={parentState} + onChange={parentCallback}
   - Single source of truth cho tất cả form data
   - Cho phép form validation, reset, programmatic updates

🎨 3. THIẾT KẾ PROPS INTERFACE:
   📥 Data Props (cái gì để hiển thị):
   - currentFilter, sortBy, searchTerm, taskStats
   
   📤 Action Props (cách giao tiếp ngược lại):
   - onFilterChange, onSortChange, onSearchChange, onClearCompleted, onToggleAll
   
   💡 Lợi ích:
   - Tách biệt concerns rõ ràng
   - Dễ mock trong unit tests
   - Type-safe với TypeScript
   - Interface tự document

🔧 CÁC TÍNH NĂNG REACT ĐƯỢC DEMO:

🔄 1. CONDITIONAL RENDERING:
   - {condition && <Component />}: Hiện/ẩn elements
   - {condition ? <A /> : <B />}: Chọn giữa alternatives
   - Template literals với dynamic classes
   
   Ví dụ trong code:
   - Clear search button: {searchTerm && <button>}
   - Clear completed button: {taskStats.completed > 0 && <button>}
   - Active filter class: ${currentFilter === filter.key ? 'active' : ''}

📋 2. LIST RENDERING:
   - Array.map() để render dynamic lists
   - Key prop cho React reconciliation
   - Inline data structures cho configuration
   
   Ví dụ: Filter buttons array mapping

🎭 3. EVENT HANDLING:
   - Arrow functions trong JSX: () => callback(value)
   - Direct function references: onClick={callback}
   - Synthetic events: (e) => callback(e.target.value)
   - Event bubbling và prevention

📊 CONCEPTS XỬ LÝ DỮ LIỆU:

🔍 1. SEARCH IMPLEMENTATION:
   - Real-time filtering trên mỗi keystroke
   - Case-insensitive search (implemented trong parent)
   - Debouncing có thể thêm for performance với large lists
   - Clear functionality cho better UX

🏷️2. HỆ THỐNG FILTERING:
   - Multiple filter categories (all, active, completed)
   - Extensible design: dễ thêm filters mới
   - Visual feedback cho active filter
   - Default filter selection

🔄 3. CƠ CHẾ SORTING:
   - Multiple sort criteria (date, text, status)
   - Ascending/descending options
   - User preference preservation (có thể thêm localStorage)
   - Performance considerations cho large datasets

⚡ PATTERNS USER EXPERIENCE:

🎯 1. PROGRESSIVE DISCLOSURE:
   - Tips section cung cấp feature discovery
   - Tooltips giải thích button functionality
   - Clear visual hierarchy hướng dẫn user attention

📊 2. HỆ THỐNG FEEDBACK:
   - Statistics cung cấp progress feedback ngay lập tức
   - Visual states hiển thị current selections
   - Dynamic button text bao gồm context (count)

🔧 3. EFFICIENCY FEATURES:
   - Batch operations (toggle all, clear completed)
   - Keyboard shortcuts (documented trong tips)
   - Quick access đến common operations

🚀 PERFORMANCE CONSIDERATIONS:

💾 1. COMPONENT OPTIMIZATION:
   - Pure component → có thể dùng React.memo() nếu cần
   - Stable callback references ngăn unnecessary re-renders
   - Minimal prop drilling qua clean interface

🔄 2. RENDER OPTIMIZATION:
   - Conditional rendering giảm DOM nodes
   - Static arrays không re-create trên mỗi render
   - CSS classes thay vì inline styles cho better performance

📱 3. SCALABILITY:
   - Component xử lý bất kỳ số lượng tasks nào hiệu quả
   - Search và filter operations được delegate cho parent
   - Extensible architecture cho new features

Component TaskFilters này demonstrate production-ready React development
với proper architecture, user experience, và maintainability considerations.
*/