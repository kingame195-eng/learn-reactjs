// 📝 EXERCISES 01: Rewrite to Arrow
// Chạy: node exercises-01.js

console.log('=== BÀI 1: Rewrite to Arrow ===\n');

// TODO 1: Viết lại các hàm sau thành arrow 1 dòng nếu có thể
function add(a, b) {
  return a + b;
}
function square(x) {
  return x * x;
}
function getUser(id) {
  return { id, name: 'User' + id };
}

// Viết lại ở đây:
// const add2 = ...
// const square2 = ...
// const getUser2 = ... // lưu ý trả object

console.log('\n✅ Xong bài 1!');
