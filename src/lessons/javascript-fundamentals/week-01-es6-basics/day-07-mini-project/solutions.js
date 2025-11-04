// 🎓 SOLUTIONS - Day 7 (Mini Project + Final Test)

console.log('=== 📚 SOLUTIONS: DAY 7 ===\n');

// ---- Mini Project ----
const normalizeUsers = (users = []) =>
  users.reduce((acc, u) => ({ ...acc, [u.id]: u }), {});
const pick = (obj = {}, keys = []) =>
  keys.reduce((o, k) => (k in obj ? ((o[k] = obj[k]), o) : o), {});
const omit = (obj = {}, keys = []) => {
  const set = new Set(keys);
  return Object.keys(obj).reduce(
    (o, k) => (set.has(k) ? o : ((o[k] = obj[k]), o)),
    {}
  );
};
const groupBy = (list = [], key) =>
  list.reduce((acc, x) => {
    const v = x[key];
    (acc[v] ||= []).push(x);
    return acc;
  }, {});
const topNBy = (list = [], n = 1, selector = x => x) =>
  [...list].sort((a, b) => selector(b) - selector(a)).slice(0, n);
const uniqMerge = (a = [], b = []) => [...new Set([...a, ...b])];
const updateById = (list = [], id, patch = {}) =>
  list.map(it => (it.id === id ? { ...it, ...patch } : it));
const pipeline = (value, ...fns) => fns.reduce((v, f) => f(v), value);

console.log('Mini:', {
  normalizeUsers: normalizeUsers([
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ]),
  pick: pick({ a: 1, b: 2, c: 3 }, ['a', 'c']),
  omit: omit({ a: 1, b: 2, c: 3 }, ['b']),
  groupBy: groupBy(
    [
      { cat: 'x', v: 1 },
      { cat: 'y', v: 2 },
      { cat: 'x', v: 3 },
    ],
    'cat'
  ),
  topNBy: topNBy(
    [
      { n: 'a', s: 10 },
      { n: 'b', s: 30 },
      { n: 'c', s: 20 },
    ],
    2,
    x => x.s
  ),
  uniqMerge: uniqMerge([1, 2, 2], [2, 3, 4]),
  updateById: updateById(
    [
      { id: 1, n: 'A' },
      { id: 2, n: 'B' },
    ],
    2,
    { n: 'B+' }
  ),
  pipeline: pipeline(
    2,
    x => x + 1,
    x => x * 3
  ),
});

// ---- Final Test ----
const getName = ({ profile: { name } }) => name;
const firstLast = (arr = []) => ({ first: arr[0], last: arr[arr.length - 1] });
const mergeSettings = (base = {}, override = {}) => ({ ...base, ...override });
const safeUser = ({ password, ...rest }) => rest;
const sumOdd = (...nums) =>
  nums.filter(n => n % 2 === 1).reduce((s, n) => s + n, 0);
const toPairs = obj => Object.entries(obj);
const updateByIdFT = (list = [], id, patch) =>
  list.map(it => (it.id === id ? { ...it, ...patch } : it));
const pipe =
  (...fns) =>
  x =>
    fns.reduce((v, f) => f(v), x);

console.log('Final:', {
  name: getName({ profile: { name: 'John' } }),
  firstLast: firstLast([10, 20, 30]),
  merge: mergeSettings({ a: 1, b: 2 }, { b: 9, c: 3 }),
  safe: safeUser({ id: 1, u: 'a', password: 'x' }),
  sumOdd: sumOdd(1, 2, 3, 4, 5),
  pairs: toPairs({ a: 1, b: 2 }),
  updated: updateByIdFT(
    [
      { id: 1, n: 'A' },
      { id: 2, n: 'B' },
    ],
    2,
    { n: 'B+' }
  ),
  pipe: pipe(
    x => x + 1,
    x => x * 2
  )(3),
});

console.log('\n✅ Solutions ready. Chỉ dùng để đối chiếu sau khi tự làm.');
