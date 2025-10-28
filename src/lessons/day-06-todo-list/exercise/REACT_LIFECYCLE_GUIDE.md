# 🔄 REACT COMPONENT LIFECYCLE - HƯỚNG DẪN CHI TIẾT

## 🎯 **GIỚI THIỆU TỔNG QUAN**

Component Lifecycle là **chu kỳ sống** của một React component từ lúc sinh ra đến lúc chết đi. Giống như con người: **Sinh → Sống → Chết**.

---

## 📊 **3 GIAI ĐOẠN CHÍNH**

### **🟢 1. MOUNTING (Khởi Sinh)**
**Định nghĩa:** Component được tạo ra và mount vào DOM lần đầu tiên.

#### **🔄 QUÁ TRÌNH:**
```
constructor() → render() → componentDidMount()
```

#### **💡 DỄ NHỚ:**
- **Constructor**: "Chuẩn bị đồ đạc" - setup state, bind methods
- **Render**: "Vẽ blueprin" - tạo ra Virtual DOM
- **ComponentDidMount**: "Dọn vào nhà" - component đã sẵn sàng trong DOM

#### **📝 VÍ DỤ THỰC TẾ:**
```javascript
class ProductFeature extends React.Component {
    constructor(props) {
        super(props);
        console.log("1. Constructor: Chuẩn bị đồ đạc");
        this.state = {
            productsList: [],
            filterStatus: 'all'
        };
    }

    render() {
        console.log("2. Render: Vẽ blueprint");
        return <div>Product List</div>;
    }

    componentDidMount() {
        console.log("3. ComponentDidMount: Dọn vào nhà");
        // Gọi API, setup event listeners
        this.fetchProducts();
    }
}
```

#### **🎯 FUNCTION COMPONENT TƯƠNG ĐƯƠNG:**
```javascript
function ProductFeature() {
    // Constructor logic
    const [productsList, setProductsList] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    // ComponentDidMount logic
    useEffect(() => {
        console.log("Component đã mount!");
        fetchProducts();
    }, []); // Empty dependency = chỉ chạy 1 lần

    // Render logic
    return <div>Product List</div>;
}
```

---

### **🔄 2. UPDATING (Sống & Thay Đổi)**
**Định nghĩa:** Component đã mount và đang cập nhật khi có thay đổi.

#### **🔄 TRIGGERS (Nguyên nhân gây update):**
1. **New Props**: Parent truyền props mới
2. **setState()**: State thay đổi
3. **forceUpdate()**: Ép buộc update

#### **🔄 QUÁ TRÌNH:**
```
render() → componentDidUpdate()
```

#### **💡 DỄ NHỚ:**
- **Render**: "Sửa chữa nhà" - tạo Virtual DOM mới
- **ComponentDidUpdate**: "Kiểm tra sau sửa chữa" - xử lý sau khi update

#### **📝 VÍ DỤ THỰC TẾ:**
```javascript
class ProductFeature extends React.Component {
    handleFilterChange = (newFilter) => {
        console.log("User thay đổi filter → trigger update");
        this.setState({ filterStatus: newFilter }); // ← Trigger update
    }

    render() {
        console.log("Re-render: Vẽ lại UI với filter mới");
        const { productsList, filterStatus } = this.state;
        
        const filteredProducts = productsList.filter(product =>
            filterStatus === 'all' || product.status === filterStatus
        );
        
        return (
            <div>
                <FilterButtons onFilterChange={this.handleFilterChange} />
                <ProductList products={filteredProducts} />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("ComponentDidUpdate: Kiểm tra thay đổi");
        
        if (prevState.filterStatus !== this.state.filterStatus) {
            console.log(`Filter changed: ${prevState.filterStatus} → ${this.state.filterStatus}`);
            // Có thể log analytics, save to localStorage, etc.
        }
    }
}
```

#### **🎯 FUNCTION COMPONENT TƯƠNG ĐƯƠNG:**
```javascript
function ProductFeature() {
    const [productsList, setProductsList] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    // ComponentDidUpdate logic
    useEffect(() => {
        console.log(`Filter changed to: ${filterStatus}`);
        // Logic xử lý khi filter thay đổi
    }, [filterStatus]); // Dependency array = chỉ chạy khi filterStatus thay đổi

    const handleFilterChange = (newFilter) => {
        console.log("User thay đổi filter → trigger update");
        setFilterStatus(newFilter); // ← Trigger re-render
    };

    // Auto re-render khi state thay đổi
    const filteredProducts = productsList.filter(product =>
        filterStatus === 'all' || product.status === filterStatus
    );

    return (
        <div>
            <FilterButtons onFilterChange={handleFilterChange} />
            <ProductList products={filteredProducts} />
        </div>
    );
}
```

---

### **🔴 3. UNMOUNTING (Chết)**
**Định nghĩa:** Component bị remove khỏi DOM và destroyed.

#### **🔄 QUÁ TRÌNH:**
```
componentWillUnmount() → Component destroyed
```

#### **💡 DỄ NHỚ:**
- **ComponentWillUnmount**: "Dọn dẹp trước khi chuyển nhà" - cleanup

