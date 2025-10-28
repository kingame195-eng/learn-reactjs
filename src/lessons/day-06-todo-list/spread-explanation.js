// 🎯 GIẢI THÍCH SPREAD TRONG TODO CONTEXT

function TodoExample() {
    const todoList = [
        { id: 1, title: 'Eat', status: 'new' },
        { id: 2, title: 'Sleep', status: 'completed' },
        { id: 3, title: 'Code', status: 'new' }
    ];

    // ❌ CÁCH SAI - Reference Copy:
    const badUpdate = (index) => {
        const badCopy = todoList;           // ← Chỉ copy reference, không copy data
        badCopy[index].status = 'completed'; // ← Thay đổi ORIGINAL array luôn!

        // React KHÔNG phát hiện được thay đổi vì reference vẫn như cũ
        // → Component KHÔNG re-render
        // → UI KHÔNG cập nhật

        return badCopy; // ← Trả về cùng reference → React nghĩ không có gì thay đổi
    };

    // ✅ CÁCH ĐÚNG - Spread Copy:
    const goodUpdate = (index) => {
        // BƯỚC 1: Tạo array mới với spread operator
        const newTodoList = [...todoList];  // ← Tạo array MỚI với data cũ

        // BƯỚC 2: Tạo object mới cho item cần thay đổi
        newTodoList[index] = {
            ...newTodoList[index],           // ← Copy tất cả properties cũ
            status: 'completed'              // ← Override property cần thay đổi
        };

        // React phát hiện được:
        // - newTodoList !== todoList (khác reference)
        // - → Trigger re-render
        // - → UI cập nhật

        return newTodoList; // ← Trả về reference MỚI → React biết có thay đổi
    };

    return <div>Spread Operator trong Todo Context</div>;
}

export default TodoExample;