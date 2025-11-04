// 📝 EXERCISES 01: Array Spread
// Chạy: node exercises-01.js

console.log('=== BÀI 1: Array Spread ===\n');

const a = [1, 2, 3];
const b = [4, 5];

// TODO 1: Tạo bản sao của a, tên là aCopy, và chứng minh a !== aCopy
// const aCopy = ...
// console.log('a===aCopy?', a === aCopy);

// TODO 2: Merge a và b thành array mới ab = [1,2,3,4,5]
// const ab = ...
// console.log('ab:', ab);

// TODO 3: Thêm 0 vào đầu a, 99 vào cuối a (immutably), in ra newA
// const newA = ...
// console.log('newA:', newA); // [0,1,2,3,99]
// console.log('a after:', a); // vẫn [1,2,3]

// TODO 4: Chèn 999 vào giữa a (sau số 2) mà không mutate a
// Hint: dùng slice + spread
// const insertAt2 = ...
// console.log('insertAt2:', insertAt2); // [1,2,999,3]

// TODO 5: Xóa phần tử index=1 khỏi a (immutably)
// const removedIdx1 = ...
// console.log('removedIdx1:', removedIdx1); // [1,3]

console.log('\n✅ Xong bài 1!');
