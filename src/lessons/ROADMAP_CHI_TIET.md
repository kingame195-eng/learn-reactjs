# 🗺️ ROADMAP HỌC REACT CHI TIẾT - DỰA TRÊN LEVEL HIỆN TẠI CỦA BẠN

> **Mức độ hiện tại: 40-50% | Thời gian ước tính: 8-12 tuần**

---

## 📊 PHÂN TÍCH LEVEL HIỆN TẠI

### ✅ Những gì bạn ĐÃ BIẾT (40-50%)
- [x] Cú pháp JSX cơ bản
- [x] Component structure
- [x] useState cơ bản
- [x] Props truyền dữ liệu
- [x] Event handling (onClick, onChange)
- [x] Conditional rendering với if/else

### ❌ Những gì bạn CHƯA VỮNG (50-60%) - **PHẢI NẮM 100%**

#### 🔴 **PRIORITY 1 - CỰC KỲ QUAN TRỌNG:**
- [ ] **JavaScript ES6+** (destructuring, spread, arrow functions) ← **NỀN TẢNG**
- [ ] **Array methods** (map, filter, reduce) ← **DÙNG HẰNG NGÀY**
- [ ] **Async/await và Promises** ← **FETCH DATA**

#### 🟡 **PRIORITY 2 - QUAN TRỌNG:**
- [ ] **useEffect dependencies** ← **80% BUGS TỪ ĐÂY**
- [ ] **useContext pattern** ← **GLOBAL STATE**
- [ ] **Component lifecycle** ← **HIỂU FLOW**

#### 🟢 **PRIORITY 3 - HỌC SAU:**
- [ ] Custom hooks ← **SAU KHI VỮNG useEffect**
- [ ] CSS/SCSS nâng cao ← **KHÔNG CẤP THIẾT**

---

## ⚠️ CẢNH BÁO QUAN TRỌNG

> **KHÔNG NHẢY SANG REACT NGAY!** 
> 
> Nếu JavaScript ES6+ chưa vững → Sẽ mãi bí với React
> 
> **Quy tắc:** Phải làm đủ 100/100 bài JS trước khi code React nâng cao

---

## 🎯 ROADMAP 3 GIAI ĐOẠN

```
GIAI ĐOẠN 1: FUNDAMENTALS (3-4 tuần)
    ↓
GIAI ĐOẠN 2: REACT CORE (3-4 tuần)
    ↓
GIAI ĐOẠN 3: ADVANCED PATTERNS (2-4 tuần)
```

---

# 🔥 GIAI ĐOẠN 1: JAVASCRIPT FUNDAMENTALS (3-4 tuần)

> **MỤC TIÊU**: Làm chắc JavaScript trước khi học sâu React

## 📅 TUẦN 1: ES6+ Basics

> **🎯 MỤC TIÊU:** Làm chắc nền tảng JavaScript - PHẢI ĐẠT 100%
> 
> **⚠️ QUAN TRỌNG:** Đây là tuần QUẢ QUYẾT ĐỊNH! Nếu không vững tuần này → Sẽ khổ cả đời với React
>
> **✅ CHECKPOINT:** Phải làm đủ **55/55 bài tập** mới được qua Tuần 2

---

### **Ngày 1-2: Destructuring** (Must master 100%)

#### 📚 Lý thuyết:
```javascript
// ❌ CÁCH CŨ
const person = { name: 'An', age: 20 };
const name = person.name;
const age = person.age;

// ✅ DESTRUCTURING
const { name, age } = person;

// Array destructuring
const colors = ['red', 'blue', 'green'];
const [first, second] = colors; // first = 'red', second = 'blue'

// Với default values
const { name = 'Unknown', age = 0 } = {};

// Rename khi destructure
const { name: userName } = person;
```

#### 🎯 BÀI TẬP:
```javascript
// Bài 1: Destructure object
const user = {
  id: 1,
  username: 'john_doe',
  email: 'john@example.com',
  address: {
    city: 'Hanoi',
    street: 'Le Loi'
  }
};
// TODO: Lấy ra username, email, và city

// Bài 2: Destructure array
const numbers = [10, 20, 30, 40, 50];
// TODO: Lấy phần tử đầu, cuối, và phần còn lại

// Bài 3: Destructure trong function params
function displayUser(/* TODO: destructure ở đây */) {
  console.log(`${name} - ${age} tuổi`);
}
displayUser({ name: 'An', age: 20, city: 'Hanoi' });

// Bài 4: Nested destructuring
const data = {
  user: {
    profile: {
      name: 'John',
      settings: {
        theme: 'dark'
      }
    }
  }
};
// TODO: Lấy ra name và theme
```

**✅ CHECKPOINT**: Tự làm được 4/4 bài không cần Google → Qua ngày tiếp theo

#### 📊 SELF-TEST (Bắt buộc làm trước khi qua Ngày 3):
```javascript
// Test 1: Destructure trong 1 dòng
const data = { user: { name: 'John', age: 25 }, posts: [1, 2, 3] };
// TODO: Lấy name, age, first post

// Test 2: Function parameters
function greet(/* destructure here */) {
  return `${name}, ${age} years old`;
}

// Test 3: Swap values
let a = 1, b = 2;
// TODO: Swap a và b bằng destructuring

// Nếu làm được 3/3 test trong 5 phút → PASS ✅
```

---

### **Ngày 3-4: Spread & Rest Operators**

#### 📚 Lý thuyết:
```javascript
// SPREAD OPERATOR (...)
// 1. Copy array
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // [1, 2, 3] - NEW ARRAY

// 2. Merge arrays
const arr3 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
const merged = [...arr1, ...arr2]; // [1, 2, 3, 1, 2, 3]

// 3. Copy object
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 }; // { a: 1, b: 2 } - NEW OBJECT

// 4. Merge objects
const obj3 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
const merged2 = { ...obj1, ...obj2, b: 99 }; // { a: 1, b: 99 }

// REST OPERATOR (...)
// 1. Function params
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

// 2. Destructuring
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]
```

#### 🎯 BÀI TẬP:
```javascript
// Bài 1: Clone và update array
const fruits = ['apple', 'banana'];
// TODO: Tạo newFruits thêm 'orange' vào cuối KHÔNG thay đổi fruits

// Bài 2: Clone và update object
const product = { id: 1, name: 'Laptop', price: 1000 };
// TODO: Tạo discountProduct giảm 10% giá KHÔNG thay đổi product

// Bài 3: Merge multiple objects
const defaultSettings = { theme: 'light', lang: 'en' };
const userSettings = { theme: 'dark' };
// TODO: Merge với userSettings ưu tiên hơn

// Bài 4: Rest parameters
function filterNumbers(min, ...numbers) {
  // TODO: return array chỉ chứa số >= min
}
filterNumbers(10, 5, 15, 8, 20, 12); // [15, 20, 12]

// Bài 5: Immutable update (QUAN TRỌNG cho React)
const todos = [
  { id: 1, text: 'Learn JS', done: false },
  { id: 2, text: 'Learn React', done: false }
];
// TODO: Đánh dấu todo id=1 là done=true KHÔNG mutation
```

