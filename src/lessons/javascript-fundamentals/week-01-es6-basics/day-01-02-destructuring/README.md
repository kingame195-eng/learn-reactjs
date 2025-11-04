# 📚 Day 1-2: Destructuring

> **Mục tiêu:** Master destructuring - Dùng 90% trong React  
> **Thời gian:** 2 ngày  
> **Yêu cầu:** 4/4 bài + Self-test

---

## 🎯 Lý thuyết

### Object Destructuring
```javascript
// ❌ Cách cũ
const person = { name: 'John', age: 25 };
const name = person.name;
const age = person.age;

// ✅ Destructuring
const { name, age } = person;

// Với default values
const { name = 'Unknown', age = 0 } = {};

// Rename
const { name: userName } = person;

// Nested
const user = {
  id: 1,
  profile: {
    name: 'John',
    email: 'john@example.com'
  }
};
const { profile: { name, email } } = user;
```

### Array Destructuring
```javascript
const colors = ['red', 'blue', 'green'];

// Lấy phần tử
const [first, second] = colors;

// Skip phần tử
const [first, , third] = colors;

// Rest
const [first, ...rest] = colors;

// Swap values
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1
```

### Function Parameters
```javascript
// ✅ Clean code với destructuring
function displayUser({ name, age, city }) {
  console.log(`${name}, ${age}, from ${city}`);
}

displayUser({ name: 'John', age: 25, city: 'Hanoi' });
```

---

## 💻 BÀI TẬP

### Bài 1: Object Destructuring
```javascript
// TODO: Làm file exercises-01.js

const user = {
  id: 1,
  username: 'john_doe',
  email: 'john@example.com',
  address: {
    city: 'Hanoi',
    street: 'Le Loi',
    zipCode: '10000'
  },
  settings: {
    theme: 'dark',
    language: 'vi'
  }
};

// 1. Lấy username và email
// Expected: 'john_doe', 'john@example.com'

// 2. Lấy city từ address
// Expected: 'Hanoi'

// 3. Lấy theme và language từ settings
// Expected: 'dark', 'vi'

// 4. Lấy username và city trong 1 dòng
// Expected: 'john_doe', 'Hanoi'
```

### Bài 2: Array Destructuring
```javascript
// TODO: Làm file exercises-02.js

const numbers = [10, 20, 30, 40, 50];

// 1. Lấy phần tử đầu và cuối
// Expected: 10, 50

// 2. Lấy 3 phần tử đầu, phần còn lại vào array mới
// Expected: [10, 20, 30], [40, 50]

// 3. Skip phần tử thứ 2 và 4
// Expected: 10, 30, 50

const fruits = ['apple', 'banana', 'orange'];
const vegetables = ['carrot', 'potato'];

// 4. Combine và destructure
// Expected: first = 'apple', second = 'banana', ...veggies = ['carrot', 'potato']
```

### Bài 3: Function Parameters
```javascript
// TODO: Làm file exercises-03.js

// 1. Viết function greet nhận {name, age}
function greet(/* destructure here */) {
  // return 'Hello, {name}. You are {age} years old.'
}

greet({ name: 'John', age: 25, city: 'Hanoi' });
// Expected: 'Hello, John. You are 25 years old.'

// 2. Viết function calculateTotal nhận {price, quantity, discount = 0}
function calculateTotal(/* destructure with default */) {
  // return total after discount
}

calculateTotal({ price: 100, quantity: 2 });
// Expected: 200

calculateTotal({ price: 100, quantity: 2, discount: 10 });
// Expected: 180

// 3. Viết function displayAddress nhận nested object
const userData = {
  name: 'John',
  contact: {
    email: 'john@example.com',
    address: {
      city: 'Hanoi',
      street: 'Le Loi'
    }
  }
};

function displayAddress(/* nested destructure */) {
  // return '{name} lives at {street}, {city}'
}

displayAddress(userData);
// Expected: 'John lives at Le Loi, Hanoi'
```

### Bài 4: Nested Destructuring
```javascript
// TODO: Làm file exercises-04.js

const data = {
  user: {
    id: 1,
    profile: {
      name: 'John Doe',
      avatar: 'avatar.jpg',
      settings: {
        notifications: {
          email: true,
          push: false
        }
      }
    }
  },
  posts: [
    { id: 1, title: 'Post 1', likes: 10 },
    { id: 2, title: 'Post 2', likes: 20 }
  ]
};

// 1. Lấy name và avatar trong 1 dòng
// Expected: 'John Doe', 'avatar.jpg'

// 2. Lấy email notification setting
// Expected: true

// 3. Lấy title của post đầu tiên
// Expected: 'Post 1'

// 4. Lấy name, email notification, và first post title
// Expected: 'John Doe', true, 'Post 1'
```

---

## 📊 SELF-TEST (Bắt buộc)

```javascript
// Làm trong 5 phút không Google

// Test 1: Destructure trong 1 dòng
const data = { 
  user: { name: 'John', age: 25 }, 
  posts: [1, 2, 3] 
};
// TODO: Lấy name, age, first post
// Expected: 'John', 25, 1

// Test 2: Function parameters
function greet(/* destructure here */) {
  return `${name}, ${age} years old`;
}
// Usage: greet({ name: 'John', age: 25, city: 'Hanoi' })
// Expected: 'John, 25 years old'

// Test 3: Swap values
let a = 1, b = 2;
// TODO: Swap a và b bằng destructuring
// Expected: a=2, b=1
```

**✅ PASS:** 3/3 trong 5 phút  
**❌ FAIL:** < 3/3 hoặc > 5 phút → Làm lại 4 bài tập

---

## 🎓 Solutions

Solutions có trong file `solutions.js` - **CHỈ XEM SAU KHI ĐÃ TỰ LÀM HẾT!**

---

## ✅ Completion Checklist

```
□ Đọc xong lý thuyết
□ Bài 1: Object Destructuring ✓
□ Bài 2: Array Destructuring ✓
□ Bài 3: Function Parameters ✓
□ Bài 4: Nested Destructuring ✓
□ Self-test: ___/3 trong ___ phút
□ Review solutions
□ Tự tin 100% với destructuring
```

**Next:** `../day-03-04-spread-rest/`
