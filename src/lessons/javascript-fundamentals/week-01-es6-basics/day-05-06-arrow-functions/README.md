# 📚 Day 5-6: Arrow Functions

> Mục tiêu: Thành thạo arrow functions, implicit return, return object, lexical this, khi nào nên/không nên dùng.  
> Thời gian: 2 ngày • Yêu cầu: 4/4 bài + Self-test

---

## 🎯 Lý thuyết nhanh

### 1) Cú pháp

```js
// Dài → Ngắn
const add = function (a, b) {
  return a + b;
};
const add2 = (a, b) => {
  return a + b;
};
const add3 = (a, b) => a + b; // implicit return
const square = x => x * x; // 1 tham số bỏ ngoặc
const getObj = () => ({ a: 1 }); // trả về object phải bọc trong ()
```

### 2) Lexical this (khác function thường)

- Arrow không có `this` riêng → lấy `this` từ scope bên ngoài.
- Không có `arguments`, `prototype`, không dùng làm constructor (`new`).

```js
const timer = {
  count: 0,
  start() {
    setInterval(() => {
      this.count++;
    }, 1000); // this = timer
  },
};
```

### 3) Khi KHÔNG nên dùng arrow

- Làm method cần `this` linh hoạt (ví dụ đối tượng thư viện yêu cầu bind).
- Làm constructor (không được).
- Làm handler cần removeListener bằng cùng tham chiếu function.

### 4) Mẹo & Pitfalls

- Trả object: `() => ({ key: 'value' })`.
- Return implicit chỉ dùng cho biểu thức 1 dòng; nhiều dòng thì dùng `{ return ... }`.
- Trong class field, arrow giữ `this` tiện cho handler: `onClick = () => { ... }`.

---

## 💻 BÀI TẬP

### Bài 1: Viết lại sang arrow (exercises-01.js)

- Chuyển function thường → arrow với đủ các biến thể (implicit return, return object).

### Bài 2: Arrow + Array methods (exercises-02.js)

- map/filter/reduce với arrow; chain nhiều bước; chú ý `this` không cần bind.

### Bài 3: `this` và bind (exercises-03.js)

- Sửa lỗi `this` trong callback (setTimeout/forEach).
- Viết method trong object sao cho `this` đúng bằng arrow vs function.

### Bài 4: Patterns nâng cao (exercises-04.js)

- Default params + rest params + arrow.
- Currying: `sum(a)(b)(c)`.
- Factory trả về function có closure.

---

## 📊 SELF-TEST (5 phút)

1. Viết `double` bằng 1 dòng arrow (implicit return).
2. Viết `pickId` trả `{ id }` từ object (arrow trả object).
3. Sửa cho `this` trong `setTimeout` trỏ về object hiện tại bằng arrow.

---

## 🎓 Solutions

Có trong `solutions.js` — chỉ xem sau khi tự làm.

---

## ✅ Checklist

- [ ] Bài 1 ✓
- [ ] Bài 2 ✓
- [ ] Bài 3 ✓
- [ ] Bài 4 ✓
- [ ] Self-test 3/3 trong 5 phút
- [ ] Review solutions
- [ ] Tự tin 100% với arrow functions
