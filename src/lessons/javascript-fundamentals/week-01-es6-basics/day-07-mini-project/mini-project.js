// 🧩 MINI PROJECT: Utils Library (Day 7)
// Chạy: node mini-project.js
// Yêu cầu: Không mutate input. Ưu tiên arrow + destructuring + spread/rest.

console.log('=== MINI PROJECT: Utils Library ===\n');

// TODO 1: normalizeUsers(users) -> map theo id
// const normalizeUsers = (users=[]) => /* { [id]: user } */
// console.log('normalizeUsers:', normalizeUsers([{id:1,name:'A'},{id:2,name:'B'}]));

// TODO 2: pick(obj, keys)
// const pick = (obj={}, keys=[]) => /* object chỉ chứa keys */
// console.log('pick:', pick({a:1,b:2,c:3}, ['a','c'])); // {a:1,c:3}

// TODO 3: omit(obj, keys)
// const omit = (obj={}, keys=[]) => /* dùng rest bỏ keys */
// console.log('omit:', omit({a:1,b:2,c:3}, ['b'])); // {a:1,c:3}

// TODO 4: groupBy(list, key)
// const groupBy = (list=[], key) => /* { value: [items] } */
// console.log('groupBy:', groupBy([
//  {cat:'x',v:1},{cat:'y',v:2},{cat:'x',v:3}
// ], 'cat'));

// TODO 5: topNBy(list, n, selector)
// const topNBy = (list=[], n=1, selector=x=>x) => /* trả n phần tử có selector lớn nhất */
// console.log('topNBy:', topNBy([
//  {name:'a',score:10},{name:'b',score:30},{name:'c',score:20}
// ], 2, x=>x.score)); // b, c

// TODO 6: uniqMerge(a, b)
// const uniqMerge = (a=[], b=[]) => /* [...new Set([...a, ...b])] */
// console.log('uniqMerge:', uniqMerge([1,2,2], [2,3,4])); // [1,2,3,4]

// TODO 7: updateById(list, id, patch)
// const updateById = (list=[], id, patch={}) => /* map + {...item,...patch} nếu id trùng */
// console.log('updateById:', updateById([
//  {id:1,n:'A'},{id:2,n:'B'}
// ], 2, { n:'B+', active:true }));

// TODO 8: pipeline(value, ...fns)
// const pipeline = (value, ...fns) => /* reduce */
// console.log('pipeline:', pipeline(2, x=>x+1, x=>x*3)); // 9

console.log(
  '\n✅ Xong Mini Project (viết xong hết TODO rồi hãy xem solutions)'
);
