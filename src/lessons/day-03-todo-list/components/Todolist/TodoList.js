import React from 'react';
import PropTypes from 'prop-types';

// Simple TodoList component
function TodoList({ todos }) {
    // 🛡️ Defensive programming: Kiểm tra todos có phải array không
    if (!Array.isArray(todos)) {
        return (
            <div>
                <h3>📋 Todo List</h3>
                <p>⚠️ Error: todos phải là một array!</p>
            </div>
        );
    }

    return (
        <div>
            <h3>📋 Todo List</h3>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }))
};

TodoList.defaultProps = {
    todos: [] // Nếu không truyền todos, dùng array rỗng
};

export default TodoList;