// 📝 EXERCISES 04: Nested Destructuring
// Làm trực tiếp trong file này, sau đó chạy: node exercises-04.js

console.log('=== BÀI 4: Nested Destructuring ===\n');

const data = {
  user: {
    id: 1,
    profile: {
      name: 'John Doe',
      avatar: 'avatar.jpg',
      settings: {
        notifications: {
          email: true,
          push: false,
        },
      },
    },
  },
  posts: [
    { id: 1, title: 'Post 1', likes: 10 },
    { id: 2, title: 'Post 2', likes: 20 },
  ],
};

// TODO 1: Lấy name và avatar trong 1 dòng
// const { user: { profile: { name, avatar } } } = data;
//console.log(name, avatar);
// Expected: 'John Doe' 'avatar.jpg'
{
  const {
    user: {
      profile: { name, avatar },
    },
  } = data;
  console.log(name, avatar);
}

// TODO 2: Lấy email notification setting
// const { user: { profile: { settings: { notifications: { email } } } } } = data;
// console.log(email);
// Expected: true
{
  const {
    user: {
      profile: {
        settings: {
          notifications: { email },
        },
      },
    },
  } = data;
  console.log(email);
}

// TODO 3: Lấy title của post đầu tiên
// const { posts: [{ title }] } = data;
// console.log(title);
// Expected: 'Post 1'
{
  const {
    posts: [{ title }],
  } = data;
  console.log(title);
}

// TODO 4: Lấy name, email notification, và first post title trong 1 dòng
// const {
//   user: {
//     profile: {
//       name,
//       settings: {
//         notifications: { email }
//       }
//     }
//   },
//   posts: [{ title }]
// } = data;
// console.log(name, email, title);
// Expected: 'John Doe' true 'Post 1'


console.log('\n✅ Xong bài 4! Chạy: node exercises-04.js để test');
