// 🧪 TEST: Chứng minh thứ tự comment không ảnh hưởng execution

console.log('=== TEST EXECUTION ORDER ===');

// BƯỚC 999: Function này có comment số lớn nhưng sẽ chạy đầu tiên
function step999() {
    console.log('✅ BƯỚC 999 - Function executed first (despite comment number)');
}

// BƯỚC 1: Variable này có comment số nhỏ nhưng sẽ chạy sau function
const step1 = "BƯỚC 1 - Variable created after function";

// CHẠY THỬ:
step999();  // ← Chạy được vì function đã được định nghĩa ở trên
console.log('✅', step1);

console.log('=== KẾT LUẬN: Comment numbers không ảnh hưởng execution order! ===');

export default function TestFlow() {
    return <div>Check console for test results</div>;
}