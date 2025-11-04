# 📚 LÝ THUYẾT HOÀN CHỈNH: JAVASCRIPT + REACT

> **Mục tiêu:** Hiểu sâu từ JavaScript ES6+ đến React hooks, với ví dụ thực tế và giải thích dễ hiểu.
> **Dành cho:** Người mới bắt đầu hoặc cần ôn lại kiến thức nền tảng.

---

## 📖 MỤC LỤC

### PHẦN 1: JAVASCRIPT CƠ BẢN

1. [Variables & Data Types](#1-variables--data-types)
2. [Destructuring](#2-destructuring)
3. [Spread & Rest Operators](#3-spread--rest-operators)
4. [Arrow Functions](#4-arrow-functions)
5. [Array Methods](#5-array-methods)
6. [Async/Await & Promises](#6-asyncawait--promises)
7. [Modules (Import/Export)](#7-modules-importexport)

### PHẦN 2: REACT CƠ BẢN

8. [React là gì?](#8-react-là-gì)
9. [Components & Props](#9-components--props)
10. [State & useState](#10-state--usestate)
11. [Rendering & JSX](#11-rendering--jsx)
12. [Event Handling](#12-event-handling)
13. [Lists & Keys](#13-lists--keys)

### PHẦN 3: REACT NÂNG CAO

14. [useEffect Hook](#14-useeffect-hook)
15. [Context API & useContext](#15-context-api--usecontext)
16. [Custom Hooks](#16-custom-hooks)
17. [useRef & DOM](#17-useref--dom)
18. [useMemo & useCallback](#18-usememo--usecallback)
19. [React Patterns](#19-react-patterns)

---

# PHẦN 1: JAVASCRIPT CƠ BẢN

---

## 1. Variables & Data Types

### 1.1 var, let, const

```javascript
// ❌ var - KHÔNG nên dùng (scope lỗi, hoisting khó hiểu)
var x = 1;
if (true) {
  var x = 2; // cùng biến x!
}
console.log(x); // 2 (bị leak ra ngoài)

// ✅ let - dùng khi cần thay đổi giá trị
let count = 0;
count = 1; // OK
count++; // OK

// ✅ const - dùng cho hầu hết các trường hợp
const name = 'John';
// name = 'Jane'; // ❌ ERROR

const user = { name: 'John' };
user.name = 'Jane'; // ✅ OK (object vẫn đổi được property)
// user = {}; // ❌ ERROR (không gán lại biến)
```

**Quy tắc vàng:**

- Luôn dùng `const` trừ khi bạn CHẮC CHẮN cần thay đổi → dùng `let`
- KHÔNG BAO GIỜ dùng `var`

### 1.2 Data Types

```javascript
// Primitive (nguyên thủy)
const str = 'hello'; // string
const num = 42; // number
const bool = true; // boolean
const nothing = null; // null
const undef = undefined; // undefined
const sym = Symbol('id'); // symbol (ít dùng)

// Reference (tham chiếu)
const arr = [1, 2, 3];
const obj = { name: 'John', age: 25 };
const fn = () => {};

// Check type
typeof str; // 'string'
typeof arr; // 'object' (⚠️ array cũng là object)
Array.isArray(arr); // true (cách đúng check array)
```

**Khác biệt quan trọng:**

```javascript
// Primitive: copy by value
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 (a không đổi)

// Reference: copy by reference
const obj1 = { x: 1 };
const obj2 = obj1;
obj2.x = 2;
console.log(obj1.x); // 2 (obj1 bị đổi theo!)

// ✅ Muốn copy object/array: dùng spread
const obj3 = { ...obj1 }; // copy mới
obj3.x = 3;
console.log(obj1.x); // 2 (obj1 không đổi)
```

---

## 2. Destructuring

### 2.1 Object Destructuring

```javascript
const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  address: {
    city: 'Hanoi',
    street: 'Le Loi',
  },
};

// ❌ Cách cũ
const name = user.name;
const email = user.email;

// ✅ Destructuring
const { name, email } = user;

// ✅ Với default value
const { age = 0 } = user; // age = 0 (vì user không có age)

// ✅ Đổi tên biến
const { name: userName } = user;
console.log(userName); // 'John'

// ✅ Nested (lồng nhau)
const {
  address: { city },
} = user;
console.log(city); // 'Hanoi'

// ✅ Trong function parameters (React hay dùng!)
function greet({ name, age = 18 }) {
  return `Hello ${name}, you are ${age}`;
}
greet(user); // 'Hello John, you are 18'
```

### 2.2 Array Destructuring

```javascript
const colors = ['red', 'blue', 'green'];

// ✅ Lấy theo vị trí
const [first, second] = colors;
// first = 'red', second = 'blue'

// ✅ Skip phần tử
const [, , third] = colors;
// third = 'green'

// ✅ Rest (phần còn lại)
const [head, ...tail] = colors;
// head = 'red', tail = ['blue', 'green']

// ✅ Swap values (đổi giá trị)
let a = 1,
  b = 2;
[a, b] = [b, a];
// a = 2, b = 1
```

**Dùng trong React:**

```javascript
// useState trả về array [state, setState]
const [count, setCount] = useState(0);
//      ^       ^
//    value   setter
```

---

## 3. Spread & Rest Operators

### 3.1 Spread (...) - "Rải ra"

```javascript
// ✅ Copy array
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // copy mới
arr2.push(4);
console.log(arr1); // [1, 2, 3] (không đổi)

// ✅ Merge arrays
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b]; // [1, 2, 3, 4]

// ✅ Copy object
const obj1 = { x: 1, y: 2 };
const obj2 = { ...obj1 }; // copy mới

// ✅ Merge & override
const base = { theme: 'light', lang: 'vi' };
const override = { theme: 'dark' };
const settings = { ...base, ...override };
// { theme: 'dark', lang: 'vi' } (theme bị override)

// ✅ Update nested (QUAN TRỌNG trong React!)
const state = {
  user: {
    profile: { city: 'HN' },
  },
};

// ❌ SAI: shallow copy không đủ
const wrong = { ...state };
wrong.user.profile.city = 'HCM';
console.log(state.user.profile.city); // 'HCM' (bị đổi!)

// ✅ ĐÚNG: copy từng tầng cần đổi
const fixed = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      city: 'HCM',
    },
  },
};
```

### 3.2 Rest (...) - "Gom lại"

```javascript
// ✅ Trong destructuring
const { id, ...rest } = { id: 1, name: 'A', age: 20 };
// id = 1
// rest = { name: 'A', age: 20 }

// ✅ Trong function parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

// ✅ Loại bỏ property
const user = { id: 1, name: 'John', password: '123' };
const { password, ...safeUser } = user;
// safeUser = { id: 1, name: 'John' } (không có password)
```

**Quy tắc vàng:**

- Rest PHẢI ở cuối cùng
- Chỉ có 1 rest trong mỗi pattern

---

## 4. Arrow Functions

### 4.1 Cú pháp

```javascript
// ❌ Function thường
function add(a, b) {
  return a + b;
}

// ✅ Arrow function - đầy đủ
const add2 = (a, b) => {
  return a + b;
};

// ✅ Arrow - implicit return (1 dòng)
const add3 = (a, b) => a + b;

// ✅ 1 tham số bỏ ngoặc
const square = x => x * x;

// ✅ Không tham số
const getZero = () => 0;

// ✅ Return object (phải bọc trong ngoặc!)
const getUser = id => ({ id, name: 'User' + id });
```

### 4.2 Lexical `this` (QUAN TRỌNG!)

```javascript
// ❌ Function thường: this động
const timer1 = {
  count: 0,
  start() {
    setInterval(function () {
      this.count++; // ❌ this = window/undefined
    }, 1000);
  },
};

// ✅ Arrow: this từ scope bên ngoài
const timer2 = {
  count: 0,
  start() {
    setInterval(() => {
      this.count++; // ✅ this = timer2
    }, 1000);
  },
};

// React class component (cũ)
class Button extends React.Component {
  handleClick() {
    console.log(this); // undefined nếu không bind
  }

  // ✅ Arrow trong class field (React hay dùng)
  handleClick2 = () => {
    console.log(this); // this = component instance
  };
}
```

### 4.3 Khi KHÔNG nên dùng Arrow

```javascript
// ❌ Làm method cần this linh hoạt
const obj = {
  value: 10,
  getValue: () => this.value, // ❌ this không phải obj
};

// ✅ Dùng function thường
const obj2 = {
  value: 10,
  getValue() {
    return this.value;
  }, // ✅ this = obj2
};

// ❌ Làm constructor
const Person = name => {
  this.name = name;
};
new Person('John'); // ❌ ERROR

// ✅ Dùng class hoặc function
class Person2 {
  constructor(name) {
    this.name = name;
  }
}
```

---

## 5. Array Methods

### 5.1 map() - Biến đổi từng phần tử

```javascript
const numbers = [1, 2, 3, 4, 5];

// ✅ Bình phương từng số
const squares = numbers.map(n => n * n);
// [1, 4, 9, 16, 25]

// ✅ Dùng trong React: render list
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

const userItems = users.map(user => <li key={user.id}>{user.name}</li>);
```

### 5.2 filter() - Lọc phần tử

```javascript
const numbers = [1, 2, 3, 4, 5];

// ✅ Lấy số chẵn
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// ✅ Lọc user active
const users = [
  { id: 1, active: true },
  { id: 2, active: false },
];
const activeUsers = users.filter(u => u.active);
```

### 5.3 reduce() - Gộp thành 1 giá trị

```javascript
const numbers = [1, 2, 3, 4, 5];

// ✅ Tính tổng
const sum = numbers.reduce((total, n) => total + n, 0);
// 15

// ✅ Đếm số lần xuất hiện
const fruits = ['apple', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
// { apple: 2, banana: 1 }

// ✅ Flatten array
const nested = [
  [1, 2],
  [3, 4],
];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
// [1, 2, 3, 4]
```

### 5.4 find() & findIndex()

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

// ✅ Tìm user theo id
const user = users.find(u => u.id === 2);
// { id: 2, name: 'Jane' }

const index = users.findIndex(u => u.id === 2);
// 1
```

### 5.5 some() & every()

```javascript
const numbers = [1, 2, 3, 4, 5];

// ✅ Có số chẵn không?
const hasEven = numbers.some(n => n % 2 === 0);
// true

// ✅ Tất cả đều > 0?
const allPositive = numbers.every(n => n > 0);
// true
```

### 5.6 Chaining Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// ✅ Số lẻ → bình phương → tính tổng
const result = numbers
  .filter(n => n % 2 === 1) // [1, 3, 5]
  .map(n => n * n) // [1, 9, 25]
  .reduce((s, n) => s + n, 0); // 35
```

---

## 6. Async/Await & Promises

### 6.1 Promise Cơ Bản

```javascript
// ✅ Tạo Promise
const fetchUser = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'User' + id });
      } else {
        reject(new Error('Invalid ID'));
      }
    }, 1000);
  });
};

// ✅ Dùng .then()
fetchUser(1)
  .then(user => console.log(user))
  .catch(err => console.error(err));
```

### 6.2 Async/Await

```javascript
// ✅ Async function
async function getUser(id) {
  try {
    const user = await fetchUser(id);
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

// ✅ Arrow + async
const getUser2 = async id => {
  const user = await fetchUser(id);
  return user;
};

// ✅ Dùng trong React
useEffect(() => {
  const loadData = async () => {
    const data = await fetchAPI();
    setData(data);
  };
  loadData();
}, []);
```

### 6.3 Promise.all() - Chạy song song

```javascript
// ✅ Fetch nhiều users cùng lúc
const ids = [1, 2, 3];
const users = await Promise.all(ids.map(id => fetchUser(id)));
// [user1, user2, user3]
```

---

## 7. Modules (Import/Export)

### 7.1 Named Export/Import

```javascript
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// app.js
import { add, subtract } from './utils';
// hoặc đổi tên
import { add as plus } from './utils';
```

### 7.2 Default Export/Import

```javascript
// Button.js
export default function Button() {
  return <button>Click</button>;
}

// App.js
import Button from './Button'; // tên gì cũng được
```

### 7.3 Mix

```javascript
// utils.js
export const PI = 3.14;
export default function calculate() {}

// app.js
import calculate, { PI } from './utils';
```

---

# PHẦN 2: REACT CƠ BẢN

---

## 8. React là gì?

### 8.1 Khái niệm

React là **thư viện JavaScript** để xây dựng giao diện người dùng (UI).

**Đặc điểm:**

- **Component-based:** Chia UI thành các thành phần nhỏ, tái sử dụng
- **Declarative:** Mô tả UI "như thế nào" thay vì "làm thế nào"
- **Virtual DOM:** Cập nhật UI nhanh, hiệu quả

### 8.2 Cài đặt & Setup

```bash
# Tạo project mới
npx create-react-app my-app
cd my-app
npm start
```

Cấu trúc cơ bản:

```
my-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js      ← Component chính
│   ├── index.js    ← Entry point
│   └── index.css
└── package.json
```

---

## 9. Components & Props

### 9.1 Function Component

```jsx
// ✅ Component đơn giản nhất
function Welcome() {
  return <h1>Hello World</h1>;
}

// ✅ Arrow function
const Welcome2 = () => {
  return <h1>Hello World</h1>;
};

// ✅ Implicit return (1 dòng JSX)
const Welcome3 = () => <h1>Hello World</h1>;
```

### 9.2 Props - Truyền dữ liệu

```jsx
// ✅ Nhận props
function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}

// ✅ Destructuring props (recommended!)
function Greeting2({ name, age }) {
  return (
    <h1>
      Hello {name}, you are {age}
    </h1>
  );
}

// ✅ Default props
function Greeting3({ name = 'Guest' }) {
  return <h1>Hello {name}</h1>;
}

// ✅ Sử dụng
<Greeting2 name="John" age={25} />;
```

### 9.3 Props Children

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

// Sử dụng
<Card title="My Card">
  <p>This is content</p>
  <button>Click me</button>
</Card>;
```

---

## 10. State & useState

### 10.1 State là gì?

State = **dữ liệu nội bộ** của component, khi đổi → re-render.

```jsx
import { useState } from 'react';

function Counter() {
  // [state, setState] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

### 10.2 Update State

```jsx
// ❌ SAI: mutate trực tiếp
const [count, setCount] = useState(0);
count++; // ❌ KHÔNG làm vậy!

// ✅ ĐÚNG: dùng setState
setCount(count + 1);

// ✅ Functional update (khi cần state cũ)
setCount(prev => prev + 1);
```

### 10.3 State với Object/Array

```jsx
// ✅ Object state
const [user, setUser] = useState({ name: 'John', age: 25 });

// ❌ SAI
user.age = 26; // mutate trực tiếp

// ✅ ĐÚNG: tạo object mới
setUser({ ...user, age: 26 });

// ✅ Array state
const [items, setItems] = useState([1, 2, 3]);

// Thêm phần tử
setItems([...items, 4]); // [1, 2, 3, 4]

// Xóa phần tử theo index
setItems(items.filter((_, i) => i !== 1)); // [1, 3]

// Sửa phần tử theo index
setItems(items.map((item, i) => (i === 1 ? 999 : item))); // [1, 999, 3]
```

---

## 11. Rendering & JSX

### 11.1 JSX Cơ Bản

```jsx
// ✅ JSX = JavaScript XML
const element = <h1>Hello</h1>;

// ✅ Nhúng biến
const name = 'John';
const element2 = <h1>Hello {name}</h1>;

// ✅ Nhúng expression
const element3 = <h1>1 + 1 = {1 + 1}</h1>;

// ✅ Attributes
const element4 = <img src="avatar.jpg" alt="Avatar" />;

// ✅ className thay vì class
const element5 = <div className="container">Content</div>;
```

### 11.2 Conditional Rendering

```jsx
function Greeting({ isLoggedIn }) {
  // ✅ if/else
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please login</h1>;

  // ✅ Ternary
  return <h1>{isLoggedIn ? 'Welcome back!' : 'Please login'}</h1>;

  // ✅ && (chỉ hiện khi true)
  return <div>{isLoggedIn && <p>You are logged in</p>}</div>;
}
```

### 11.3 Fragment

```jsx
// ❌ SAI: return nhiều elements
return (
  <h1>Title</h1>
  <p>Content</p>
);

// ✅ Wrap trong div
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// ✅ Fragment (không tạo DOM node)
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

---

## 12. Event Handling

### 12.1 Basic Events

```jsx
function Button() {
  const handleClick = () => {
    alert('Clicked!');
  };

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

// ✅ Inline
<button onClick={() => alert('Clicked!')}>
  Click
</button>

// ✅ Với tham số
<button onClick={() => handleClick('param')}>
  Click
</button>
```

### 12.2 Event Object

```jsx
function Input() {
  const handleChange = e => {
    console.log(e.target.value);
  };

  return <input onChange={handleChange} />;
}

// ✅ Prevent default
const handleSubmit = e => {
  e.preventDefault();
  // xử lý form
};
```

### 12.3 Form Handling

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 13. Lists & Keys

### 13.1 Render List

```jsx
function UserList() {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
  ];

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 13.2 Keys (QUAN TRỌNG!)

```jsx
// ❌ SAI: dùng index
{
  items.map((item, index) => <li key={index}>{item}</li>);
}

// ✅ ĐÚNG: dùng unique ID
{
  items.map(item => <li key={item.id}>{item.name}</li>);
}
```

**Tại sao key quan trọng?**

- React dùng key để nhận biết phần tử nào thay đổi
- Dùng index → bug khi sort/filter/add/remove

---

# PHẦN 3: REACT NÂNG CAO

---

## 14. useEffect Hook

### 14.1 useEffect Cơ Bản

```jsx
import { useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // ✅ Chạy sau mỗi lần render
  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  // ✅ Chạy 1 lần khi mount ([] = empty deps)
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  // ✅ Chạy khi count thay đổi
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
}
```

### 14.2 Cleanup Function

```jsx
useEffect(() => {
  // Setup
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Cleanup (chạy khi unmount hoặc trước lần effect tiếp)
  return () => {
    clearInterval(timer);
  };
}, []);
```

### 14.3 Fetch Data

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Re-fetch khi userId đổi

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

### 14.4 Common Mistakes (TOP 10 LỖI!)

```jsx
// ❌ 1. Thiếu dependencies
useEffect(() => {
  console.log(count); // dùng count
}, []); // ❌ thiếu [count]

// ✅ ĐÚNG
useEffect(() => {
  console.log(count);
}, [count]);

// ❌ 2. Infinite loop
useEffect(() => {
  setCount(count + 1); // setState trong effect
}); // ❌ không có deps → re-render vô hạn

// ✅ ĐÚNG: thêm deps
useEffect(() => {
  setCount(c => c + 1);
}, []); // chỉ chạy 1 lần

// ❌ 3. Async trong effect
useEffect(async () => {
  // ❌ SAI
  const data = await fetchData();
});

// ✅ ĐÚNG
useEffect(() => {
  const load = async () => {
    const data = await fetchData();
  };
  load();
}, []);
```

---

## 15. Context API & useContext

### 15.1 Tạo Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Tạo context
const ThemeContext = createContext();

// 2. Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook (optional, recommended)
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Sử dụng
function Button() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={theme}>
      Toggle Theme
    </button>
  );
}

// 5. Wrap app
function App() {
  return (
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  );
}
```

### 15.2 Multiple Contexts

```jsx
// contexts/AuthContext.js
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = credentials => {
    // login logic
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// App.js
<ThemeProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
</ThemeProvider>;
```

---

## 16. Custom Hooks

### 16.1 Tạo Custom Hook

```jsx
// ✅ Hook lấy window size
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Sử dụng
function Component() {
  const { width, height } = useWindowSize();
  return (
    <div>
      {width} x {height}
    </div>
  );
}
```

### 16.2 useFetch Hook

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Sử dụng
function Users() {
  const { data, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 17. useRef & DOM

### 17.1 Access DOM

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

### 17.2 Store Values (không trigger re-render)

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

---

## 18. useMemo & useCallback

### 18.1 useMemo - Cache tính toán nặng

```jsx
function ExpensiveComponent({ items }) {
  // ❌ Tính lại mỗi lần render
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // ✅ Chỉ tính lại khi items đổi
  const total2 = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <div>Total: {total2}</div>;
}
```

### 18.2 useCallback - Cache function

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Tạo function mới mỗi lần render
  const handleClick = () => {
    console.log('Clicked');
  };

  // ✅ Giữ nguyên function reference
  const handleClick2 = useCallback(() => {
    console.log('Clicked');
  }, []); // chỉ tạo 1 lần

  return <Child onClick={handleClick2} />;
}

// Child re-render nếu props đổi
const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

---

## 19. React Patterns

### 19.1 Lifting State Up

```jsx
// ✅ State chung ở component cha
function Parent() {
  const [value, setValue] = useState('');

  return (
    <>
      <Input value={value} onChange={setValue} />
      <Display value={value} />
    </>
  );
}

function Input({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function Display({ value }) {
  return <p>Value: {value}</p>;
}
```

### 19.2 Compound Components

```jsx
// ✅ Component có nhiều sub-components
function Tabs({ children }) {
  const [active, setActive] = useState(0);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = function Tab({ index, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button
      className={active === index ? 'active' : ''}
      onClick={() => setActive(index)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabPanel({ index, children }) {
  const { active } = useContext(TabsContext);
  return active === index ? <div>{children}</div> : null;
};

// Sử dụng
<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel index={0}>Content 1</Tabs.Panel>
  <Tabs.Panel index={1}>Content 2</Tabs.Panel>
</Tabs>;
```

### 19.3 Render Props

```jsx
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = e => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return render(position);
}

// Sử dụng
<Mouse
  render={({ x, y }) => (
    <p>
      Mouse at {x}, {y}
    </p>
  )}
/>;
```

---

## 📝 TÓM TẮT & CHECKLIST

### JavaScript ES6+

- [ ] Destructuring object/array
- [ ] Spread/rest operators
- [ ] Arrow functions & lexical this
- [ ] Array methods (map/filter/reduce)
- [ ] Async/await
- [ ] Modules (import/export)

### React Cơ Bản

- [ ] Function components
- [ ] Props & children
- [ ] State & useState
- [ ] JSX & conditional rendering
- [ ] Event handling
- [ ] Lists & keys

### React Nâng Cao

- [ ] useEffect & dependencies
- [ ] Context API
- [ ] Custom hooks
- [ ] useRef
- [ ] useMemo & useCallback
- [ ] React patterns

---

## 🎯 LỘ TRÌNH HỌC

**Week 1:** JavaScript ES6+ (destructuring, spread/rest, arrow)  
**Week 2:** Array methods + Async/Await  
**Week 3-4:** Advanced JS (closure, prototype, this)  
**Week 5:** React fundamentals (components, props, state)  
**Week 6:** useEffect (QUAN TRỌNG - 80% bugs ở đây!)  
**Week 7-8:** Context API & advanced patterns  
**Week 9-10:** Custom hooks  
**Week 11-12:** Final projects

---

## ⚠️ TOP 10 LỖI THƯỜNG GẶP

1. **Mutate state trực tiếp** → Luôn dùng setState
2. **Thiếu dependencies trong useEffect** → ESLint sẽ báo
3. **Dùng index làm key** → Dùng unique ID
4. **Async function trong useEffect** → Tạo async bên trong
5. **Không cleanup trong useEffect** → Return cleanup function
6. **Shallow copy nested object** → Copy từng tầng cần đổi
7. **Arrow function trong render** → Mỗi render tạo function mới
8. **Không check null/undefined** → Dùng optional chaining `?.`
9. **Infinite loop trong useEffect** → Kiểm tra dependencies
10. **Không dùng React.memo khi cần** → Child re-render không cần thiết

---

**🎓 Học xong file này, bạn sẽ nắm vững 80% React cần thiết cho công việc!**