#### **📝 VÍ DỤ THỰC TẾ:**
```javascript
class ProductFeature extends React.Component {
    componentDidMount() {
        // Setup
        this.timer = setInterval(() => {
            console.log("Auto refresh products");
            this.fetchProducts();
        }, 5000);

        this.eventListener = () => console.log("Window resized");
        window.addEventListener('resize', this.eventListener);
    }

    componentWillUnmount() {
        console.log("ComponentWillUnmount: Dọn dẹp trước khi chết");
        
        // Cleanup: Tránh memory leaks
        clearInterval(this.timer); // ← Clear timer
        window.removeEventListener('resize', this.eventListener); // ← Remove listener
        
        // Cancel pending API calls nếu có
        this.cancelApiCall && this.cancelApiCall();
    }
}
```

#### **🎯 FUNCTION COMPONENT TƯƠNG ĐƯƠNG:**
```javascript
function ProductFeature() {
    useEffect(() => {
        // Setup (componentDidMount)
        const timer = setInterval(() => {
            console.log("Auto refresh products");
            fetchProducts();
        }, 5000);

        const eventListener = () => console.log("Window resized");
        window.addEventListener('resize', eventListener);

        // Cleanup (componentWillUnmount)
        return () => {
            console.log("Cleanup: Component sắp unmount");
            clearInterval(timer);
            window.removeEventListener('resize', eventListener);
        };
    }, []); // Empty dependency = mount/unmount only

    return <div>Product List</div>;
}
```

---

## 🧠 **CÁCH GHI NHỚ DỄ DÀNG**

### **🏠 ẨỤNG TỪ CUỘC SỐNG:**
1. **MOUNTING** = **Chuyển vào nhà mới**
   - Constructor: Chuẩn bị đồ đạc
   - Render: Vẽ blueprint nhà
   - ComponentDidMount: Dọn vào và setup

2. **UPDATING** = **Sửa chữa nhà**
   - Render: Vẽ lại blueprint
   - ComponentDidUpdate: Kiểm tra sau sửa chữa

3. **UNMOUNTING** = **Chuyển đi nơi khác**
   - ComponentWillUnmount: Dọn dẹp đồ đạc

### **🎯 PATTERN NHỚ:**
```
SINH → SỐNG → CHẾT
Mount → Update → Unmount
Setup → Change → Cleanup
```

---

## 📋 **CHEAT SHEET - QUY TẮC VÀNG**

### **✅ KHI NÀO DÙNG GÌ:**

| **Lifecycle (Class)**      | **Chức năng**                                       | **Function Component (Hooks)**              |
|:--------------------------:|:---------------------------------------------------:|:--------------------------------------------:|
| `constructor()`            | Khởi tạo state, bind phương thức                    | `useState()`                                 |
| `componentDidMount()`      | Gọi API, thao tác DOM, tạo timer                    | `useEffect(() => { ... }, [])`               |
| `componentDidUpdate()`     | Xử lý khi state/props thay đổi, side effects        | `useEffect(() => { ... }, [deps])`           |
| `componentWillUnmount()`   | Dọn dẹp, remove listener, clear timer               | `useEffect(() => { return () => cleanup }, [])` |


### **🚫 LỖI THƯỜNG GẶP:**

1. **Forgot cleanup** → Memory leaks
```javascript
// ❌ BAD
useEffect(() => {
    const timer = setInterval(fetchData, 1000);
    // Forgot cleanup → timer chạy mãi
}, []);

// ✅ GOOD
useEffect(() => {
    const timer = setInterval(fetchData, 1000);
    return () => clearInterval(timer); // ← Cleanup
}, []);
```

2. **Wrong dependencies** → Infinite loops
```javascript
// ❌ BAD
useEffect(() => {
    setData(processData());
}, [data]); // ← data thay đổi → effect chạy → setData → data thay đổi → loop!

// ✅ GOOD
useEffect(() => {
    setData(processData());
}, [originalData]); // ← Depend on source data
```

---

## 🎯 **PRACTICE TRONG PROJECT HIỆN TẠI**

### **PRODUCTFEATURE LIFECYCLE:**

```javascript
function ProductFeature() {
    // 🟢 MOUNTING LOGIC
    const [productsList, setProductsList] = useState(initProductList); // Constructor
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        console.log("ProductFeature mounted!"); // ComponentDidMount
        // Setup nếu cần
    }, []);

    // 🔄 UPDATING LOGIC
    useEffect(() => {
        console.log("Filter changed:", filterStatus); // ComponentDidUpdate
    }, [filterStatus]);

    useEffect(() => {
        console.log("Products changed:", productsList); // ComponentDidUpdate
    }, [productsList]);

    // 🔴 UNMOUNTING LOGIC
    useEffect(() => {
        return () => {
            console.log("ProductFeature unmounting!"); // ComponentWillUnmount
        };
    }, []);

    // RENDER LOGIC (tự động re-render khi state thay đổi)
    const renderProductList = productsList.filter(product =>
        filterStatus === 'all' || filterStatus === product.status
    );

    return (
        <div>
            {/* UI components */}
        </div>
    );
}
```

---

## 💡 **TÓM TẮT KEY POINTS**

1. **Lifecycle = Sinh → Sống → Chết**
2. **Function Components dùng useEffect thay lifecycle methods**
3. **Luôn cleanup để tránh memory leaks**
4. **Dependencies array quyết định khi nào effect chạy**
5. **Re-render xảy ra khi state/props thay đổi**

**🎉 Master lifecycle = Master React!**