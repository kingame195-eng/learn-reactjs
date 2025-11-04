// 🎓 SOLUTIONS - Day 1-2: Destructuring
// ⚠️ CHỈ XEM SAU KHI ĐÃ TỰ LÀM HẾT!

console.log('=== 📚 SOLUTIONS: DESTRUCTURING ===\n');

// ========================================
// BÀI 1: Object Destructuring
// ========================================
console.log('--- BÀI 1: Object Destructuring ---\n');

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

// Solution 1: Lấy username và email
const { username, email } = user;
console.log('1. Username & Email:', username, email);
// Output: 'john_doe' 'john@example.com'

// Solution 2: Lấy city từ address
const {
  address: { city },
} = user;
console.log('2. City:', city);
// Output: 'Hanoi'

// Solution 3: Lấy theme và language từ settings
const {
  settings: { theme, language },
} = user;
console.log('3. Theme & Language:', theme, language);
// Output: 'dark' 'vi'

// Solution 4: Lấy username và city trong 1 dòng
// Cách 1: Dùng lại biến đã có (không khai báo lại)
console.log('4. Username & City:', username, city);
// Output: 'john_doe' 'Hanoi'

// Cách 2: Dùng alias để tránh conflict
const {
  username: userName2,
  address: { city: userCity },
} = user;
console.log('4 (alias):', userName2, userCity);

console.log('\n');

// ========================================
// BÀI 2: Array Destructuring
// ========================================
console.log('--- BÀI 2: Array Destructuring ---\n');

const numbers = [10, 20, 30, 40, 50];

// Solution 1: Lấy phần tử đầu và cuối
const first = numbers[0];
const last = numbers[numbers.length - 1];
console.log('1. First & Last:', first, last);
// Output: 10 50

// Hoặc dùng destructuring + array mới:
const [firstNum, lastNum] = [numbers[0], numbers[numbers.length - 1]];
console.log('1 (alternative):', firstNum, lastNum);

// Solution 2: Lấy 3 phần tử đầu, phần còn lại vào array mới
const [a, b, c, ...rest] = numbers;
console.log('2. First 3 & Rest:', [a, b, c], rest);
// Output: [10, 20, 30] [40, 50]

// Solution 3: Skip phần tử thứ 2 và 4
const [num1, , num3, , num5] = numbers;
console.log('3. Skip 2nd & 4th:', num1, num3, num5);
// Output: 10 30 50

// Solution 4: Combine và destructure
const fruits = ['apple', 'banana', 'orange'];
const vegetables = ['carrot', 'potato'];

const combined = [...fruits, ...vegetables];
const [firstItem, secondItem, ...restItems] = combined;
console.log('4. First, Second & Rest:', firstItem, secondItem, restItems);
// Output: 'apple' 'banana' ['orange', 'carrot', 'potato']

// Hoặc 1 dòng:
const [f1, f2, ...remaining] = [...fruits, ...vegetables];
console.log('4 (one-liner):', f1, f2, remaining);

console.log('\n');

// ========================================
// BÀI 3: Function Parameters
// ========================================
console.log('--- BÀI 3: Function Parameters ---\n');

// Solution 1: Viết function greet nhận {name, age}
function greet({ name, age }) {
  return `Hello, ${name}. You are ${age} years old.`;
}

console.log('1.', greet({ name: 'John', age: 25, city: 'Hanoi' }));
// Output: 'Hello, John. You are 25 years old.'

// Solution 2: Viết function calculateTotal nhận {price, quantity, discount = 0}
function calculateTotal({ price, quantity, discount = 0 }) {
  const subtotal = price * quantity;
  return subtotal - discount;
}

console.log('2a.', calculateTotal({ price: 100, quantity: 2 }));
// Output: 200

console.log('2b.', calculateTotal({ price: 100, quantity: 2, discount: 10 }));
// Output: 190

// Solution 3: Viết function displayAddress nhận nested object
const userData = {
  name: 'John',
  contact: {
    email: 'john@example.com',
    address: {
      city: 'Hanoi',
      street: 'Le Loi',
    },
  },
};