**✅ CHECKPOINT**: Hiểu rõ spread vs rest, làm được 5/5 bài

#### 📊 SELF-TEST (Bắt buộc):
```javascript
// Test 1: Clone và update object immutably
const user = { id: 1, name: 'John', age: 25 };
// TODO: Tăng age lên 1 mà KHÔNG thay đổi user gốc

// Test 2: Merge với priority
const defaults = { a: 1, b: 2, c: 3 };
const custom = { b: 99 };
// TODO: Merge với custom.b = 99 ưu tiên

// Test 3: Rest trong destructuring
const arr = [1, 2, 3, 4, 5];
// TODO: first = 1, last = 5, middle = [2,3,4]

// Nếu làm được 3/3 trong 5 phút → PASS ✅
// Nếu không → Làm lại 20 bài spread/rest
```

#### ⚠️ COMMON MISTAKES:
```javascript
// ❌ SAI - Mutation
const todos = [...oldTodos];
todos[0].done = true; // MUTATE nested object!

// ✅ ĐÚNG - Deep immutability
const todos = oldTodos.map(todo =>
  todo.id === 1 ? { ...todo, done: true } : todo
);
```

---

### **Ngày 5-6: Arrow Functions & Implicit Return**

#### 📚 Lý thuyết:
```javascript
// FUNCTION DECLARATION
function add(a, b) {
  return a + b;
}

// ARROW FUNCTION - Explicit return
const add = (a, b) => {
  return a + b;
};

// ARROW FUNCTION - Implicit return (quan trọng!)
const add = (a, b) => a + b;

// 1 parameter - bỏ được ()
const square = x => x * x;

// No parameters - cần ()
const getPI = () => 3.14;

// Return object - cần ()
const makePerson = (name, age) => ({ name, age });

// ❌ SAI - thiếu ()
const makePerson = (name, age) => { name, age }; // undefined!

// Arrow function trong array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
```

#### 🎯 BÀI TẬP:
```javascript
// Bài 1: Convert sang arrow function
function multiply(a, b) {
  return a * b;
}
// TODO: Viết lại bằng arrow function (implicit return)

// Bài 2: Array methods với arrow functions
const users = [
  { name: 'An', age: 20 },
  { name: 'Binh', age: 25 },
  { name: 'Chi', age: 18 }
];
// TODO: Lọc users >= 20 tuổi
// TODO: Lấy mảng chỉ chứa tên
// TODO: Tính tổng tuổi

// Bài 3: Return object
const createProduct = (id, name, price) => {
  // TODO: return object { id, name, price, inStock: true }
  // Dùng implicit return
};

// Bài 4: Callback functions
const button = document.querySelector('button');
// TODO: Viết onClick handler bằng arrow function

// Bài 5: Method chaining
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// TODO: Lọc số chẵn → nhân đôi → tính tổng
// Dùng chain: filter → map → reduce
```

**✅ CHECKPOINT**: Viết arrow function thành thạo, phân biệt explicit/implicit return

#### 📊 SELF-TEST (Bắt buộc):
```javascript
// Test 1: Convert function
function calculate(a, b, c) {
  const sum = a + b;
  return sum * c;
}
// TODO: Viết lại bằng arrow (giữ nguyên logic)

// Test 2: Implicit return object
// TODO: Viết arrow function return { name, age, city }

// Test 3: This binding
const obj = {
  name: 'Counter',
  count: 0,
  // ❌ Tại sao cái này không work?
  increment: () => {
    this.count++;
  }
  // TODO: Fix this binding issue
};

// Nếu làm được 3/3 → PASS ✅
```

#### ⚠️ COMMON MISTAKES:
```javascript
// ❌ SAI - Thiếu () khi return object
const makePerson = name => { name, age: 20 }; // undefined!

// ✅ ĐÚNG
const makePerson = name => ({ name, age: 20 });

// ❌ SAI - Arrow function làm method
const obj = {
  name: 'John',
  greet: () => console.log(this.name) // this = undefined!
};

// ✅ ĐÚNG - Dùng regular function
const obj = {
  name: 'John',
  greet() { console.log(this.name); }
};
```

---

### **Ngày 7: Ôn tập & Mini Project**

#### 🎯 MINI PROJECT: User Management
```javascript
// TODO: Tạo các functions sau KHÔNG dùng mutation
const users = [
  { id: 1, name: 'An', age: 20, active: true },
  { id: 2, name: 'Binh', age: 25, active: false },
  { id: 3, name: 'Chi', age: 18, active: true }
];

// 1. addUser(users, newUser) → trả về array mới
// 2. updateUser(users, id, updates) → update user theo id
// 3. deleteUser(users, id) → xóa user theo id
// 4. toggleActive(users, id) → đảo ngược active
// 5. getActiveUsers(users) → lấy users active
// 6. getUsersByAge(users, minAge) → lọc theo tuổi
// 7. sortByAge(users) → sắp xếp tăng dần
// 8. getUserStats(users) → { total, active, avgAge }

// YÊU CẦU:
// - Dùng arrow functions
// - Dùng destructuring
// - Dùng spread operator
// - KHÔNG mutation (immutable)
```

**✅ CHECKPOINT**: Làm xong 8/8 functions → Qua tuần 2

#### 📊 FINAL TEST TUẦN 1 (BẮT BUỘC):

```javascript
// Làm KHÔNG Google trong 30 phút

const products = [
  { id: 1, name: 'Laptop', price: 1000, stock: 5 },
  { id: 2, name: 'Phone', price: 500, stock: 0 },
  { id: 3, name: 'Mouse', price: 20, stock: 10 }
];

// 1. Destructure lấy name và price của product đầu tiên
// Expected: 'Laptop', 1000

// 2. Clone products và thêm product mới (id: 4)
// Expected: array có 4 items, products gốc không đổi

// 3. Viết arrow function giảm giá 10%
// Expected: const discountPrice = (price) => ...

// 4. Update stock của Laptop (id: 1) thành 3
// Expected: Immutable update, products gốc không đổi

// 5. Lọc products còn hàng (stock > 0)
// Expected: [Laptop, Mouse]

// 6. Tính tổng giá tất cả products
// Expected: 1520

// 7. Lấy array chỉ chứa tên products
// Expected: ['Laptop', 'Phone', 'Mouse']

// 8. Tạo function nhận (...ids) và filter products theo ids
// Expected: getProductsByIds(1, 3) → [Laptop, Mouse]

// ✅ PASS: 8/8 đúng trong 30 phút
// ⚠️ FAIL: < 6/8 hoặc > 30 phút → LÀM LẠI TUẦN 1
```

#### 🎯 MINI PROJECT REVIEW:
- [ ] Code clean, không dùng mutation
- [ ] Mọi function đều arrow function
- [ ] Destructuring ở mọi nơi có thể
- [ ] Spread operator cho mọi update
- [ ] Test tất cả edge cases

**KHÔNG QUA TUẦN 2 NẾU CHƯA PASS FINAL TEST!**

