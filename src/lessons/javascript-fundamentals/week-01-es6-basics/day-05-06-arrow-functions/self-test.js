// 📊 SELF-TEST: Arrow Functions (5 phút)
// Chạy: node self-test.js

console.log('=== SELF-TEST: Arrow ===\n');

// 1) double: arrow 1 dòng
// const double = ...
// console.log(double(7)); // 14

// 2) pickId: arrow trả object { id }
// const pickId = obj => /* return object */
// console.log(pickId({ id: 1, name: 'A' })); // { id: 1 }

// 3) Sửa this trong setTimeout bằng arrow
const timer = {
  count: 0,
  start() {
    // setTimeout(function(){ this.count++; }, 5); // ❌ sai this
    // TODO: dùng arrow để this đúng
  },
};

console.log('\n✅ Mục tiêu: 3/3 trong 5 phút');
