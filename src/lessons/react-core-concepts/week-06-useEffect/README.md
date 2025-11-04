# 🔥 TUẦN 6: useEffect - THE MOST CRITICAL WEEK!

> **⚠️ CẢNH BÁO:** 80% bugs của người mới học React từ useEffect  
> **🎯 Mục tiêu:** Hiểu HOÀN TOÀN useEffect, dependencies, cleanup  
> **⏱️ Thời gian:** 1 tuần - KHÔNG RUSH!  
> **✅ Pass criteria:** Final Test 8/8 - KHÔNG SAI 1 CÂU!

---

## 🚨 TẠI SAO TUẦN NÀY QUAN TRỌNG NHẤT?

### 80% Bugs từ useEffect:
```jsx
// ❌ BUG 1: Infinite loop
useEffect(() => {
  setCount(count + 1);
}, [count]); // 💥 BOOM!

// ❌ BUG 2: Memory leak
useEffect(() => {
  setInterval(() => {}, 1000);
}, []); // 💥 Memory leak!

// ❌ BUG 3: Race condition
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]); // 💥 Race condition!

// ❌ BUG 4: Stale closure
useEffect(() => {
  setTimeout(() => console.log(count), 3000);
}, []); // 💥 Stale closure!
```

### Nếu KHÔNG VỮNG useEffect:
- ❌ Không dùng được custom hooks
- ❌ Không fetch data đúng cách
- ❌ Không hiểu Context API
- ❌ Không học được Redux
- ❌ Không tối ưu performance
- ❌ Mãi mãi bí với React

---

## 📚 Nội dung

### Day 1-3: useEffect Deep Dive
#### 📂 `day-01-03-useEffect-deep-dive/`

**Dependencies Array:**
- [ ] No dependencies - runs every render
- [ ] Empty array `[]` - runs once on mount
- [ ] With dependencies `[count]` - runs when count changes
- [ ] Multiple dependencies `[count, name]`
- **8 bài tập** về dependencies

**Cleanup Functions:**
- [ ] When to cleanup
- [ ] How to cleanup
- [ ] Timer cleanup
- [ ] Event listener cleanup
- [ ] Async cleanup
- **10 bài tập** về cleanup

**Common Patterns:**
- [ ] Fetch on mount
- [ ] Subscribe to events
- [ ] Update document title
- [ ] localStorage sync
- [ ] Debounce/throttle

---

### Day 4-7: Data Fetching
#### 📂 `day-04-07-data-fetching/`

**Fetch Patterns:**
- [ ] Basic fetch with loading/error
- [ ] Fetch with dependencies
- [ ] Abort previous requests
- [ ] Retry mechanism
- [ ] Parallel requests
- **10 bài tập** về data fetching

**GitHub User Finder Project:**
- [ ] Search users
- [ ] Display profile
- [ ] Fetch repos
- [ ] Loading states
- [ ] Error handling
- [ ] Recent searches
- [ ] Debounced search

---

### Bug Debugging
#### 📂 `bug-debugging/`

**10 Bugs PHẢI FIX:**
1. Infinite loop
2. Missing cleanup
3. Race condition
4. Stale closure
5. Memory leak
6. Wrong dependencies
7. Async in useEffect
8. Update after unmount
9. Double fetch
10. Conditional effect

**Mỗi bug:**
- ❌ Code bị bug
- 🔍 Hints để debug
- ✅ Fixed code
- 💡 Explanation

---

## 📊 Progress Checklist

```
□ Day 1-3: useEffect Deep Dive
  □ Dependencies array (8/8 bài) ___
    □ No dependencies ___
    □ Empty array ___
    □ Single dependency ___
    □ Multiple dependencies ___
    □ Object in dependencies ___
    □ Function in dependencies ___
    □ Array in dependencies ___
    □ Complex dependencies ___
  
  □ Cleanup functions (10/10 bài) ___
    □ Timer cleanup ___
    □ Interval cleanup ___
    □ Event listener cleanup ___
    □ Subscription cleanup ___
    □ Async cleanup ___
    □ Abort fetch cleanup ___
    □ Multiple cleanups ___
    □ Conditional cleanup ___
    □ Cleanup order ___
    □ Cleanup dependencies ___
  
  □ Common patterns (10/10 bài) ___

□ Day 4-7: Data Fetching
  □ Fetch patterns (10/10 bài) ___
  □ GitHub User Finder ___
    □ Setup project ___
    □ Search feature ___
    □ Profile display ___
    □ Repos list ___
    □ Loading states ___
    □ Error handling ___
    □ Debounce search ___
    □ Recent searches ___

□ Bug Debugging (10/10 bugs) ___
  □ Bug 1: Infinite loop ___
  □ Bug 2: Missing cleanup ___
  □ Bug 3: Race condition ___
  □ Bug 4: Stale closure ___
  □ Bug 5: Memory leak ___
  □ Bug 6: Wrong dependencies ___
  □ Bug 7: Async in useEffect ___
  □ Bug 8: Update after unmount ___
  □ Bug 9: Double fetch ___
  □ Bug 10: Conditional effect ___

□ FINAL TEST: ___/8 trong 60 phút
  □ Find bugs: 5/5 ___
  □ Implement features: 3/3 ___
```

---

## 🎯 FINAL TEST (BẮT BUỘC)

### Part 1: Find & Fix Bugs (30 phút - 5 bugs)
```jsx
// Bug 1: Infinite loop
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, [count]);
  return <div>{count}</div>;
}
// TODO: Tìm bug và fix

// Bug 2-5: Xem trong final-test.js
```