---

## 📅 TUẦN 2: Array Methods & Async Programming

> **🎯 MỤC TIÊU:** Master array methods và async - DÙNG HẰNG NGÀY TRONG REACT
>
> **⚠️ QUAN TRỌNG:** 90% React code dùng map/filter, 100% apps fetch data
>
> **✅ CHECKPOINT:** Phải làm đủ **40/40 bài tập** + 1 project

---

### **Ngày 1-2: Array Methods Deep Dive** (CRITICAL!)

#### 📚 Lý thuyết:
```javascript
const numbers = [1, 2, 3, 4, 5];

// 1. MAP - Transform từng phần tử
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// 2. FILTER - Lọc phần tử
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// 3. REDUCE - Gom thành 1 giá trị
const sum = numbers.reduce((total, n) => total + n, 0); // 15

// 4. FIND - Tìm 1 phần tử
const found = numbers.find(n => n > 3); // 4

// 5. SOME - Kiểm tra có ít nhất 1
const hasEven = numbers.some(n => n % 2 === 0); // true

// 6. EVERY - Kiểm tra tất cả
const allPositive = numbers.every(n => n > 0); // true

// CHAIN METHODS
const result = numbers
  .filter(n => n > 2)      // [3, 4, 5]
  .map(n => n * 2)          // [6, 8, 10]
  .reduce((sum, n) => sum + n, 0); // 24
```

#### 🎯 BÀI TẬP:
```javascript
const products = [
  { id: 1, name: 'Laptop', price: 1000, category: 'electronics', inStock: true },
  { id: 2, name: 'Phone', price: 500, category: 'electronics', inStock: false },
  { id: 3, name: 'Shirt', price: 50, category: 'clothing', inStock: true },
  { id: 4, name: 'Shoes', price: 80, category: 'clothing', inStock: true },
  { id: 5, name: 'Watch', price: 200, category: 'accessories', inStock: false }
];

// Bài 1: Lấy tên tất cả products
// Expected: ['Laptop', 'Phone', 'Shirt', 'Shoes', 'Watch']

// Bài 2: Lọc products in stock
// Expected: 3 products

// Bài 3: Tính tổng giá tất cả products
// Expected: 1830

// Bài 4: Tìm product đầu tiên > 100$
// Expected: { id: 1, name: 'Laptop', ... }

// Bài 5: Kiểm tra có product nào hết hàng?
// Expected: true

// Bài 6: Kiểm tra tất cả products có giá > 0?
// Expected: true

// Bài 7: Nhóm products theo category
// Expected: { electronics: [...], clothing: [...], accessories: [...] }

// Bài 8: Giảm 10% tất cả electronics in stock
// Expected: array mới với giá updated

// Bài 9: Chain - Lấy tên electronics > 100$ và in stock
// Expected: ['Laptop']

// Bài 10: Tính trung bình giá theo category
// Expected: { electronics: 750, clothing: 65, accessories: 200 }
```

**✅ CHECKPOINT**: Làm được 8/10 bài → Qua tiếp

#### 📊 SELF-TEST (Bắt buộc):
```javascript
// Làm trong 15 phút không Google

const users = [
  { id: 1, name: 'An', age: 20, active: true },
  { id: 2, name: 'Binh', age: 25, active: false },
  { id: 3, name: 'Chi', age: 22, active: true }
];

// Test 1: Lấy tên users active
// Expected: ['An', 'Chi']

// Test 2: Tính tổng tuổi
// Expected: 67

// Test 3: Tìm user trẻ nhất
// Expected: { id: 1, name: 'An', age: 20, active: true }

// Test 4: Có user nào inactive?
// Expected: true

// Test 5: Tất cả users >= 18?
// Expected: true

// ✅ PASS: 5/5 trong 15 phút
// ⚠️ FAIL: Làm thêm 20 bài array methods
```

#### ⚠️ WHY THIS MATTERS IN REACT:
```jsx
// React component example
function UserList() {
  const [users, setUsers] = useState([...]);
  
  // Map - Render list (DÙNG MỖI NGÀY!)
  return users.map(user => <UserCard key={user.id} {...user} />);
  
  // Filter - Search (DÙNG MỖI NGÀY!)
  const filtered = users.filter(u => u.name.includes(searchTerm));
  
  // Reduce - Calculate (DÙNG THƯỜNG XUYÊN!)
  const total = items.reduce((sum, item) => sum + item.price, 0);
}
```

---

### **Ngày 3-4: Promises & Async/Await**

#### 📚 Lý thuyết:
```javascript
// PROMISES
// 1. Tạo Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Success!');
    } else {
      reject('Failed!');
    }
  }, 1000);
});

// 2. Sử dụng Promise
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// ASYNC/AWAIT
// 1. Async function always returns Promise
async function fetchData() {
  return 'data'; // Tự động wrap trong Promise
}

// 2. Await pause execution
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// 3. Multiple awaits
async function getMultiple() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id); // Chờ user xong mới fetch posts
  return { user, posts };
}

// 4. Parallel requests
async function getParallel() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts() // Fetch cùng lúc
  ]);
  return { user, posts };
}
```

#### 🎯 BÀI TẬP:
```javascript
// Bài 1: Tạo delay function
function delay(ms) {
  // TODO: return Promise resolve sau ms milliseconds
}
// Usage: await delay(1000); // Chờ 1 giây

// Bài 2: Fake API call
function fetchUser(id) {
  // TODO: return Promise resolve user sau 1s
  // Mock data: { id, name: 'User ' + id, email: 'user' + id + '@example.com' }
}

// Bài 3: Handle errors
async function getUserSafely(id) {
  // TODO: Fetch user, nếu lỗi return null và log error
}

// Bài 4: Sequential vs Parallel
// a) Fetch users 1, 2, 3 lần lượt (sequential)
// b) Fetch users 1, 2, 3 cùng lúc (parallel)
// So sánh thời gian

// Bài 5: Retry mechanism
async function fetchWithRetry(url, maxRetries = 3) {
  // TODO: Retry fetch nếu fail, tối đa maxRetries lần
}

// Bài 6: Timeout
async function fetchWithTimeout(url, timeout = 5000) {
  // TODO: Throw error nếu fetch quá timeout ms
}
```

**✅ CHECKPOINT**: Hiểu rõ Promise, async/await, xử lý được errors

#### 📊 SELF-TEST (Bắt buộc):
```javascript
// Test 1: Viết function delay
// delay(1000).then(() => console.log('Done'));

// Test 2: Fetch với error handling
async function getUser(id) {
  // TODO: Fetch, handle errors, return user or null
}

// Test 3: Parallel vs Sequential
// Fetch users [1,2,3] - so sánh thời gian

// ✅ PASS: 3/3 + hiểu rõ Promise chain
```

#### ⚠️ WHY THIS MATTERS IN REACT:
```jsx
// React useEffect với async
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false; // Cleanup flag
    
    async function loadUser() {
      try {
        setLoading(true);
        const data = await fetchUser(userId);
        if (!cancelled) { // Check before update
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    loadUser();
    
    return () => { cancelled = true; }; // Cleanup
  }, [userId]);
  
  // Nếu không hiểu async/await → Sẽ BUG Ở ĐÂY!
}
```

