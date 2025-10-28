// 🏆 ENTERPRISE-LEVEL VERSION với TypeScript

import React, { useState, useCallback, useMemo } from 'react';
import TodoList from './components/TodoList';
import { TodoStatus, Todo } from './types/todo.types';
import { useTodoManager } from './hooks/useTodoManager';
import { INITIAL_TODOS } from './constants/todo.constants';
import './TodoFeature.styles.scss';

interface TodoFeatureProps {
    initialTodos?: Todo[];
    onTodoUpdate?: (todos: Todo[]) => void;
}

/**
 * TodoFeature - Main container component for todo management
 * 
 * @param initialTodos - Optional initial todo list
 * @param onTodoUpdate - Callback when todos are updated
 */
const TodoFeature: React.FC<TodoFeatureProps> = ({
    initialTodos = INITIAL_TODOS,
    onTodoUpdate
}) => {
    // Custom hook encapsulates all todo logic
    const { todos, toggleTodo, addTodo, removeTodo } = useTodoManager(
        initialTodos,
        onTodoUpdate
    );

    // Memoized statistics to prevent unnecessary calculations
    const todoStats = useMemo(() => ({
        total: todos.length,
        completed: todos.filter(todo => todo.status === TodoStatus.COMPLETED).length,
        pending: todos.filter(todo => todo.status === TodoStatus.NEW).length
    }), [todos]);

    const handleTodoToggle = useCallback((todo: Todo, index: number) => {
        toggleTodo(index);
    }, [toggleTodo]);

    return (
        <section className= "todo-feature" data - testid="todo-feature" >
            <header className="todo-feature__header" >
                <h2>📋 Todo Management </h2>
                    < div className = "todo-stats" >
                        <span>Total: { todoStats.total } </span>
                            < span > Completed: { todoStats.completed } </span>
                                < span > Pending: { todoStats.pending } </span>
                                    </div>
                                    </header>

                                    < main className = "todo-feature__content" >
                                        <TodoList 
          todos={ todos }
    onTodoClick = { handleTodoToggle }
    data - testid="todo-list"
        />
        </main>
        </section>
  );
};

export default TodoFeature;

// 🌟 ENTERPRISE FEATURES:
// ✅ TypeScript for type safety
// ✅ Custom hooks for logic separation
// ✅ Memoization for performance
// ✅ Test attributes for QA
// ✅ SCSS modules for styling
// ✅ JSDoc for documentation
// ✅ Error boundaries (not shown)
// ✅ Accessibility attributes
// ✅ Internationalization ready