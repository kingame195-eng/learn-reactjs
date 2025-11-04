// 📝 EXERCISES 01: Object Destructuring
// Làm trực tiếp trong file này, sau đó chạy: node exercises-01.js

console.log('=== BÀI 1: Object Destructuring ===\n');

const user = {
  id: 1,
  username: 'john_doe',
  email: 'john@example.com',
  address: {
    city: 'Hanoi',
    street: 'Le Loi',
    zipCode: '10000',
  },
  settings: {
    theme: 'dark',
    language: 'vi',
  },
};

// TODO 1: Lấy username và email
// const { username, email } = ...
// console.log(username, email);
// Expected: 'john_doe' 'john@example.com'
const { username, email } = user;
console.log(username, email);

// TODO 2: Lấy city từ address
// const { address: { city } } = ...
// console.log(city);
// Expected: 'Hanoi'
const {
  address: { city },
} = user;
console.log(city);

// TODO 3: Lấy theme và language từ settings
// const { settings: { theme, language } } = ...
// console.log(theme, language);
// Expected: 'dark' 'vi'
const {
  settings: { theme, language },
} = user;
console.log(theme, language);

// TODO 4: Lấy username và city trong 1 dòng
// const { username, address: { city } } = ...
// console.log(username, city);
// Expected: 'john_doe' 'Hanoi'
{
  const {
    username,
    address: { city },
  } = user;
  console.log(username, city);
}

console.log('\n✅ Xong bài 1! Chạy: node exercises-01.js để test');