#### 🔥 COMMON ASYNC BUGS IN REACT:
```jsx
// ❌ BUG 1: Không cleanup
useEffect(() => {
  fetchData().then(setData);
  // Component unmount → setData on unmounted component!
}, []);

// ✅ FIX:
useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setData(data);
  });
  return () => { cancelled = true; };
}, []);

// ❌ BUG 2: Race condition
useEffect(() => {
  fetchUser(userId).then(setUser);
  // userId changes → multiple fetches, last không chắc = userId mới nhất
}, [userId]);

// ✅ FIX: Abort previous
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(r => r.json())
    .then(setUser);
  return () => controller.abort();
}, [userId]);
```

---

### **Ngày 5-7: Practice Project - Todo API**

#### 🎯 PROJECT: Todo App với Fake API
```javascript
// Tạo fake API với JSONPlaceholder hoặc mock local

// REQUIREMENTS:
// 1. fetchTodos() - Lấy danh sách todos
// 2. fetchTodoById(id) - Lấy 1 todo
// 3. createTodo(todo) - Tạo todo mới
// 4. updateTodo(id, updates) - Update todo
// 5. deleteTodo(id) - Xóa todo
// 6. fetchWithLoading(fetchFn) - Wrapper hiển thị loading state

// STATE MANAGEMENT:
let todos = [];
let loading = false;
let error = null;

// FEATURES:
// - Loading indicator khi fetch
// - Error handling
// - Display todos in list
// - Add new todo
// - Toggle done
// - Delete todo
// - Filter: All / Active / Completed

// YÊU CẦU:
// - Dùng async/await
// - Dùng array methods
// - Dùng destructuring
// - Handle all errors
// - NO REACT - Pure JavaScript + HTML
```

**✅ CHECKPOINT**: Hoàn thành Todo App → **XONG TUẦN 2**

#### 📊 FINAL TEST TUẦN 2 (BẮT BUỘC):

```javascript
// Làm trong 45 phút không Google

// PART 1: Array Methods (15 phút)
const orders = [
  { id: 1, customer: 'An', total: 100, status: 'pending' },
  { id: 2, customer: 'Binh', total: 200, status: 'completed' },
  { id: 3, customer: 'An', total: 150, status: 'completed' }
];

// 1. Tính tổng tiền tất cả orders
// 2. Tính tổng tiền của An
// 3. Lấy danh sách unique customers
// 4. Group orders theo status
// 5. Sort orders theo total giảm dần

// PART 2: Async (30 phút)
// 1. Viết fetchPosts() với error handling
// 2. Viết loadMultiplePosts([1,2,3]) parallel
// 3. Viết searchPosts(query) với debounce 300ms
// 4. Viết retry mechanism (max 3 lần)
// 5. Handle loading và error states

// ✅ PASS: 10/10 trong 45 phút
// ⚠️ FAIL: < 8/10 → LÀM LẠI TUẦN 2
```

#### 🎯 PROJECT REVIEW CHECKLIST:
```
Todo API Project:
□ Fetch todos on mount
□ Loading spinner hiển thị
□ Error message hiển thị
□ Add todo works
□ Toggle done works
□ Delete todo works
□ Filter All/Active/Completed works
□ No memory leaks (cleanup)
□ Handle network errors
□ Code clean, immutable updates

Nếu < 8/10 → FIX trước khi qua Tuần 3
```

**KHÔNG QUA TUẦN 3 NẾU:**
- Chưa hiểu rõ map/filter/reduce
- Chưa biết xử lý async/await
- Todo App chưa hoàn chỉnh

---

## 📅 TUẦN 3-4: Advanced JavaScript

### **Ngày 1-3: Objects & Prototypes**
```javascript
// Object methods
// Array advanced (flatMap, entries, fromEntries)
// Object.keys, Object.values, Object.entries
// JSON.parse, JSON.stringify
// localStorage APIs
```

### **Ngày 4-7: ES6+ Features**
```javascript
// Template literals
// Optional chaining (?.)
// Nullish coalescing (??)
// Modules (import/export)
// Classes (basics only)
```

**✅ CHECKPOINT TUẦN 3-4**: 
- [ ] Làm được 20 bài tập Object manipulation
- [ ] Hiểu rõ localStorage
- [ ] Biết import/export modules

---

# 🚀 GIAI ĐOẠN 2: REACT CORE CONCEPTS (3-4 tuần)

> **Bắt đầu khi:** Hoàn thành 100% Giai đoạn 1

## 📅 TUẦN 5: React Fundamentals

### **Ngày 1-2: Components & JSX Deep Dive**

#### 📚 Lý thuyết:
```jsx
// COMPONENT TYPES
// 1. Function Component (khuyên dùng)
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 2. Arrow Function Component
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// 3. Implicit return (component đơn giản)
const Welcome = ({ name }) => <h1>Hello, {name}</h1>;

// JSX RULES
// 1. Must return single element
// ❌ Wrong
return (
  <h1>Title</h1>
  <p>Text</p>
);

// ✅ Correct - Wrap in parent
return (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
);

// ✅ Correct - Fragment
return (
  <>
    <h1>Title</h1>
    <p>Text</p>
  </>
);

// 2. JavaScript expressions in {}
const name = 'John';
return <h1>Hello, {name}</h1>;
return <h1>{2 + 2}</h1>;
return <h1>{user.name.toUpperCase()}</h1>;

// 3. Attributes use camelCase
<div className="container" onClick={handleClick}>
<input type="text" onChange={handleChange} />

// 4. Inline styles are objects
<div style={{ color: 'red', fontSize: '20px' }}>
```

#### 🎯 BÀI TẬP:
```jsx
// Bài 1: Tạo UserCard component
// Props: name, email, avatar, role
// Hiển thị thông tin user đẹp mắt

// Bài 2: ProductCard component
// Props: name, price, image, inStock
// Hiển thị "Out of Stock" nếu !inStock

// Bài 3: Button component
// Props: text, variant ('primary'|'secondary'), onClick
// Style khác nhau theo variant

// Bài 4: List component
// Props: items (array), renderItem (function)
// Render dynamic list với custom render function

// Bài 5: Conditional rendering
// Badge component hiển thị "New", "Sale", "Hot" theo type
```

---

### **Ngày 3-4: Props & State**

