// Import React library (thực thi cùng với BƯỚC 1 của parent)
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

// Component con này được gọi trong BƯỚC 8 của parent
export default function TodoList({ todoList, onToDoClick }) {
    // Nhận props từ parent trong BƯỚC 8

    // Function này sẽ được gọi khi user click (chưa chạy, chỉ định nghĩa)
    const handleTodoClick = (todo, index) => {
        console.log('🔍 TodoList - Click detected:', { todo, index, onToDoClick });

        // Kiểm tra function từ parent có tồn tại không
        if (!onToDoClick) {
            console.log('❌ onToDoClick is null/undefined');
            return;
        }

        // Gọi function của parent (chuyển sang BƯỚC 9)
        onToDoClick(todo, index);
    };

    // Render danh sách todo items
    return (
        <ul className="todo-list">
            {todoList.map((todo, index) => (
                <li
                    key={todo.id}
                    className={classNames({
                        'todo-item': true,
                        'completed': todo.status === "completed"
                    })}
                    onClick={() => handleTodoClick(todo, index)}>
                    {todo.title}
                </li>
            ))}
        </ul>
    );
}

// 🛡️ PropTypes validation
TodoList.propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired  // 👈 THIẾU: cần validate status
    })).isRequired,
    onToDoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todoList: [],
    onToDoClick: null,
};

/*
🔄 LUỒNG HOẠT ĐỘNG THEO THỨ TỰ 1-10 LIÊN TỤC:

BƯỚC 1: Import statements (index.js + TodoList.js)
BƯỚC 2: Function declaration TodoFeature (index.js)
BƯỚC 3: PropTypes assignment (index.js)
BƯỚC 4: Export statement (index.js)
BƯỚC 5: Tạo initTodoList (index.js - khi component render)
BƯỚC 6: Gọi useState (index.js - khi component render)
BƯỚC 7: Khai báo handleTodoClick (index.js - khi component render)
BƯỚC 8: Return JSX → render TodoList component (index.js)
BƯỚC 9: User click → gọi handleTodoClick → gọi parent handler (TodoList.js)
BƯỚC 10: setTodoList → re-render → quay lại BƯỚC 5 với state mới
*/