### Part 2: Implement Features (30 phút - 3 features)
```jsx
// Feature 1: Auto-save to localStorage
function NoteEditor() {
  const [note, setNote] = useState('');
  // TODO: Auto-save khi note thay đổi
  // TODO: Load từ localStorage on mount
}

// Feature 2-3: Xem trong final-test.js
```

**Passing Criteria:**
- ✅ 8/8 trong 60 phút
- ✅ Code clean, no warnings
- ✅ Hiểu rõ mỗi bug

**Nếu < 8/8:**
- ❌ Fail: Làm lại TOÀN BỘ Tuần 6
- ❌ Không qua Tuần 7
- ❌ Review lại tất cả concepts

---

## 💡 STUDY STRATEGY

### Ngày 1-3:
```
Morning:   Đọc lý thuyết dependencies (2h)
           Làm 8 bài dependencies (2h)

Afternoon: Đọc lý thuyết cleanup (2h)
           Làm 10 bài cleanup (3h)

Evening:   Review common patterns (1h)
           Practice patterns (2h)

Total:     ~12 hours
```

### Ngày 4-7:
```
Day 4:     Data fetching theory + 5 bài (4h)
Day 5:     Data fetching practice + 5 bài (4h)
Day 6:     GitHub User Finder project (6h)
Day 7:     Bug debugging + Final test (6h)

Total:     ~20 hours
```

**TỔNG TUẦN 6: ~32 hours**

---

## 🔥 TOP 10 useEffect RULES (NHỚ THUỘC LÒNG!)

### 1. Dependencies Array Rules
```jsx
// ✅ ĐÚNG: Exhaustive dependencies
useEffect(() => {
  console.log(count, name);
}, [count, name]); // All dependencies listed

// ❌ SAI: Missing dependencies
useEffect(() => {
  console.log(count, name);
}, [count]); // name missing!
```

### 2. Cleanup Rules
```jsx
// ✅ ĐÚNG: Always cleanup side effects
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);

// ❌ SAI: No cleanup
useEffect(() => {
  setInterval(() => {}, 1000); // Memory leak!
}, []);
```

### 3. Async Rules
```jsx
// ✅ ĐÚNG: Async inside
useEffect(() => {
  async function fetchData() {
    const data = await fetch();
    setData(data);
  }
  fetchData();
}, []);

// ❌ SAI: useEffect cannot be async
useEffect(async () => {
  const data = await fetch(); // Error!
}, []);
```

### 4. Functional Updates
```jsx
// ✅ ĐÚNG: Functional update
useEffect(() => {
  setCount(c => c + 1);
}, []); // Stable

// ❌ SAI: Depends on count
useEffect(() => {
  setCount(count + 1);
}, [count]); // Infinite loop!
```

### 5. Abort Requests
```jsx
// ✅ ĐÚNG: Abort on cleanup
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [url]);

// ❌ SAI: No abort
useEffect(() => {
  fetch(url).then(setData); // Race condition!
}, [url]);
```

### 6. Object/Array Dependencies
```jsx
// ✅ ĐÚNG: Primitive dependencies
useEffect(() => {
  fetch(config.url);
}, [config.url]); // Primitive

// ❌ SAI: Object dependency
const config = { url: '/api' };
useEffect(() => {
  fetch(config.url);
}, [config]); // New object every render!
```

### 7. Function Dependencies
```jsx
// ✅ ĐÚNG: Move inside or useCallback
useEffect(() => {
  function fetchData() { }
  fetchData();
}, []);

// ❌ SAI: Function dependency
function fetchData() { }
useEffect(() => {
  fetchData();
}, [fetchData]); // New function every render!
```

### 8. Conditional Effects
```jsx
// ✅ ĐÚNG: Condition inside
useEffect(() => {
  if (condition) {
    // do something
  }
}, [condition]);

// ❌ SAI: Conditional hook
if (condition) {
  useEffect(() => {}, []); // Breaks rules of hooks!
}
```

### 9. Update After Unmount
```jsx
// ✅ ĐÚNG: Cancel on unmount
useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setData(data);
  });
  return () => { cancelled = true; };
}, []);

// ❌ SAI: No cancel check
useEffect(() => {
  fetchData().then(setData); // Sets state after unmount!
}, []);
```

### 10. StrictMode Double Call
```jsx
// ✅ HIỂU: StrictMode calls effects twice in dev
useEffect(() => {
  console.log('mount'); // Logs 2 times in dev
  return () => console.log('cleanup');
}, []);

// This is NORMAL in development!
// Won't happen in production
```

---

## 🚨 KHÔNG QUA TUẦN 7 NẾU:

- [ ] Chưa làm đủ 38/38 bài tập
- [ ] Chưa debug được 10/10 bugs
- [ ] Final test < 8/8
- [ ] GitHub User Finder chưa xong
- [ ] Chưa hiểu rõ dependencies array
- [ ] Chưa hiểu rõ cleanup

**Nếu fail bất kỳ điều nào → LÀM LẠI TOÀN BỘ TUẦN 6!**

---

## 💪 MOTIVATION

> "useEffect is not complicated. Your JavaScript is weak."
> 
> "Once you master useEffect, React becomes easy."
> 
> "Every bug you debug makes you 10x better."
> 
> "This week is HARD, but it's worth it!"

---

**🔥 THIS IS THE MOST IMPORTANT WEEK OF YOUR REACT JOURNEY! 🔥**

**TAKE YOUR TIME. UNDERSTAND DEEPLY. DON'T RUSH!**