#### 📚 Lý thuyết:
```jsx
// PROPS
// 1. Pass props
<UserCard name="John" age={25} />

// 2. Receive props
function UserCard(props) {
  return <div>{props.name} - {props.age}</div>;
}

// 3. Destructuring props (khuyên dùng)
function UserCard({ name, age }) {
  return <div>{name} - {age}</div>;
}

// 4. Default props
function UserCard({ name = 'Unknown', age = 0 }) {
  return <div>{name} - {age}</div>;
}

// 5. Props children
function Card({ children }) {
  return <div className="card">{children}</div>;
}
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>

// STATE
// 1. Basic useState
const [count, setCount] = useState(0);

// 2. Update state
setCount(count + 1); // ❌ Có thể bị lỗi
setCount(prevCount => prevCount + 1); // ✅ Safe

// 3. State với object
const [user, setUser] = useState({ name: '', age: 0 });
// ❌ Wrong - mutation
user.name = 'John';
// ✅ Correct - new object
setUser({ ...user, name: 'John' });

// 4. State với array
const [items, setItems] = useState([]);
// Add item
setItems([...items, newItem]);
// Remove item
setItems(items.filter(item => item.id !== id));
// Update item
setItems(items.map(item => 
  item.id === id ? { ...item, ...updates } : item
));
```

#### 🎯 BÀI TẬP:
```jsx
// Bài 1: Counter
// - Hiển thị số
// - Buttons: +1, -1, Reset, +10
// - Không cho phép âm

// Bài 2: Form Input
// - Input nhập tên
// - Hiển thị "Hello, {name}" real-time
// - Button clear

// Bài 3: Todo List (không API)
// - Input thêm todo
// - List hiển thị todos
// - Checkbox toggle done
// - Button xóa
// - Counter: total, active, completed

// Bài 4: Shopping Cart
// - List products
// - Button "Add to Cart"
// - Cart hiển thị items + quantity
// - Tính tổng tiền

// Bài 5: Tab Component
// - Tabs: Home, Profile, Settings
// - Click tab → show content tương ứng
// - Active tab có style khác
```

---

### **Ngày 5-7: Event Handling & Forms**

#### 📚 Lý thuyết:
```jsx
// EVENT HANDLING
// 1. onClick
<button onClick={handleClick}>Click</button>

function handleClick() {
  console.log('clicked');
}

// 2. onClick with parameter
<button onClick={() => handleClick(id)}>Delete</button>

// 3. onChange
<input onChange={handleChange} />

function handleChange(e) {
  console.log(e.target.value);
}

// 4. onSubmit
<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>

function handleSubmit(e) {
  e.preventDefault(); // QUAN TRỌNG!
  // Handle form
}

// CONTROLLED COMPONENTS
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

#### 🎯 BÀI TẬP:
```jsx
// Bài 1: Login Form
// - Email, Password inputs
// - Validation: không empty, email hợp lệ
// - Show error messages
// - Disable submit nếu invalid

// Bài 2: Register Form
// - Name, Email, Password, Confirm Password
// - Validation
// - Password strength indicator
// - Show/hide password toggle

// Bài 3: Search Filter
// - Input search
// - List items
// - Filter items theo input real-time
// - Highlight matching text

// Bài 4: Multi-step Form
// - Step 1: Personal info
// - Step 2: Address
// - Step 3: Review & Submit
// - Prev/Next buttons
// - Progress indicator

// Bài 5: Dynamic Form
// - Button "Add Field"
// - Mỗi field có input + remove button
// - Submit tất cả values
```

**✅ CHECKPOINT TUẦN 5**: 
- [ ] Hiểu rõ components, props, state
- [ ] Làm được 15/15 bài tập
- [ ] Tạo được form phức tạp

---

## 📅 TUẦN 6: useEffect & Side Effects

> **🎯 MỤC TIÊU:** Master useEffect - PHẦN KHÓ NHẤT VỚI NGƯỜI MỚI!
>
> **⚠️ CẢNH BÁO:** 80% bugs của người mới học React từ useEffect
>
> **💡 QUAN TRỌNG:** 
> - Dependencies array quyết định khi nào effect chạy
> - Cleanup function tránh memory leaks
> - Async trong useEffect cần cẩn thận
>
> **✅ CHECKPOINT:** Làm đủ **30/30 bài** + debug 10 infinite loops

---

### **Ngày 1-3: useEffect Deep Dive** (CRITICAL - 80% bugs ở đây!)

#### 📚 Lý thuyết:
```jsx
import { useState, useEffect } from 'react';

// 1. RUN AFTER EVERY RENDER
useEffect(() => {
  console.log('Runs after every render');
});

// 2. RUN ONCE (componentDidMount)
useEffect(() => {
  console.log('Runs once on mount');
}, []); // Empty dependency array

// 3. RUN WHEN DEPENDENCIES CHANGE
useEffect(() => {
  console.log('Runs when count changes');
}, [count]); // Runs khi count thay đổi

// 4. CLEANUP FUNCTION
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  // Cleanup khi unmount hoặc trước khi effect chạy lại
  return () => {
    clearInterval(timer);
  };
}, []);

// COMMON USE CASES
// 1. Fetch data
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  }
  fetchData();
}, []);

// 2. Subscribe to events
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth);
  }
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// 3. Update document title
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);

// 4. localStorage sync
useEffect(() => {
  localStorage.setItem('user', JSON.stringify(user));
}, [user]);
```

#### 🎯 BÀI TẬP:
```jsx
// Bài 1: Document Title
// - Input nhập text
// - Document title = text (real-time)

// Bài 2: Clock
// - Hiển thị thời gian hiện tại
// - Update mỗi giây
// - Cleanup timer khi unmount

// Bài 3: Window Size
// - Hiển thị width x height của window
// - Update khi resize
// - Cleanup event listener

// Bài 4: Fetch User Data
// - Fetch từ JSONPlaceholder
// - Show loading state
// - Show error nếu fail
// - Display user info

// Bài 5: Search with Debounce
// - Input search
// - Debounce 500ms trước khi search
// - Fetch results từ API
// - Cancel previous request nếu input changes

// Bài 6: localStorage Persistence
// - Todo list
// - Save to localStorage khi todos change
// - Load từ localStorage on mount

// Bài 7: Dark Mode
// - Toggle button
// - Save preference to localStorage
// - Apply theme on mount
// - Update body class

// Bài 8: Infinite Scroll
// - List items
// - Load more khi scroll to bottom
// - Show loading spinner
// - Cleanup scroll listener
```

**✅ CHECKPOINT**: Hiểu rõ useEffect, dependencies array, cleanup

#### 📊 SELF-TEST (Bắt buộc - CỰC KỲ QUAN TRỌNG):

```jsx
// Test 1: Dependencies array
// Khi nào những effect này chạy?

useEffect(() => {
  console.log('A');
}); // Chạy khi nào?

useEffect(() => {
  console.log('B');
}, []); // Chạy khi nào?

useEffect(() => {
  console.log('C');
}, [count]); // Chạy khi nào?

useEffect(() => {
  console.log('D');
}, [count, name]); // Chạy khi nào?

// Test 2: Tìm bug
function BuggyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1); // ❌ BUG - Tại sao?
  }, [count]);
  
  return <div>{count}</div>;
}

// Test 3: Memory leak
function LeakyComponent() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000); // ❌ MEMORY LEAK - Tại sao?
  }, []);
  
  return <div>{time.toLocaleTimeString()}</div>;
}

// Test 4: Fetch race condition
function RacyComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser); // ❌ RACE CONDITION - Tại sao?
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

