# 📚 Day 7: Mini Project + Final Test (Week 1)

> Mục tiêu: Tổng hợp Destructuring + Spread/Rest + Arrow qua các bài tập thực tế.  
> Yêu cầu: Hoàn thành mini-project (8 functions) + Final Test (bắt buộc).

---

## 🧩 Mini Project: Utils Library

Viết các hàm thuần (không mutate input), dùng destructuring/spread/rest/arrow.

1. normalizeUsers(users)

- Input: [{ id, name, email }, ...]
- Output: object map theo id: { [id]: { id, name, email } }

2. pick(obj, keys)

- Trả object chỉ chứa các key trong mảng keys.

3. omit(obj, keys)

- Trả object bỏ đi các key trong mảng keys (dùng rest).

4. groupBy(list, key)

- Gom nhóm theo key → { keyValue: [items] }

5. topNBy(list, n, selector)

- Trả về n phần tử có selector(item) lớn nhất.

6. uniqMerge(a, b)

- Hợp nhất 2 mảng và loại trùng (Set + spread).

7. updateById(list, id, patch)

- Cập nhật item theo id bằng `{ ...item, ...patch }` (immutably).

8. pipeline(value, ...fns)

- Thực thi tuần tự các hàm: `fns.reduce((v, f) => f(v), value)`

File: `mini-project.js` (có mô tả, TODO và test mẫu).

---

## 🧪 Final Test (bắt buộc)

- File: `final-test.js`
- Thời gian: 30 phút
- Yêu cầu Pass: 8/8 tests
- Chủ đề: kết hợp destructuring + spread/rest + arrow (không mutate input)

---

## 📊 Self-checklist

- [ ] Mini project: 8/8 hàm chạy đúng
- [ ] Final test: 8/8 trong ≤ 30 phút
- [ ] Không mutate input, dùng spread/rest hợp lý
- [ ] Đặt tên biến rõ nghĩa, test pass ổn định

---

## 🎓 Solutions

- `solutions.js` — chỉ xem sau khi tự làm.
