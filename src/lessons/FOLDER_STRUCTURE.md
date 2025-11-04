# 📂 FOLDER STRUCTURE OVERVIEW

```
src/lessons/
│
├── 📖 ROADMAP_CHI_TIET.md          # Roadmap tổng thể 12 tuần
├── 📊 progress.md                   # Track tiến độ cá nhân
│
├── 🔥 javascript-fundamentals/      # GIAI ĐOẠN 1 (Tuần 1-4)
│   ├── README.md
│   │
│   ├── week-01-es6-basics/
│   │   ├── README.md
│   │   ├── day-01-02-destructuring/
│   │   │   ├── README.md            # Lý thuyết + hướng dẫn
│   │   │   ├── exercises-01.js      # Bài tập Object destructuring
│   │   │   ├── exercises-02.js      # Bài tập Array destructuring
│   │   │   ├── exercises-03.js      # Function parameters
│   │   │   ├── exercises-04.js      # Nested destructuring
│   │   │   ├── self-test.js         # Tự test (5 phút)
│   │   │   └── solutions.js         # Solutions (xem sau khi làm xong)
│   │   │
│   │   ├── day-03-04-spread-rest/
│   │   │   ├── README.md
│   │   │   ├── exercises-01.js      # Clone array/object
│   │   │   ├── exercises-02.js      # Merge
│   │   │   ├── exercises-03.js      # Rest parameters
│   │   │   ├── exercises-04.js      # Immutable updates
│   │   │   ├── exercises-05.js      # Advanced
│   │   │   ├── self-test.js
│   │   │   └── solutions.js
│   │   │
│   │   ├── day-05-06-arrow-functions/
│   │   │   ├── README.md
│   │   │   ├── exercises-01.js      # Convert to arrow
│   │   │   ├── exercises-02.js      # Array methods
│   │   │   ├── exercises-03.js      # Implicit return
│   │   │   ├── exercises-04.js      # Callbacks
│   │   │   ├── exercises-05.js      # Method chaining
│   │   │   ├── self-test.js
│   │   │   └── solutions.js
│   │   │
│   │   └── day-07-mini-project/
│   │       ├── README.md
│   │       ├── user-management.js   # Mini project
│   │       ├── final-test.js        # Final test tuần 1
│   │       └── solutions.js
│   │
│   ├── week-02-array-async/
│   │   ├── README.md
│   │   ├── day-01-02-array-methods/
│   │   │   ├── README.md
│   │   │   ├── exercises-map.js
│   │   │   ├── exercises-filter.js
│   │   │   ├── exercises-reduce.js
│   │   │   ├── exercises-combined.js
│   │   │   ├── self-test.js
│   │   │   └── solutions.js
│   │   │
│   │   ├── day-03-04-promises-async/
│   │   │   ├── README.md
│   │   │   ├── exercises-promises.js
│   │   │   ├── exercises-async-await.js
│   │   │   ├── exercises-error-handling.js
│   │   │   ├── self-test.js
│   │   │   └── solutions.js
│   │   │
│   │   └── day-05-07-todo-api-project/
│   │       ├── README.md
│   │       ├── index.html
│   │       ├── app.js
│   │       ├── api.js
│   │       ├── styles.css
│   │       ├── final-test.js
│   │       └── solutions/
│   │
│   └── week-03-04-advanced-js/
│       ├── README.md
│       ├── objects-prototypes/
│       │   ├── README.md
│       │   └── exercises/
│       └── es6-features/
│           ├── README.md
│           └── exercises/
│
├── 🚀 react-core-concepts/          # GIAI ĐOẠN 2 (Tuần 5-8)
│   ├── README.md
│   │
│   ├── week-05-fundamentals/
│   │   ├── README.md
│   │   ├── day-01-02-components-jsx/
│   │   │   ├── README.md
│   │   │   ├── src/
│   │   │   │   ├── App.js
│   │   │   │   └── components/
│   │   │   ├── exercises/
│   │   │   └── solutions/
│   │   │
│   │   ├── day-03-04-props-state/
│   │   │   ├── README.md
│   │   │   ├── exercises/
│   │   │   └── solutions/
│   │   │
│   │   └── day-05-07-events-forms/
│   │       ├── README.md
│   │       ├── exercises/
│   │       └── solutions/
│   │
│   ├── week-06-useEffect/           # 🔥 CRITICAL WEEK!
│   │   ├── README.md
│   │   ├── day-01-03-useEffect-deep-dive/
│   │   │   ├── README.md
│   │   │   ├── exercises/
│   │   │   │   ├── 01-dependencies.js
│   │   │   │   ├── 02-cleanup.js
│   │   │   │   └── 03-common-patterns.js
│   │   │   └── solutions/
│   │   │
│   │   ├── day-04-07-data-fetching/
│   │   │   ├── README.md
│   │   │   ├── github-user-finder/
│   │   │   │   ├── src/
│   │   │   │   └── README.md
│   │   │   └── exercises/
│   │   │
│   │   └── bug-debugging/           # 10 bugs phải fix
│   │       ├── README.md
│   │       ├── bug-01-infinite-loop.js
│   │       ├── bug-02-missing-cleanup.js
│   │       ├── bug-03-race-condition.js
│   │       ├── ...
│   │       └── solutions/
│   │
│   └── week-07-08-context-api/
│       ├── README.md
│       ├── day-01-04-useContext/
│       │   ├── README.md
│       │   ├── exercises/
│       │   │   ├── auth-context.js
│       │   │   ├── theme-context.js
│       │   │   └── cart-context.js
│       │   └── solutions/
│       │
│       └── day-05-07-weather-app/
│           ├── README.md
│           ├── src/
│           │   ├── contexts/
│           │   ├── components/
│           │   └── App.js
│           └── final-test.js
│
└── 🎓 advanced-patterns/            # GIAI ĐOẠN 3 (Tuần 9-12)
    ├── README.md
    ├── week-09-10-custom-hooks/
    │   ├── README.md
    │   └── exercises/
    └── week-11-12-final-projects/
        ├── README.md
        ├── e-commerce-app/
        └── social-dashboard/
```

