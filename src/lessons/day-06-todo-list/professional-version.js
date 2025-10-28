// 🔥 PROFESSIONAL VERSION - Clean & Production Ready

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';

// 📋 Constants - Separated for reusability
const TODO_STATUS = {
    NEW: 'new',
    COMPLETED: 'completed'
};

const INITIAL_TODOS = [
    { id: 1, title: 'Eat', status: TODO_STATUS.NEW },
    { id: 2, title: 'Sleep', status: TODO_STATUS.COMPLETED },
    { id: 3, title: 'Code', status: TODO_STATUS.NEW }
];

// 🛠️ Helper function - Pure function for business logic
const toggleTodoStatus = (todos, index) => {
    const newTodos = [...todos];
    const currentTodo = newTodos[index];

    newTodos[index] = {
        ...currentTodo,
        status: currentTodo.status === TODO_STATUS.COMPLETED
            ? TODO_STATUS.NEW
            : TODO_STATUS.COMPLETED
    };

    return newTodos;
};

// 🧩 Main Component - Focus on component logic only
function TodoFeature() {
    const [todos, setTodos] = useState(INITIAL_TODOS);

    // useCallback prevents unnecessary re-renders of child components
    const handleTodoToggle = useCallback((todo, index) => {
        setTodos(currentTodos => toggleTodoStatus(currentTodos, index));
    }, []);

    return (
        <div className="todo-feature">
            <header>
                <h2>📋 Todo Management</h2>
            </header>

            <main>
                <TodoList
                    todos={todos}
                    onTodoClick={handleTodoToggle}
                />
            </main>
        </div>
    );
}

TodoFeature.propTypes = {
    // No props for this component, but keeping structure for future expansion
};

export default TodoFeature;

// 📝 What makes this PROFESSIONAL:
// ✅ Constants extracted and named clearly
// ✅ Business logic separated into pure functions
// ✅ useCallback for performance optimization
// ✅ Semantic HTML structure
// ✅ Clean variable names (todos vs todoList)
// ✅ No verbose comments - code is self-explanatory
// ✅ Follows React best practices
// ✅ Easy to test and maintain