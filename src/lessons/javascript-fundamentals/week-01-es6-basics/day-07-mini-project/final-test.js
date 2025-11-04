// 🧪 FINAL TEST - Week 1 (30 phút)
// Chạy: node final-test.js
// Yêu cầu: Pass 8/8. Không mutate input. Dùng destructuring + spread/rest + arrow.

console.log('=== FINAL TEST - WEEK 1 ===\n');

// 1) getName({ profile:{ name } }) -> name
// const getName = /* ... */
// console.log('1)', getName({ profile: { name: 'John' } })); // John

// 2) firstLast(arr) -> { first, last }
// const firstLast = /* ... */
// console.log('2)', firstLast([10,20,30])); // { first:10, last:30 }

// 3) mergeSettings(base, override) (ưu tiên override)
// const mergeSettings = /* ... */
// console.log('3)', mergeSettings({a:1,b:2},{b:9,c:3})); // {a:1,b:9,c:3}

// 4) safeUser({ password, ...rest }) -> rest
// const safeUser = /* ... */
// console.log('4)', safeUser({ id:1, u:'a', password:'x' })); // không có password

// 5) sumOdd(...nums) -> tổng số lẻ
// const sumOdd = /* ... */
// console.log('5)', sumOdd(1,2,3,4,5)); // 9

// 6) toPairs({a:1,b:2}) -> [['a',1],['b',2]] (gợi ý: Object.entries)
// const toPairs = /* ... */
// console.log('6)', toPairs({a:1,b:2}));

// 7) updateById(list, id, patch) (immutably)
// const updateById = /* ... */
// console.log('7)', updateById([{id:1,n:'A'},{id:2,n:'B'}], 2, {n:'B+'}));

// 8) pipe(...fns)(x) -> f(g(h(x)))
// const pipe = /* ... */
// const f = pipe(x=>x+1, x=>x*2);
// console.log('8)', f(3)); // 8

console.log('\n✅ Hoàn tất đề — Tự chấm 8/8 trước khi xem solutions');
