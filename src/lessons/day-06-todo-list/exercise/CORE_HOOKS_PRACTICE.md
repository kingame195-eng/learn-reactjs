# 🎣 CORE HOOKS PRACTICE PROJECT

## 🎯 **MỤC TIÊU:**
Thực hành 3 Core Hooks: **useState**, **useEffect**, **useContext** qua bài tập Shopping Cart

---

## 📋 **BÀI TẬP: SHOPPING CART MANAGEMENT**

### **🛒 YÊU CẦU CHỨC NĂNG:**

#### **1. Product Management (useState + useEffect)**
- Hiển thị danh sách sản phẩm
- Add/Remove sản phẩm vào cart
- Update quantity trong cart
- Tính tổng tiền tự động

#### **2. Theme Switcher (useContext)**
- Dark/Light mode toggle
- Theme được áp dụng toàn bộ app
- Lưu theme preference

#### **3. User Authentication (useContext + useEffect)**
- Login/Logout simulation
- Hiển thị user info
- Persist login state

---

## 🏗️ **CẤU TRÚC DỰ ÁN:**

```
src/lessons/core-hooks-practice/
├── index.js                    // Main App
├── contexts/
│   ├── ThemeContext.js         // useContext practice
│   └── AuthContext.js          // useContext practice
├── components/
│   ├── ProductList.js          // useState practice
│   ├── ShoppingCart.js         // useState + useEffect
│   ├── ThemeToggle.js          // useContext consumer
│   ├── UserProfile.js          // useContext consumer
│   └── LoginForm.js            // useState + useContext
└── styles/
    └── ShoppingCart.scss       // Styling
```

---

## 🎯 **BÀI TẬP CHI TIẾT:**

### **LEVEL 1: useState Practice**

#### **📝 Task 1.1: Product List Component**
```javascript
// File: components/ProductList.js
// YÊU CẦU:
// 1. useState để quản lý products list
// 2. useState để quản lý loading state
// 3. Add product to cart function
// 4. Remove product from list function

const INITIAL_PRODUCTS = [
    { id: 1, name: 'iPhone 15', price: 999, category: 'Electronics' },
    { id: 2, name: 'Nike Shoes', price: 150, category: 'Fashion' },
    { id: 3, name: 'Coffee Mug', price: 25, category: 'Home' },
    { id: 4, name: 'Laptop', price: 1299, category: 'Electronics' }
];

// TODO: Implement ProductList component
```

#### **📝 Task 1.2: Shopping Cart Component**
```javascript
// File: components/ShoppingCart.js
// YÊU CẦU:
// 1. useState để quản lý cart items
// 2. useState để quản lý total price
// 3. Add/Remove/Update quantity functions
// 4. Clear cart function

// TODO: Implement ShoppingCart component
```

---

### **LEVEL 2: useEffect Practice**

#### **📝 Task 2.1: Auto-calculate Total**
```javascript
// YÊU CẦU:
// 1. useEffect để tự động tính total khi cart thay đổi
// 2. useEffect để save cart to localStorage
// 3. useEffect để load cart from localStorage khi mount

// EXAMPLE:
useEffect(() => {
    // Calculate total whenever cart changes
    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
}, [cartItems]);

// TODO: Implement auto-calculation logic
```

#### **📝 Task 2.2: Data Persistence**
```javascript
// YÊU CẦU:
// 1. Save cart to localStorage mỗi khi cart thay đổi
// 2. Load cart từ localStorage khi component mount
// 3. Handle localStorage errors

// TODO: Implement localStorage integration
```

---

### **LEVEL 3: useContext Practice**

#### **📝 Task 3.1: Theme Context**
```javascript
// File: contexts/ThemeContext.js
// YÊU CẦU:
// 1. Tạo ThemeContext với createContext
// 2. ThemeProvider component với useState
// 3. Toggle theme function
// 4. Provide theme value và toggleTheme

// STRUCTURE:
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // TODO: Implement theme state và toggle function
}

export function useTheme() {
    // TODO: Implement custom hook để use ThemeContext
}
```

