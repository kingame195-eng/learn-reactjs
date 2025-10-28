# 🏗️ React Project Structure

## 📁 Folder Structure

```
src/
├── components/                  🧩 Reusable Components
│   ├── common/                 🔄 Common UI Components
│   │   ├── Button/
│   │   │   ├── Button.js
│   │   │   ├── Button.css
│   │   │   └── index.js
│   │   ├── Input/
│   │   │   ├── Input.js
│   │   │   ├── Input.css
│   │   │   └── index.js
│   │   └── index.js           📦 Export all common components
│   ├── layout/                🏠 Layout Components  
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   └── index.js
│   │   └── index.js
│   └── ...
├── pages/                      📄 Page Components
│   ├── Home/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   └── index.js
│   └── ...
├── hooks/                      🎣 Custom Hooks
│   └── index.js               (useLocalStorage, useDebounce...)
├── utils/                      🛠️ Utility Functions
│   └── helpers.js             (formatCurrency, isValidEmail...)
├── styles/                     🎨 Global Styles
│   └── globals.css
├── lessons/                    📚 Learning Materials
│   ├── day-01-components-and-props/
│   ├── day-02-render-element/
│   └── ...
├── App.js                      🚀 Main App Component
└── index.js                    🏁 Entry Point
```

## 🎯 Design Principles

### ✅ **Component Organization:**
- **common/**: Tái sử dụng toàn project (Button, Input, Modal)
- **layout/**: Layout components (Header, Footer, Sidebar)  
- **pages/**: Page-level components
- **Each component có folder riêng** với JS + CSS + index.js

### ✅ **Import Strategy:**
```javascript
// ❌ Avoid this
import Button from './components/common/Button/Button';

// ✅ Better - using index.js
import Button from './components/common/Button';

// ✅ Even better - using barrel exports
import { Button, Input } from './components/common';
```

### ✅ **File Naming:**
- **Components**: PascalCase (`Button.js`, `UserProfile.js`)
- **Hooks**: camelCase starting with 'use' (`useLocalStorage.js`)
- **Utils**: camelCase (`helpers.js`, `apiService.js`)
- **CSS**: Same as component (`Button.css`)

### ✅ **Folder Structure Per Component:**
```
Component/
├── Component.js      # Main component logic
├── Component.css     # Component styles  
├── Component.test.js # Tests (optional)
└── index.js          # Export barrel
```

## 🚀 Usage Examples

### **Using Common Components:**
```javascript
import { Button, Input } from '../components/common';

function MyForm() {
  return (
    <div>
      <Input label="Name" placeholder="Enter name" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

### **Using Custom Hooks:**
```javascript
import { useLocalStorage, useDebounce } from '../hooks';

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const debouncedTheme = useDebounce(theme, 300);
  
  return <div>Current theme: {debouncedTheme}</div>;
}
```

### **Using Utils:**
```javascript
import { formatCurrency, isValidEmail } from '../utils/helpers';

const price = formatCurrency(25000); // "25.000 ₫"
const valid = isValidEmail('test@email.com'); // true
```

## 🎨 Benefits

### ✅ **Scalability:**
- Dễ thêm components mới
- Tách biệt concerns rõ ràng
- Code reusability cao

### ✅ **Maintainability:**  
- Tìm file dễ dàng
- Import/export rõ ràng
- Testing isolated

### ✅ **Team Collaboration:**
- Structure nhất quán
- Easy onboarding
- Clear responsibilities

### ✅ **Performance:**
- Tree shaking friendly
- Code splitting ready
- Lazy loading support