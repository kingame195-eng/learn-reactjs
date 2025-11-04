// 📝 EXERCISES 04: Patterns nâng cao
// Chạy: node exercises-04.js

console.log('=== BÀI 4: Patterns nâng cao ===\n');

// TODO 1: Default params + rest
// const greet = (name = 'Guest', ...tags) => /* return `${name} [${tags.join(',')}]` */
// console.log(greet('John', 'vip', 'new')); // John [vip,new]
// console.log(greet()); // Guest []

// TODO 2: Currying sum(a)(b)(c)
// const sum = a => b => c => /* a+b+c */
// console.log(sum(1)(2)(3)); // 6

// TODO 3: Factory + closure
// const makeCounter = (start=0) => () => /* ++start */
// const c = makeCounter(5); console.log(c(), c(), c()); // 6 7 8

// TODO 4: Return object trong 1 dòng
// const makeUser = (id, name) => /* trả object { id, name, role:'user' } */

console.log('\n✅ Xong bài 4!');
