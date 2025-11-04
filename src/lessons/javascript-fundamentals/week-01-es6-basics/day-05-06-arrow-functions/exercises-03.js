// 📝 EXERCISES 03: this & bind
// Chạy: node exercises-03.js

console.log('=== BÀI 3: this & bind ===\n');

const obj = {
  value: 0,
  incLater() {
    // TODO 1: Sau 10ms tăng value lên 1 (this phải trỏ đúng obj)
    // setTimeout(function(){ this.value++; }, 10); // ❌ this không đúng
    // Sửa dùng arrow ở đây
  },
  forEachLog(arr) {
    // TODO 2: In từng phần tử arr, đảm bảo this trỏ obj
    // arr.forEach(function(x){ console.log(this.value, x); }); // ❌
    // Sửa dùng arrow ở đây
  },
};

// TODO 3: Method cần this động — viết bằng function thường
const counter = {
  count: 0,
  add(n) {
    this.count += n;
  }, // giữ nguyên function thường
  // Viết 1 method sai bằng arrow để thấy vấn đề (comment kèm giải thích)
  // addArrow: (n) => { this.count += n; } // ❌ this của arrow không phải counter
};

console.log('\n✅ Xong bài 3!');
