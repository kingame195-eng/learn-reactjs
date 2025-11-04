# 📚 Day 3-4: Spread & Rest

> Mục tiêu: Nắm vững spread/rest cho Array/Object và Function Parameters
> Thời gian: 2 ngày • Yêu cầu: 4/4 bài + Self-test

---

## 🎯 Lý thuyết nhanh

### 1) Spread operator (...)

- Array: copy/merge/insert

```js
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b]; // [1,2,3,4]
const copy = [...a];
const withHead = [0, ...a]; // [0,1,2]
```

- Object: copy/merge/override

```js
const base = { theme: 'light', lang: 'vi' };
const override = { theme: 'dark' };
const settings = { ...base, ...override }; // { theme: 'dark', lang: 'vi' }
```

- Lưu ý: Shallow copy (sao chép nông) → nested object/array vẫn tham chiếu chung.

### 2) Rest operator (...)

- Trong destructuring: gom phần còn lại

```js
const [head, ...tail] = [1, 2, 3]; // head=1, tail=[2,3]
const { id, ...rest } = { id: 1, name: 'A', age: 20 }; // rest={ name, age }
```

- Trong tham số hàm: nhận số lượng đối số linh hoạt

```js
function sum(...nums) {
  return nums.reduce((s, n) => s + n, 0);
}
```

- Quy tắc: Rest chỉ đứng ở CUỐI cùng mẫu destructuring/tham số hàm.

### 3) Immutability (rất quan trọng khi code React)

- Không mutate trực tiếp: dùng spread để tạo bản mới
- Cập nhật lồng nhau: copy từng tầng cần đổi

```js
const state = { user: { profile: { city: 'HN' } } };
const newState = {
  ...state,
  user: { ...state.user, profile: { ...state.user.profile, city: 'HCM' } },
};
```

### 4) Pitfalls phổ biến

- Sai thứ tự merge object: key sau cùng sẽ override key trước
- Tưởng spread là deep copy (không phải!)
- Dùng rest không ở cuối → lỗi cú pháp

---

## 💻 BÀI TẬP

### Bài 1: Array Spread Cơ Bản (exercises-01.js)

- Copy mảng không mutate
- Merge hai mảng
- Thêm phần tử ở đầu/giữa/cuối (không dùng push/splice trực tiếp)
- Xóa phần tử theo index (immutably)

### Bài 2: Object Spread (exercises-02.js)

- Copy object và override key
- Merge default settings với user settings
- Cập nhật nested object immutably
- Loại bỏ một key bằng object rest

### Bài 3: Rest Parameters (exercises-03.js)

- sum(...nums), max(...nums)
- unique(...items)
- joinWith(sep, ...parts)

### Bài 4: Mix nâng cao (exercises-04.js)

- Destructure tham số hàm với rest phần còn lại
- Cập nhật một phần tử trong array of objects theo id (immutably)
- Hợp nhất mảng và loại trùng bằng Set + spread
- Demo shallow copy pitfall + cách sửa đúng

---

## 📊 SELF-TEST (5 phút)

1. Tạo bản sao `arr` và thêm phần tử 0 ở đầu, 999 ở cuối (không mutate)
2. Merge `user` với `updates`, ưu tiên updates; đồng thời loại bỏ `password` khỏi kết quả
3. Viết `sumEven(...nums)` trả về tổng số chẵn

---

## 🎓 Solutions

Có trong file `solutions.js` — chỉ xem sau khi tự làm.

---

## ✅ Completion checklist

- [ ] Bài 1 ✓
- [ ] Bài 2 ✓
- [ ] Bài 3 ✓
- [ ] Bài 4 ✓
- [ ] Self-test: **/3 trong ** phút
- [ ] Review solutions
- [ ] Tự tin 100% với spread/rest
