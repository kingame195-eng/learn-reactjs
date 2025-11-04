// 📝 EXERCISES 04: Mix Nâng Cao (Spread + Rest)
// Chạy: node exercises-04.js

console.log('=== BÀI 4: Mix Nâng Cao ===\n');

// TODO 1: Destructure tham số hàm để tách id và phần còn lại
// function pickIdAndRest(obj) { /* return { id, rest } */ }
// Ví dụ:
// const out = pickIdAndRest({ id: 10, name: 'A', age: 20 });
// console.log(out); // { id:10, rest:{ name:'A', age:20 } }

// TODO 2: Cập nhật 1 item trong array of objects theo id (immutably)
const list = [
  { id: 1, name: 'A', score: 10 },
  { id: 2, name: 'B', score: 15 },
  { id: 3, name: 'C', score: 20 },
];
// Yêu cầu: tăng score của id=2 lên 18 → newList (không mutate list)
// const newList = ...
// console.log('newList:', newList);
// console.log('list===newList?', list === newList); // false
// console.log('item 2 ref equal?', list[1] === newList[1]); // false

// TODO 3: Hợp nhất mảng và loại trùng bằng Set + spread
// const u = ... // từ [1,2,2,3] và [2,3,4] -> [1,2,3,4]
// console.log('unique merged:', u);

// TODO 4: Demo shallow copy pitfall
const state = {
  user: { profile: { city: 'HN', tags: ['js'] } },
};
// Sai: shallow copy không đủ khi đổi nested sâu
// const wrong = { ...state };
// wrong.user.profile.city = 'HCM';
// console.log('state.user.profile.city:', state.user.profile.city); // ❌ bị đổi theo

// Đúng: copy từng tầng cần đổi
// const fixed = { ...state, user: { ...state.user, profile: { ...state.user.profile, city: 'HCM' } } };
// console.log('fixed.user.profile.city:', fixed.user.profile.city); // 'HCM'
// console.log('state.user.profile.city:', state.user.profile.city); // 'HN'

console.log('\n✅ Xong bài 4!');
