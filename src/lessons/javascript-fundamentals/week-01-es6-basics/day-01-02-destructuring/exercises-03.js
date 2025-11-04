// 📝 EXERCISES 03: Function Parameters Destructuring
// Làm trực tiếp trong file này, sau đó chạy: node exercises-03.js

console.log('=== BÀI 3: Function Parameters ===\n');

// TODO 1: Viết function greet nhận {name, age}
// function greet({ name, age }) {
//   return `Hello, ${name}. You are ${age} years old.`;
// }

// Viết function ở đây:
function greet({ name, age }) {
  return `Hello, ${name}. You are ${age} years old.`;
}

// Test function:
console.log(greet({ name: 'John', age: 25, city: 'Hanoi' }));
// Expected: 'Hello, John. You are 25 years old.'

// TODO 2: Viết function calculateTotal nhận {price, quantity, discount = 0}
// function calculateTotal({ price, quantity, discount = 0 }) {
//   const subtotal = price * quantity;
//   return subtotal - discount;
// }

// Viết function ở đây:
function calculateTotal({ price, quantity, discount = 0 }) {
  const subtotal = price * quantity;
  return subtotal - discount;
}

// Test function:
// console.log(calculateTotal({ price: 100, quantity: 2 }));
// Expected: 200

console.log(calculateTotal({ price: 100, quantity: 2, discount: 10 }));
// Expected: 190

// TODO 3: Viết function displayAddress nhận nested object
const userData = {
  name: 'John',
  contact: {
    email: 'john@example.com',
    address: {
      city: 'Hanoi',
      street: 'Le Loi',
    },
  },
};

// function displayAddress({ name, contact: { address: { city, street } } }) {
//   return `${name} lives at ${street}, ${city}`;
// }

// Viết function ở đây:
function displayAddress({
  name,
  contact: {
    address: { city, street },
  },
}) {
  return `${name} lives at ${street}, ${city}`;
}

// Test function:
console.log(displayAddress(userData));
// Expected: 'John lives at Le Loi, Hanoi'

console.log('\n✅ Xong bài 3! Chạy: node exercises-03.js để test');
