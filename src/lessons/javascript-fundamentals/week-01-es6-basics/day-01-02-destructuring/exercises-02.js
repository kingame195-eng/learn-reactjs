// 📝 EXERCISES 02: Array Destructuring

console.log('=== BÀI 2: Array Destructuring ===\n');

const numbers = [10, 20, 30, 40, 50];

// TODO 1: Lấy phần tử đầu và cuối
// Hint: Dùng length
// const [first] = numbers;
// const last = numbers[numbers.length - 1];
// Hoặc có cách khác không?
const [first, last] = [numbers[0], numbers[numbers.length - 1]];
console.log(first, last);

// TODO 2: Lấy 3 phần tử đầu, phần còn lại vào array mới
// const [a, b, c, ...rest] = numbers;
// console.log([a, b, c], rest);
// Expected: [10, 20, 30] [40, 50]
const [a, b, c, ...rest] = numbers;
console.log([a, b, c], rest);

// TODO 3: Skip phần tử thứ 2 và 4
// const [first, , third, , fifth] = numbers;
// console.log(first, third, fifth);
// Expected: 10 30 50
{
  const [first, , third, , fifth] = numbers;
  console.log(first, third, fifth);
}

// TODO 4: Combine arrays và destructure
const fruits = ['apple', 'banana', 'orange'];
const vegetables = ['carrot', 'potato'];

// Combine vào 1 array, sau đó destructure
// const combined = [...fruits, ...vegetables];
// const [first, second, ...veggies] = ???
// console.log(first, second, veggies);
// Expected: 'apple' 'banana' ['orange', 'carrot', 'potato']

{
  const combined = [...fruits, ...vegetables];
  const [first, second, ...veggies] = combined;
  console.log(first, second, veggies);
}

console.log('\n✅ Xong bài 2! Chạy: node exercises-02.js');
