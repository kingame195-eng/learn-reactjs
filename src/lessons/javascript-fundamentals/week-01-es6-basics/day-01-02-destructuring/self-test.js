// 📝 SELF-TEST: Destructuring
// Làm trong 5 phút không Google!

console.log('=== SELF-TEST: Destructuring ===\n');
console.time('Time taken');

// Test 1: Destructure trong 1 dòng
const data = {
  user: { name: 'John', age: 25 },
  posts: [1, 2, 3],
};

// TODO: Lấy name, age, first post trong 1 dòng
// const { user: { name, age }, posts: [firstPost] } = data;
// console.log('Test 1:', name, age, firstPost);
// Expected: 'John' 25 1
{
  const {
    user: { name, age },
    posts: [first],
  } = data;
  console.log('Test 1:', name, age, first);
}

// Test 2: Function parameters
function greet({ name, age }) {
  return `${name}, ${age} years old`;
}

console.log('Test 2:', greet({ name: 'John', age: 25, city: 'Hanoi' }));
// Expected: 'John, 25 years old'

// Test 3: Swap values
let a = 1,
    b = 2;
[a, b] = [b, a];

// TODO: Swap a và b bằng destructuring
// [a, b] = ???

console.log('Test 3:', `a=${a}, b=${b}`);
// Expected: a=2, b=1

console.timeEnd('Time taken');
console.log('\n✅ PASS: 3/3 trong < 5 phút');
console.log('❌ FAIL: < 3/3 hoặc > 5 phút → Làm lại 4 bài tập');
