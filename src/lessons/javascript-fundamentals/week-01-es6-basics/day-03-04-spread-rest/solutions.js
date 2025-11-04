// 🎓 SOLUTIONS - Day 3-4: Spread & Rest
// ⚠️ Chỉ xem sau khi tự làm!

console.log('=== 📚 SOLUTIONS: SPREAD & REST ===\n');

// ======================
// BÀI 1: Array Spread
// ======================
console.log('\n--- BÀI 1 ---');
const a = [1, 2, 3];
const b = [4, 5];

// 1
const aCopy = [...a];
console.log('1) a===aCopy?', a === aCopy); // false

// 2
const ab = [...a, ...b];
console.log('2) ab:', ab); // [1,2,3,4,5]

// 3
const newA = [0, ...a, 99];
console.log('3) newA:', newA); // [0,1,2,3,99]
console.log('   a after:', a);

// 4
const insertAt2 = [...a.slice(0, 2), 999, ...a.slice(2)];
console.log('4) insertAt2:', insertAt2); // [1,2,999,3]

// 5
const removedIdx1 = [...a.slice(0, 1), ...a.slice(2)];
console.log('5) removedIdx1:', removedIdx1); // [1,3]

// ======================
// BÀI 2: Object Spread
// ======================
console.log('\n--- BÀI 2 ---');
const base = { theme: 'light', lang: 'vi', sidebar: true };
const override = { theme: 'dark' };

// 1
const baseCopy = { ...base };
console.log('1) base===baseCopy?', base === baseCopy); // false

// 2
const settings = { ...base, ...override };
console.log('2) settings:', settings);

const user2 = {
  id: 1,
  name: 'John',
  profile: { city: 'Hanoi', street: 'Le Loi' },
};
// 3
const newUser = { ...user2, profile: { ...user2.profile, city: 'HCM' } };
console.log('3) newUser:', newUser);
console.log('   user2 === newUser?', user2 === newUser); // false
console.log('   profile ref equal?', user2.profile === newUser.profile); // false

const account = {
  id: 1,
  username: 'john',
  password: 'secret',
  email: 'john@example.com',
};
// 4
const { password, ...safeAccount } = account;
console.log('4) safeAccount:', safeAccount);

// ======================
// BÀI 3: Rest Parameters
// ======================
console.log('\n--- BÀI 3 ---');
function sum(...nums) {
  return nums.reduce((s, n) => s + n, 0);
}
console.log('1) sum:', sum(1, 2, 3));

function max(...nums) {
  return nums.reduce((m, n) => (n > m ? n : m), Number.NEGATIVE_INFINITY);
}
console.log('2) max:', max(5, 1, 9, 3));

function unique(...items) {
  return [...new Set(items)];
}
console.log('3) unique:', unique(1, 2, 2, 3, 1));

function joinWith(sep, ...parts) {
  return parts.join(sep);
}
console.log('4) joinWith:', joinWith('-', 'a', 'b', 'c'));

// ======================
// BÀI 4: Mix nâng cao
// ======================
console.log('\n--- BÀI 4 ---');
function pickIdAndRest(obj) {
  const { id, ...rest } = obj;
  return { id, rest };
}
console.log('1) pickIdAndRest:', pickIdAndRest({ id: 10, name: 'A', age: 20 }));

const list = [
  { id: 1, name: 'A', score: 10 },
  { id: 2, name: 'B', score: 15 },
  { id: 3, name: 'C', score: 20 },
];
const newList = list.map(item =>
  item.id === 2 ? { ...item, score: 18 } : item
);
console.log('2) newList:', newList);
console.log('   list===newList?', list === newList);
console.log('   item2 ref equal?', list[1] === newList[1]);

const u = [...new Set([...[1, 2, 2, 3], ...[2, 3, 4]])];
console.log('3) unique merged:', u);

const state = { user: { profile: { city: 'HN', tags: ['js'] } } };
// wrong shallow copy
const wrong = { ...state };
wrong.user.profile.city = 'HCM';
console.log('4) shallow pitfall city:', state.user.profile.city); // bị đổi
// fix
const state2 = { user: { profile: { city: 'HN', tags: ['js'] } } };
const fixed = {
  ...state2,
  user: { ...state2.user, profile: { ...state2.user.profile, city: 'HCM' } },
};
console.log(
  '4) fixed city:',
  fixed.user.profile.city,
  '| original city:',
  state2.user.profile.city
);

// ======================
// SELF-TEST
// ======================
console.log('\n--- SELF-TEST ---');
const arr = [1, 2, 3];
const out1 = [0, ...arr, 999];
console.log('1) out1:', out1, '| arr:', arr);

const user = { id: 1, name: 'John', password: 'secret', city: 'HN' };
const updates = { city: 'HCM', age: 25 };
const merged = { ...user, ...updates };
const { password: _p, ...safe } = merged;
console.log('2) safe:', safe);

function sumEven(...nums) {
  return nums.filter(n => n % 2 === 0).reduce((s, n) => s + n, 0);
}
console.log('3) sumEven:', sumEven(1, 2, 3, 4, 5, 6));

console.log('\n✅ Solutions complete!');