// ✅ PASS: Chỉ rõ được 4/4 bugs và cách fix
// ⚠️ FAIL: Làm thêm 20 bài useEffect debugging
```

#### 🔥 TOP 10 useEffect BUGS (PHẢI NHỚ):

```jsx
// ❌ BUG 1: Infinite loop
useEffect(() => {
  setCount(count + 1);
}, [count]); // count changes → effect runs → count changes → ...

// ✅ FIX: Functional update
useEffect(() => {
  setCount(c => c + 1);
}, []); // Chỉ chạy 1 lần

// ❌ BUG 2: Missing dependency
useEffect(() => {
  console.log(name); // name not in dependencies!
}, []); // ESLint warning

// ✅ FIX: Add dependency
useEffect(() => {
  console.log(name);
}, [name]);

// ❌ BUG 3: No cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  // Component unmount → timer vẫn chạy!
}, []);

// ✅ FIX: Cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);

// ❌ BUG 4: Async in useEffect wrong way
useEffect(async () => { // ❌ useEffect cannot be async!
  const data = await fetch();
}, []);

// ✅ FIX: Async inside
useEffect(() => {
  async function load() {
    const data = await fetch();
    setData(data);
  }
  load();
}, []);

// ❌ BUG 5: Update state after unmount
useEffect(() => {
  fetchData().then(setData); // Component unmounts → setData errors!
}, []);

// ✅ FIX: Cleanup flag
useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setData(data);
  });
  return () => { cancelled = true; };
}, []);

// ❌ BUG 6: Object/array in dependencies
const config = { url: '/api' }; // New object every render!
useEffect(() => {
  fetch(config.url);
}, [config]); // Runs every render!

// ✅ FIX: Destructure or useMemo
useEffect(() => {
  fetch(config.url);
}, [config.url]); // Only url matters

// ❌ BUG 7: Function in dependencies
function fetchData() { // New function every render!
  return fetch('/api');
}
useEffect(() => {
  fetchData();
}, [fetchData]); // Runs every render!

// ✅ FIX: useCallback or move inside
useEffect(() => {
  function fetchData() {
    return fetch('/api');
  }
  fetchData();
}, []); // Stable

// ❌ BUG 8: Race condition (explained above)

// ❌ BUG 9: Double fetch in StrictMode
useEffect(() => {
  fetchData(); // Runs 2 times in dev!
}, []);

// ✅ FIX: Understand StrictMode, add cleanup

// ❌ BUG 10: Conditional effect
if (condition) { // ❌ Hooks cannot be conditional!
  useEffect(() => {}, []);
}

// ✅ FIX: Condition inside
useEffect(() => {
  if (condition) {
    // do something
  }
}, [condition]);
```

#### 💡 useEffect DECISION TREE:

```
Cần side effect?
├─ YES
│  ├─ Khi nào chạy?
│  │  ├─ 1 lần khi mount → useEffect(() => {}, [])
│  │  ├─ Khi X thay đổi → useEffect(() => {}, [X])
│  │  └─ Mỗi render → useEffect(() => {})
│  │
│  ├─ Có cleanup không?
│  │  ├─ Timer/Interval → YES
│  │  ├─ Event listener → YES
│  │  ├─ Subscription → YES
│  │  ├─ Async call → YES (abort/cancel flag)
│  │  └─ Chỉ update state → NO
│  │
│  └─ Async?
│     ├─ YES → async function inside useEffect
│     └─ NO → regular function
│
└─ NO → Không cần useEffect
```

---

### **Ngày 4-7: Data Fetching Patterns**

#### 📚 Lý thuyết:
```jsx
// PATTERN 1: Basic Fetch
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{/* Render users */}</div>;
}

// PATTERN 2: Fetch with Dependencies
function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetchPosts(userId).then(setPosts);
  }, [userId]); // Re-fetch khi userId changes
  
  return <div>{/* Render posts */}</div>;
}

// PATTERN 3: Abort Previous Requests
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController();
    
    async function search() {
      try {
        const response = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal
        });
        const data = await response.json();
        setResults(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    }
    
    search();
    
    return () => controller.abort();
  }, [query]);
  
  return <div>{/* Render results */}</div>;
}
```

#### 🎯 PROJECT: GitHub User Finder
```jsx
// FEATURES:
// 1. Input nhập username
// 2. Fetch user info từ GitHub API
// 3. Display: avatar, name, bio, repos count, followers
// 4. Button "View Repos" → fetch và hiển thị repos
// 5. Loading states
// 6. Error handling (user not found)
// 7. Recent searches (lưu localStorage, tối đa 5)

// BONUS:
// - Debounce search input
// - Pagination cho repos
// - Sort repos by stars/forks
```

**✅ CHECKPOINT TUẦN 6**: 
- [ ] Master useEffect patterns
- [ ] Handle async operations properly
- [ ] Complete GitHub User Finder
- [ ] **Debug được 10/10 useEffect bugs**
- [ ] **Giải thích được dependencies array**

#### 📊 FINAL TEST TUẦN 6 (BẮT BUỘC - CỰC KỲ QUAN TRỌNG):

```jsx
// PART 1: Tìm và fix bugs (30 phút)

// Bug 1:
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, [count]);
  return <div>{count}</div>;
}
// TODO: Tìm bug và fix

// Bug 2:
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);
  return <div>{time.toLocaleTimeString()}</div>;
}
// TODO: Tìm bug và fix

// Bug 3:
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  return <div>{user?.name}</div>;
}
// TODO: Tìm bug và fix

// Bug 4:
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then(r => r.json())
      .then(setResults);
  }, [query]);
  
  return (
    <input onChange={e => setQuery(e.target.value)} />
  );
}
// TODO: Tìm bug và fix

// Bug 5:
function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
  }, []);
  
  return <div>{size.width} x {size.height}</div>;
}
// TODO: Tìm bug và fix

// PART 2: Implement features (30 phút)

// Feature 1: Auto-save to localStorage
function NoteEditor() {
  const [note, setNote] = useState('');
  // TODO: Auto-save note to localStorage khi note thay đổi
  // TODO: Load note từ localStorage khi mount
  return <textarea value={note} onChange={e => setNote(e.target.value)} />;
}

// Feature 2: Debounced search
function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  // TODO: Debounce search 500ms
  // TODO: Cancel previous request nếu query changes
  return <input onChange={e => setQuery(e.target.value)} />;
}

// Feature 3: Fetch with retry
function DataLoader({ endpoint }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Fetch data
  // TODO: Retry max 3 lần nếu fail
  // TODO: Cleanup nếu endpoint changes
  return <div>{/* render */}</div>;
}

