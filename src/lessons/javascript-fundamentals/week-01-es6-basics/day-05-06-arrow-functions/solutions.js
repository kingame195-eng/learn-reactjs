// 🎓 SOLUTIONS - Day 5-6: Arrow Functions

console.log('=== 📚 SOLUTIONS: ARROW ===\n');

// Bài 1
const add2 = (a, b) => a + b;
const square2 = x => x * x;
const getUser2 = id => ({ id, name: 'User' + id });
console.log('B1:', add2(1, 2), square2(3), getUser2(5));

// Bài 2
const nums = [1, 2, 3, 4, 5];
const squares = nums.map(x => x * x);
const evens = nums.filter(x => x % 2 === 0);
const total = nums.reduce((s, x) => s + x, 0);
const chain = nums
  .filter(x => x % 2 === 1)
  .map(x => x * x)
  .reduce((s, x) => s + x, 0);
console.log('B2:', { squares, evens, total, chain });

// Bài 3
const obj = {
  value: 0,
  incLater() {
    setTimeout(() => {
      this.value++;
    }, 10);
  },
  forEachLog(arr) {
    arr.forEach(x => console.log(this.value, x));
  },
};
setTimeout(() => obj.incLater(), 0);
setTimeout(() => obj.forEachLog([1, 2, 3]), 20);

const counter = {
  count: 0,
  add(n) {
    this.count += n;
  },
};
// addArrow dùng arrow sẽ sai this nếu gọi như method trên object.

// Bài 4
const greet = (name = 'Guest', ...tags) => `${name} [${tags.join(',')}]`;
const sum = a => b => c => a + b + c;
const makeCounter =
  (start = 0) =>
  () =>
    ++start;
const makeUser = (id, name) => ({ id, name, role: 'user' });
console.log(
  'B4:',
  greet('John', 'vip', 'new'),
  sum(1)(2)(3),
  makeCounter(5)(),
  makeUser(1, 'A')
);

// Self-test
const double = n => n * 2;
const pickId = o => ({ id: o.id });
const timer = {
  count: 0,
  start() {
    setTimeout(() => {
      this.count++;
    }, 5);
  },
};
console.log('Self:', double(7), pickId({ id: 1 }), '(timer uses arrow)');
