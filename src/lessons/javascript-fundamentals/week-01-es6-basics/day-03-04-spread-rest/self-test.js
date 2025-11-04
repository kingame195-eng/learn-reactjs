// 📊 SELF-TEST: Spread & Rest (5 phút, không Google)
// Chạy: node self-test.js

console.log('=== SELF-TEST: Spread & Rest ===\n');

// Test 1: Copy array và thêm 0 ở đầu, 999 ở cuối (immutably)
const arr = [1, 2, 3];
// TODO: const out1 = ...
// console.log('out1:', out1); // [0,1,2,3,999]
// console.log('arr after:', arr); // [1,2,3]

// Test 2: Merge user với updates, ưu tiên updates; loại bỏ password khỏi kết quả
const user = { id: 1, name: 'John', password: 'secret', city: 'HN' };
const updates = { city: 'HCM', age: 25 };
// TODO: const merged = ...
// TODO: const { password, ...safe } = merged;
// console.log('safe:', safe); // không có password, city='HCM', age=25

// Test 3: sumEven(...nums) → tổng số chẵn
// TODO: function sumEven(/* ...nums */) {}
// console.log('sumEven:', sumEven(1,2,3,4,5,6)); // 12

console.log('\n✅ Done! Mục tiêu: 3/3 trong 5 phút');