---

## 🎯 CÁC FILE QUAN TRỌNG

### 📖 Documentation
- `ROADMAP_CHI_TIET.md` - Roadmap tổng thể, đọc trước khi bắt đầu
- `progress.md` - Track tiến độ, update mỗi ngày

### 📚 Mỗi Lesson
- `README.md` - Lý thuyết + hướng dẫn
- `exercises-*.js` - Bài tập thực hành
- `self-test.js` - Tự test (bắt buộc)
- `solutions.js` - Đáp án (xem sau khi làm xong)

### 🎯 Checkpoints
- `final-test.js` - Test cuối mỗi tuần (bắt buộc pass)
- Mini projects - Tổng hợp kiến thức

---

## 📝 CÁCH SỬ DỤNG

### Bắt đầu Tuần 1:
```bash
cd src/lessons/javascript-fundamentals/week-01-es6-basics/day-01-02-destructuring

# 1. Đọc lý thuyết
cat README.md

# 2. Làm bài tập
node exercises-01.js
node exercises-02.js
node exercises-03.js
node exercises-04.js

# 3. Self-test (5 phút)
node self-test.js

# 4. Check solutions (sau khi làm xong)
node solutions.js

# 5. Update progress
# Edit: ../../progress.md
```

### Quy trình mỗi ngày:
1. ✅ Đọc README của ngày đó
2. ✅ Làm hết exercises
3. ✅ Chạy self-test
4. ✅ So sánh với solutions
5. ✅ Update progress.md
6. ✅ Review nếu chưa vững

### Cuối tuần:
1. ✅ Làm Final Test
2. ✅ PHẢI PASS mới qua tuần sau
3. ✅ Nếu fail → Làm lại toàn bộ tuần

---

## 🚨 QUY TẮC QUAN TRỌNG

### ✅ PHẢI LÀM:
- Đọc README trước khi code
- Làm đủ 100% bài tập
- Tự làm trước khi xem solutions
- Pass self-test mỗi concept
- Pass final-test mỗi tuần
- Update progress.md mỗi ngày

### ❌ KHÔNG ĐƯỢC:
- Skip bài tập
- Copy solutions
- Qua tuần mới khi chưa pass test
- Code mà không hiểu

---

## 📊 PROGRESS TRACKING

Mỗi concept có:
- [ ] Exercises: ___/X bài
- [ ] Self-test: ___/X trong ___ phút
- [ ] Score: ___/10 ⭐

Mỗi tuần có:
- [ ] Final test: ___/X trong ___ phút
- [ ] Overall: ___/100%

**Passing criteria:**
- Self-tests: 100% trong thời gian quy định
- Final tests: 100% để qua tuần tiếp theo
- Exercises: Làm đủ 100%

---

## 🎓 NEXT STEPS

1. ✅ Đọc `ROADMAP_CHI_TIET.md`
2. ✅ Setup `progress.md`
3. ✅ Bắt đầu Week 1 Day 1
4. ✅ Commit code mỗi ngày
5. ✅ Review mỗi 3 ngày

**LET'S START! 🚀**
