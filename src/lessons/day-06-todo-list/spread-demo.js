// 🧪 DEMO: Tại sao cần Spread Operator

console.log('=== DEMO: Array Copy Methods ===');

// 📋 Array ban đầu
const originalTodos = [
    { id: 1, title: 'Eat', status: 'new' },
    { id: 2, title: 'Sleep', status: 'completed' }
];

console.log('🔵 Original Array:', originalTodos);

// ❌ CÁCH SAI: Gán trực tiếp (Reference Copy)
const wrongCopy = originalTodos;
wrongCopy[0].status = 'completed';

console.log('❌ Wrong Copy Method:');
console.log('   wrongCopy:', wrongCopy);
console.log('   originalTodos:', originalTodos); // ← BỊ THAY ĐỔI LUÔN!

// ✅ CÁCH ĐÚNG: Spread Operator (Shallow Copy)
const correctCopy = [...originalTodos];

// Reset lại để demo
originalTodos[0].status = 'new';

console.log('\n✅ Correct Copy Method:');
console.log('   Original before:', originalTodos);

correctCopy[0] = { ...correctCopy[0], status: 'completed' };

console.log('   correctCopy after change:', correctCopy);
console.log('   originalTodos after change:', originalTodos); // ← KHÔNG BỊ THAY ĐỔI

export default function SpreadDemo() {
    return <div>Check console for Spread Operator demo!</div>;
}