#### **📝 Task 3.2: Auth Context**
```javascript
// File: contexts/AuthContext.js
// YÊU CẦU:
// 1. Tạo AuthContext
// 2. Manage user state (null = not logged in)
// 3. Login/Logout functions
// 4. Persist auth state với localStorage

// TODO: Implement authentication context
```

#### **📝 Task 3.3: Context Consumers**
```javascript
// File: components/ThemeToggle.js
// YÊU CẦU:
// 1. Use useContext để get theme state
// 2. Button để toggle theme
// 3. Hiển thị current theme

// File: components/UserProfile.js
// YÊU CẦU:
// 1. Use useContext để get user state
// 2. Hiển thị user info hoặc login prompt
// 3. Logout button nếu đã login

// TODO: Implement context consumers
```

---

## 🎯 **IMPLEMENTATION STEPS:**

### **🔥 STEP 1: Setup Structure (15 mins)**
1. Tạo folders và files theo structure
2. Setup basic imports và exports
3. Tạo SCSS file với basic styling

### **🔥 STEP 2: useState Practice (30 mins)**
1. Implement ProductList với state management
2. Implement ShoppingCart với add/remove logic
3. Test basic functionality

### **🔥 STEP 3: useEffect Practice (20 mins)**
1. Auto-calculate total
2. localStorage integration
3. Component lifecycle handling

### **🔥 STEP 4: useContext Practice (35 mins)**
1. Create ThemeContext và ThemeProvider
2. Create AuthContext và AuthProvider
3. Implement context consumers
4. Wrap App với providers

### **🔥 STEP 5: Integration (20 mins)**
1. Connect all components
2. Test full functionality
3. Styling và polish

---

## 📝 **DETAILED REQUIREMENTS:**

### **🛒 Shopping Cart Features:**
- [x] Add product to cart
- [x] Remove product from cart  
- [x] Update quantity (+ / - buttons)
- [x] Clear entire cart
- [x] Calculate total price automatically
- [x] Show cart item count
- [x] Persist cart in localStorage

### **🎨 Theme Features:**
- [x] Dark/Light mode toggle
- [x] Apply theme to all components
- [x] Save theme preference
- [x] Theme button với current state

### **👤 Auth Features:**
- [x] Login form (username only)
- [x] Logout functionality
- [x] Show user profile
- [x] Persist login state
- [x] Protected cart access

---

## 🧪 **TESTING CHECKLIST:**

### **useState Tests:**
- [ ] Add product → cart updates
- [ ] Remove product → cart updates
- [ ] Update quantity → total recalculates
- [ ] State persists during component lifecycle

### **useEffect Tests:**
- [ ] Total auto-calculates khi cart changes
- [ ] Cart saves to localStorage
- [ ] Cart loads from localStorage on mount
- [ ] No infinite loops

### **useContext Tests:**
- [ ] Theme changes across all components
- [ ] Auth state accessible everywhere
- [ ] Context updates trigger re-renders
- [ ] No prop drilling needed

---

## 💡 **BONUS CHALLENGES:**

### **🔥 Advanced Features:**
1. **Product Search** (useState + useEffect)
2. **Category Filter** (useState)
3. **Order History** (useContext + useEffect)
4. **Cart Animation** (useRef + useEffect)
5. **Loading States** (useState + useEffect)

### **🎯 Performance Optimization:**
1. Prevent unnecessary re-renders
2. Optimize context providers
3. Memoize expensive calculations

---

## 🎉 **SUCCESS CRITERIA:**

Bạn hoàn thành thành công khi:
- ✅ All core functionality works
- ✅ No prop drilling (sử dụng Context)
- ✅ State persists across page refresh
- ✅ Theme applies to all components
- ✅ Clean code với proper separation
- ✅ No console errors

---

## 🚀 **NEXT STEPS:**
Sau khi hoàn thành project này, bạn sẽ:
- Master 3 core hooks
- Hiểu Context Pattern
- Biết cách manage complex state
- Ready cho performance hooks (useMemo, useCallback)

**🎯 LET'S BUILD IT!**