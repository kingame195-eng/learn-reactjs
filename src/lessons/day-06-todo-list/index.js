// BƯỚC 1: IMPORTS - JavaScript xử lý đầu tiên
import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';

// BƯỚC 2: FUNCTION DECLARATION - Được khai báo nhưng chưa chạy
function TodoFeature(props) {

    // BƯỚC 5: KHI COMPONENT RENDER LẦN ĐẦU - Tạo dữ liệu ban đầu
    const initTodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'completed'
        }
    ];

    // BƯỚC 6: Gọi useState và tạo state
    const [todoList, setTodoList] = React.useState(initTodoList);

    // BƯỚC 7: Khai báo function (chưa chạy, chỉ định nghĩa)
    const handleTodoClick = (todo, index) => {
        // BƯỚC 9: KHI USER CLICK - Function này mới chạy
        // Tạo copy array
        const newTodoList = [...todoList];

        // Thay đổi item
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'completed' ? 'new' : 'completed'
        };


        // BƯỚC 10: Update state → trigger re-render → quay lại BƯỚC 5
        setTodoList(newTodoList);
    };

    // BƯỚC 8: Return JSX để render
    return (
        <div>
            <h3>📋 Todo List</h3>
            <TodoList
                todoList={todoList}
                onToDoClick={handleTodoClick}
            />
        </div>
    );
}// BƯỚC 3: PROPTYPES ASSIGNMENT - Gán thuộc tính cho function
TodoFeature.propTypes = {};

// BƯỚC 4: EXPORT - JavaScript ghi nhận export
export default TodoFeature;