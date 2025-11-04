// 📝 EXERCISES 02: Object Spread
// Chạy: node exercises-02.js

console.log('=== BÀI 2: Object Spread ===\n');

const base = { theme: 'light', lang: 'vi', sidebar: true };
const override = { theme: 'dark' };

// TODO 1: Tạo copy của base tên baseCopy. In ra base===baseCopy?
// const baseCopy = ...
// console.log('base===baseCopy?', base === baseCopy);

// TODO 2: Merge base với override thành settings (ưu tiên override)
// const settings = ...
// console.log('settings:', settings); // { theme:'dark', lang:'vi', sidebar:true }

const user = {
  id: 1,
  name: 'John',
  profile: { city: 'Hanoi', street: 'Le Loi' },
};

// TODO 3: Cập nhật city của user thành 'HCM' (immutably) → newUser
// const newUser = ...
// console.log('newUser:', newUser);
// console.log('user === newUser?', user === newUser); // false
// console.log('user.profile === newUser.profile?', user.profile === newUser.profile); // false

const account = {
  id: 1,
  username: 'john',
  password: 'secret',
  email: 'john@example.com',
};
// TODO 4: Loại bỏ key password khỏi account bằng object rest → safeAccount
// const { /* destructure with rest */ } = account;
// console.log('safeAccount:', safeAccount); // không có password

console.log('\n✅ Xong bài 2!');