// ✅ PASS: 8/8 (5 bugs + 3 features) trong 60 phút
// ⚠️ FAIL: < 6/8 → LÀM LẠI TUẦN 6 TOÀN BỘ
```

#### 🚨 ĐẶC BIỆT QUAN TRỌNG:

Nếu **CHƯA PASS FINAL TEST TUẦN 6** → **DỪNG LẠI, KHÔNG QUA TUẦN 7**

Lý do:
- useEffect là foundation của React
- 80% bugs từ useEffect
- useContext cũng dùng useEffect
- Custom hooks dựa trên useEffect
- Mọi data fetching dùng useEffect

**LÀM LẠI TUẦN 6 CHO ĐẾN KHI PASS 8/8!**

---

## 📅 TUẦN 7-8: Context API & Advanced Patterns

### **Ngày 1-4: useContext**

#### 📚 Lý thuyết:
```jsx
// STEP 1: Create Context
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// STEP 2: Create Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// STEP 3: Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// STEP 4: Use in App
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

// STEP 5: Use in Components
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </header>
  );
}
```

#### 🎯 BÀI TẬP:
```jsx
// Bài 1: AuthContext
// - Login/logout functionality
// - Store user info
// - isAuthenticated state
// - Protected routes concept

// Bài 2: CartContext
// - Add to cart
// - Remove from cart
// - Update quantity
// - Calculate total
// - Cart count badge

// Bài 3: LanguageContext
// - Switch EN/VI
// - Translate text
// - Save preference to localStorage

// Bài 4: NotificationContext
// - Show notifications (success/error/info)
// - Auto dismiss after 3s
// - Stack multiple notifications

// Bài 5: Multi-Context App
// - Combine: Theme + Auth + Cart
// - Nested providers
// - Cross-context dependencies
```

---

### **Ngày 5-7: Weather App (Step 3 từ file của bạn)**

> Bây giờ bạn mới bắt đầu làm Weather App với useContext!

**YÊU CẦU:**
- Tự code từ đầu, KHÔNG copy-paste
- Hiểu rõ mỗi dòng code
- Test kỹ từng feature
- Fix bugs tự chủ

**✅ CHECKPOINT TUẦN 7-8**:
- [ ] Hiểu rõ Context API pattern
- [ ] Tạo được custom Context + Hook
- [ ] Hoàn thành Weather App Step 3
- [ ] **Giải thích được khi nào dùng Context**
- [ ] **Tránh được Context performance issues**

#### 📊 FINAL TEST TUẦN 7-8 (BẮT BUỘC):

```jsx
// PART 1: Implement contexts (45 phút)

// 1. AuthContext
// - login(email, password)
// - logout()
// - user state
// - isAuthenticated boolean
// - localStorage persistence

// 2. CartContext
// - items array
// - addToCart(product)
// - removeFromCart(productId)
// - updateQuantity(productId, quantity)
// - clearCart()
// - totalItems computed
// - totalPrice computed

// 3. ThemeContext (có rồi trong Weather App)
// - theme state
// - toggleTheme()
// - localStorage persistence

// PART 2: Combine contexts (30 phút)
function App() {
  // TODO: Nest AuthProvider, ThemeProvider, CartProvider
  // TODO: Đảm bảo order đúng
  return (
    // Your providers here
    <Router>
      <Header />
      <Main />
    </Router>
  );
}

// PART 3: Use contexts (15 phút)
function Header() {
  // TODO: Use auth, theme, cart contexts
  // TODO: Display user info
  // TODO: Cart badge với count
  // TODO: Theme toggle button
  return <header>{/* ... */}</header>;
}

// ✅ PASS: 3/3 parts hoàn chỉnh
// ⚠️ FAIL: < 3/3 → Review Context patterns
```

#### 🚨 CONTEXT ANTI-PATTERNS (TRÁNH):

```jsx
// ❌ BAD: Everything in one context
const AppContext = createContext();
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  // ... 20 states more
  // Mọi component re-render khi BẤT KỲ state nào thay đổi!
}

// ✅ GOOD: Separate contexts
<AuthProvider>
  <ThemeProvider>
    <CartProvider>
      <NotificationProvider>
        <App />

// ❌ BAD: No custom hook
function Header() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('...');
  const { user } = context;
}

// ✅ GOOD: Custom hook
function Header() {
  const { user } = useAuth(); // Clean!
}

// ❌ BAD: Frequently changing values
function CounterProvider({ children }) {
  const [count, setCount] = useState(0); // Changes every second!
  useEffect(() => {
    setInterval(() => setCount(c => c + 1), 1000);
  }, []);
  // Mọi consumers re-render mỗi giây!
}

// ✅ GOOD: Use local state for frequently changing values

// ❌ BAD: No memoization
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const value = { // New object every render!
    theme,
    setTheme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  };
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ✅ GOOD: useMemo
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), [theme]);
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
```

#### 💡 KHI NÀO DÙNG CONTEXT?

```
✅ DÙNG Context khi:
- Theme (light/dark)
- Auth (user info)
- Language (i18n)
- Cart (e-commerce)
- Notification system
- Modal state
- Data không thay đổi thường xuyên

❌ KHÔNG dùng Context khi:
- Form state (dùng local state)
- Frequently changing values (counter, timer)
- Performance critical (dùng Redux/Zustand)
- Props chỉ truyền 1-2 levels (prop drilling ok)
```

---

# 🎓 GIAI ĐOẠN 3: ADVANCED PATTERNS (2-4 tuần)

## 📅 TUẦN 9-10: Custom Hooks & Performance

### **Custom Hooks**
```jsx
// useLocalStorage
// useFetch
// useDebounce
// useToggle
// usePrevious
// useOnClickOutside
```

### **Performance Optimization**
```jsx
// React.memo
// useMemo
// useCallback
// Code splitting
// Lazy loading
```

---

## 📅 TUẦN 11-12: Final Projects

### **PROJECT 1: E-Commerce App**
- Product listing
- Filters & search
- Shopping cart
- Checkout form
- Order summary

### **PROJECT 2: Social Media Dashboard**
- User profile
- Posts feed
- Comments
- Likes
- Dark mode

---

## ✅ TỔNG KẾT & LỘ TRÌNH

### 📊 Progress Tracker (In ra dán tường!)

```
GIAI ĐOẠN 1: JAVASCRIPT FUNDAMENTALS (Bắt buộc 100%)
□ Tuần 1: JS ES6+ ___________ 
  □ Destructuring (4 bài) ___
  □ Spread/Rest (5 bài) ___
  □ Arrow Functions (5 bài) ___
  □ Mini Project ___
  □ FINAL TEST (8/8) ___

□ Tuần 2: Array & Async ___________
  □ Array Methods (10 bài) ___
  □ Async/Await (6 bài) ___
  □ Todo API Project ___
  □ FINAL TEST (10/10) ___

□ Tuần 3-4: Advanced JS ___________
  □ Objects & Prototypes ___
  □ ES6+ Features ___
  □ Modules ___
  □ FINAL TEST ___

⚠️ CHECKPOINT 1: Nếu chưa 100% → KHÔNG QUA GIAI ĐOẠN 2

GIAI ĐOẠN 2: REACT CORE (Phải vững 90%+)
□ Tuần 5: React Fundamentals ___________
  □ Components (5 bài) ___
  □ Props & State (5 bài) ___
  □ Events & Forms (5 bài) ___
  □ FINAL TEST ___