function displayAddress({
  name,
  contact: {
    address: { city, street },
  },
}) {
  return `${name} lives at ${street}, ${city}`;
}

console.log('3.', displayAddress(userData));
// Output: 'John lives at Le Loi, Hanoi'

console.log('\n');

// ========================================
// BÀI 4: Nested Destructuring
// ========================================
console.log('--- BÀI 4: Nested Destructuring ---\n');

const data = {
  user: {
    id: 1,
    profile: {
      name: 'John Doe',
      avatar: 'avatar.jpg',
      settings: {
        notifications: {
          email: true,
          push: false,
        },
      },
    },
  },
  posts: [
    { id: 1, title: 'Post 1', likes: 10 },
    { id: 2, title: 'Post 2', likes: 20 },
  ],
};

// Solution 1: Lấy name và avatar trong 1 dòng
const {
  user: {
    profile: { name: profileName, avatar },
  },
} = data;
console.log('1. Name & Avatar:', profileName, avatar);
// Output: 'John Doe', 'avatar.jpg'

// Solution 2: Lấy email notification setting
const {
  user: {
    profile: {
      settings: {
        notifications: { email: emailNotif },
      },
    },
  },
} = data;
console.log('2. Email Notification:', emailNotif);
// Output: true

// Solution 3: Lấy title của post đầu tiên
const {
  posts: [{ title: firstPostTitle }],
} = data;
console.log('3. First Post Title:', firstPostTitle);
// Output: 'Post 1'

// Solution 4: Lấy name, email notification, và first post title trong 1 dòng
const {
  user: {
    profile: {
      name: userName,
      settings: {
        notifications: { email: emailSetting },
      },
    },
  },
  posts: [{ title }],
} = data;
console.log('4. Name, Email Notif, First Post:', userName, emailSetting, title);
// Output: 'John Doe', true, 'Post 1'

console.log('\n');

// ========================================
// SELF-TEST SOLUTIONS
// ========================================
console.log('--- 📊 SELF-TEST SOLUTIONS ---\n');

// Test 1: Destructure trong 1 dòng
const testData = {
  user: { name: 'John', age: 25 },
  posts: [1, 2, 3],
};

const {
  user: { name: testName, age: testAge },
  posts: [firstPost],
} = testData;
console.log('Test 1:', testName, testAge, firstPost);
// Output: 'John', 25, 1

// Test 2: Function parameters
function greetTest({ name, age }) {
  return `${name}, ${age} years old`;
}
console.log('Test 2:', greetTest({ name: 'John', age: 25, city: 'Hanoi' }));
// Output: 'John, 25 years old'

// Test 3: Swap values
let x = 1,
  y = 2;
[x, y] = [y, x];
console.log('Test 3: After swap - x:', x, 'y:', y);
// Output: x: 2, y: 1

console.log('\n✅ Tất cả solutions đã hoàn thành!');

// ========================================
// 💡 BONUS: Common Patterns trong React
// ========================================
console.log('\n--- 💡 BONUS: React Patterns ---\n');

// Pattern 1: Props destructuring
function UserCard({ name, age, avatar = 'default.jpg' }) {
  return `<div>${name} (${age}) - ${avatar}</div>`;
}
console.log('React Pattern 1:', UserCard({ name: 'John', age: 25 }));

// Pattern 2: useState destructuring
// const [count, setCount] = useState(0);
console.log(
  'React Pattern 2: const [state, setState] = useState(initialValue)'
);

// Pattern 3: useEffect cleanup
// const [isOnline, setIsOnline] = useState(null);
console.log('React Pattern 3: Destructure trong useEffect dependencies');

// Pattern 4: Event object
function handleClick({ target, currentTarget }) {
  console.log('Clicked:', target, currentTarget);
}
console.log('React Pattern 4: Event destructuring');

console.log('\n🎉 Chúc mừng! Bạn đã master Destructuring!');