□ Tuần 6: useEffect ___________  🔥 QUAN TRỌNG NHẤT!
  □ Dependencies (8 bài) ___
  □ Cleanup (10 bài) ___
  □ Data Fetching (10 bài) ___
  □ Debug 10 bugs ___
  □ FINAL TEST (8/8) ___

⚠️ CHECKPOINT 2: Nếu Tuần 6 < 8/8 → LÀM LẠI TOÀN BỘ

□ Tuần 7-8: Context API ___________
  □ Context Pattern (10 bài) ___
  □ Multi-context (5 bài) ___
  □ Weather App ___
  □ FINAL TEST (3/3) ___

GIAI ĐOẠN 3: ADVANCED PATTERNS (Học sau)
□ Tuần 9-10: Advanced ___________
□ Tuần 11-12: Projects ___________
```

### 📈 Self-Assessment (Tự đánh giá mỗi tuần)

```
TUẦN 1: ___/100%
Destructuring:     ___/10 ⭐
Spread/Rest:       ___/10 ⭐
Arrow Functions:   ___/10 ⭐
FINAL TEST:        ___/8 ✓

TUẦN 2: ___/100%
Array Methods:     ___/10 ⭐
Async/Await:       ___/10 ⭐
FINAL TEST:        ___/10 ✓

TUẦN 6: ___/100% 🔥
useEffect:         ___/10 ⭐
Debugging:         ___/10 ⭐
FINAL TEST:        ___/8 ✓

OVERALL: ___/100%
```

### 🎯 Sau 12 tuần bạn sẽ:
- ✅ Thành thạo JavaScript ES6+ (destructuring, spread, async) - **VỮNG 100%**
- ✅ Hiểu sâu React core concepts (components, hooks, lifecycle) - **VỮNG 90%+**
- ✅ Master useEffect và async patterns - **VỮNG 90%+**
- ✅ Tự xây dựng app hoàn chỉnh với Context API
- ✅ Debug và fix bugs độc lập
- ✅ Đọc hiểu code của người khác
- ✅ Sẵn sàng học Redux, React Router, TypeScript

### 📝 QUY TẮC VÀNG (In ra dán tường!)

#### ✅ PHẢI LÀM:
1. **KHÔNG SKIP**: Mỗi bài tập phải làm, mỗi test phải pass
2. **TỰ CODE**: Không copy-paste, gõ từng dòng
3. **HIỂU SAU**: Hỏi "TẠI SAO" thay vì "LÀM SAO"
4. **PRACTICE**: Mỗi concept làm tối thiểu 5-10 bài
5. **DEBUG**: Tự fix bugs trước khi hỏi
6. **REVIEW**: Xem lại code cũ mỗi 3 ngày
7. **TEST**: Làm FINAL TEST mỗi tuần, phải PASS mới qua

#### ❌ KHÔNG ĐƯỢC:
1. ❌ Skip bài tập dù chỉ 1 bài
2. ❌ Copy code mà không hiểu
3. ❌ Học nhiều concept cùng lúc
4. ❌ Qua tuần mới khi chưa pass test tuần cũ
5. ❌ Nhảy sang React Router/Redux khi chưa vững core
6. ❌ Xem tutorial mà không practice
7. ❌ Bỏ qua error messages, warnings

### 🚨 CRITICAL MILESTONES (KHÔNG ĐƯỢC BỎ QUA)

```
MILESTONE 1: Tuần 1 - FINAL TEST
└─ Phải đạt 8/8 mới qua Tuần 2
   └─ Nếu fail: Làm lại toàn bộ Tuần 1

MILESTONE 2: Tuần 2 - FINAL TEST  
└─ Phải đạt 10/10 mới qua Tuần 3
   └─ Nếu fail: Làm lại toàn bộ Tuần 2

MILESTONE 3: Tuần 6 - useEffect FINAL TEST 🔥🔥🔥
└─ Phải đạt 8/8 mới qua Tuần 7
   └─ Nếu fail: Làm lại toàn bộ Tuần 6
   └─ CỰC KỲ QUAN TRỌNG - 80% bugs từ đây!

MILESTONE 4: Tuần 8 - Weather App
└─ Phải hoàn thành đầy đủ
   └─ Nếu chưa xong: Tiếp tục cho đến khi xong
```

### 💡 STUDY TIPS

#### Học hiệu quả:
- 🕐 **2-3 giờ/ngày** tập trung, không bị phân tâm
- � **Viết code bằng tay** trước khi gõ
- 🐛 **Debug nhiều** hơn copy solution
- 🔄 **Review code cũ** mỗi 3 ngày
- 💬 **Giải thích** code cho người khác (rubber duck debugging)
- 🎯 **Mini projects** mỗi tuần

#### Khi gặp khó:
1. Đọc error message kỹ
2. Console.log debug
3. Google error message
4. Đọc docs React/MDN
5. Hỏi sau khi đã thử 30 phút

#### Tránh burnout:
- Nghỉ 10 phút mỗi giờ
- 1 ngày/tuần nghỉ hoàn toàn
- Đừng so sánh với người khác
- Celebrate small wins

### 🎓 SAU KHI HOÀN THÀNH ROADMAP NÀY

```
Level hiện tại: Junior React Developer
Có thể làm:
├─ Simple React apps
├─ Fetch data từ APIs
├─ Component architecture
├─ State management cơ bản
└─ Debug React apps

Next steps:
├─ React Router (1 tuần)
├─ Redux/Zustand (2 tuần)
├─ TypeScript (2 tuần)
├─ Testing (Jest, RTL) (2 tuần)
├─ Next.js (2 tuần)
└─ Build real projects (8-12 tuần)
```

### 📊 HOW TO TRACK PROGRESS

Tạo file `progress.md`:
```markdown
# MY REACT LEARNING PROGRESS

## Week 1: JS ES6+
- [x] Day 1-2: Destructuring (4/4 ✓)
- [x] Day 3-4: Spread/Rest (5/5 ✓)
- [x] Day 5-6: Arrow Functions (5/5 ✓)
- [x] Day 7: FINAL TEST (8/8 ✓)
- Status: COMPLETED ✅

## Week 2: Array & Async
- [ ] Day 1-2: Array Methods (0/10)
...

## Notes & Learnings
- Ngày 1: Hiểu được destructuring với nested objects
- Ngày 3: Bị stuck ở spread với arrays, đã fix
- Ngày 7: Pass final test, tự tin hơn!
```

---

## 🚀 BẮT ĐẦU NGAY HÔM NAY!

### Your first task:
1. ✅ Đọc xong roadmap này
2. ✅ In ra progress tracker
3. ✅ Tạo file `progress.md`
4. ✅ Bắt đầu Tuần 1 - Ngày 1: Destructuring
5. ✅ Làm 4 bài tập đầu tiên
6. ✅ Self-test
7. ✅ Update progress

### Mindset:
> "Học React không khó. Khó ở chỗ JavaScript chưa vững."
>
> "Mỗi bài tập làm được = 1% tiến bộ."
>
> "Không bao giờ quá muộn để bắt đầu."
>
> "Bugs là bạn, không phải kẻ thù."

**LET'S GO! 🔥**
