# 📚 TÀI LIỆU CÂU HỎI LOGIC - PRODUCT LIST EXERCISE

## 🎯 HƯỚNG DẪN SỬ DỤNG:
- Đọc câu hỏi và suy nghĩ trước khi xem đáp án
- Thực hành code để kiểm chứng lý thuyết
- Đáp án ngay bên dưới câu hỏi

---

## 📋 **CÂU HỎI LOGIC VÀ ĐÁP ÁN:**

### **🧠 NHÓM 1: COMPONENTS & PROPS**

**Q1:** Tại sao cần tách `ProductFeature` và `ProductList` thành 2 components riêng?

**A1:** **Separation of Concerns**
- `ProductFeature`: Quản lý logic, state, business rules
- `ProductList`: Chỉ hiển thị UI, nhận props
- Dễ maintain, test, reuse components

---

**Q2:** Props `productsList` và `onProductClick` có vai trò gì?

**A2:** **Data Flow Pattern**
- `productsList`: Data truyền từ parent xuống child (props down)
- `onProductClick`: Function callback để child báo cáo events lên parent (events up)

---

**Q3:** Tại sao phải truyền function từ Parent xuống Child?

**A3:** **Unidirectional Data Flow**
- Child không thể thay đổi trực tiếp parent state
- Cần function callback để communicate ngược lên
- Đảm bảo single source of truth

---

**Q4:** Destructuring `{ productsList, onProductClick }` khác gì với `props.productsList`?

**A4:** **Destructuring Benefits**
- `{ productsList, onProductClick }`: Destructure ngay trong parameter
- `props.productsList`: Phải access qua props object
- Destructuring ngắn gọn, rõ ràng hơn

---

### **🧠 NHÓM 2: STATE MANAGEMENT**

**Q5:** Tại sao dùng `useState` thay vì biến thường?

**A5:** **React State System**
- Biến thường: Không trigger re-render khi thay đổi
- `useState`: Thay đổi state → trigger re-render → UI update
- React tracking state changes

---

**Q6:** `setProductsList` làm gì khi được gọi?

**A6:** **State Setter Function**
- Báo cho React biết state đã thay đổi
- Schedule re-render cho component
- Update UI với data mới

---

**Q7:** Tại sao cần 2 state: `productsList` và `filterStatus`?

**A7:** **Multiple State Purpose**
- `productsList`: Quản lý data products (add, remove, update)
- `filterStatus`: Quản lý UI state (filter hiện tại)
- Tách biệt concerns, dễ manage

---

**Q8:** State thay đổi → Component re-render theo cơ chế nào?

**A8:** **React Reconciliation**
- State change → React đánh dấu component dirty
- Re-render component và children
- Compare virtual DOM → Update real DOM

---

### **🧠 NHÓM 3: SPREAD OPERATOR**

**Q9:** `[...productsList]` khác gì với `productsList`?

**A9:** **Reference vs Value Copy**
- `productsList`: Reference đến array gốc
- `[...productsList]`: Tạo array mới với cùng elements
- React cần reference mới để detect changes

---

**Q10:** `{ ...newProductsList[index] }` tại sao cần dấu `...`?

**A10:** **Object Immutability**
- Copy tất cả properties từ object cũ
- Sau đó override properties cần thay đổi
- Đảm bảo immutability pattern

---

**Q11:** Không dùng spread operator sẽ gây lỗi gì?

**A11:** **React Won't Re-render**
- Mutate trực tiếp → cùng reference → React không detect
- Không re-render → UI không update
- Data inconsistency

---

**Q12:** React detect thay đổi bằng cách nào?

**A12:** **Shallow Comparison**
- React dùng `Object.is()` so sánh references
- Reference khác → re-render
- Reference giống → skip render

---

### **🧠 NHÓM 4: ARRAY METHODS**

**Q13:** `.filter()` hoạt động như thế nào?

**A13:** **Filter Mechanism**
- Lặp qua từng element
- Gọi callback function với mỗi element
- Trả về array mới chỉ chứa elements return true

---

**Q14:** `.map()` và `.filter()` khác nhau ở điểm gì?

**A14:** **Transform vs Filter**
- `.map()`: Transform mỗi element → array cùng length
- `.filter()`: Lọc elements → array length có thể khác
- `.map()` để render, `.filter()` để lọc data

---

**Q15:** Tại sao `renderProductList` không dùng `useState`?

**A15:** **Computed Value**
- `renderProductList` là computed value từ state
- Không cần `useState` vì auto calculate mỗi render
- Derived state pattern

---

**Q16:** Conditional rendering `product.status === 'available'` logic ra sao?

**A16:** **Boolean Expression**
- `product.status === 'available'` → true/false
- React render element nếu true, skip nếu false
- Conditional rendering pattern

---

### **🧠 NHÓM 5: EVENT HANDLING**

**Q17:** `onClick={() => handleProductClick(product, index)}` tại sao cần arrow function?

**A17:** **Function Reference vs Call**
- `onClick={handleProductClick}`: Pass function reference
- `onClick={handleProductClick()}`: Call ngay lập tức
- Arrow function để pass parameters: `() => handleProductClick(params)`

---

**Q18:** `handleProductClick` nhận tham số `(product, index)` để làm gì?

**A18:** **Event Data**
- `product`: Object chứa toàn bộ product data
- `index`: Vị trí trong array để update đúng item
- Cần cả 2 để identify và update product

---

**Q19:** Event bubbling từ Child lên Parent hoạt động thế nào?

**A19:** **Event Delegation**
- Child component gọi parent function
- Parent function nhận data từ child
- Parent update state → trigger re-render

---

**Q20:** Tại sao không gọi trực tiếp `onProductClick(product, index)`?

**A20:** **Component Abstraction**
- Child component có thể validate data trước
- Có thể thêm logic xử lý riêng
- Tách biệt concerns giữa components

---

### **🧠 NHÓM 6: CONDITIONAL LOGIC**

**Q21:** Ternary operator `filterStatus === 'all' ? 'active' : ''` hoạt động ra sao?

**A21:** **Ternary Operator**
- `condition ? valueIfTrue : valueIfFalse`
- Nếu `filterStatus === 'all'` → return `'active'`
- Ngược lại → return `''` (empty string)

---

**Q22:** OR logic `||` trong filter function có ý nghĩa gì?

**A22:** **Short Circuit Evaluation**
- `a || b`: Nếu `a` true → return true (không check `b`)
- Nếu `a` false → check `b`
- Filter logic: Show all HOẶC show matching status

---

**Q23:** Template literal `className={`filter-btn ${active}`}` tại sao dùng backticks?

**A23:** **Template Literal**
- Backticks cho phép string interpolation
- `${variable}` inject giá trị vào string
- Dễ đọc hơn string concatenation

---

**Q24:** Toggle logic `status === 'available' ? 'out_of_stock' : 'available'` như thế nào?

**A24:** **State Toggle**
- Check current state
- Return opposite state
- Binary state switching pattern

---

### **🧠 NHÓM 7: CSS & STYLING**

**Q25:** CSS classes `available` và `out_of_stock` được áp dụng khi nào?

**A25:** **Dynamic CSS Classes**
- Classes được áp dụng dựa vào `product.status`
- `classNames()` conditionally add/remove classes
- UI reflects data state

---

**Q26:** `classNames()` function có lợi ích gì so với string concatenation?

**A26:** **Dynamic Class Management**
- `classNames()`: Handle complex conditional classes
- String concat: Dễ lỗi với spaces, undefined values
- Better readability và maintainability

---

**Q27:** SCSS import `'./ProductListStyle.scss'` hoạt động thế nào?

**A27:** **CSS Module System**
- Webpack/bundler process SCSS → CSS
- CSS được inject vào page khi component mount
- Scoped styling

---

**Q28:** Responsive design breakpoint `@media (max-width: 768px)` ảnh hưởng gì?

**A28:** **Mobile Responsive**
- Screen width < 768px → apply mobile styles
- Layout changes: flex-direction, sizing
- Touch-friendly UI adjustments

---

### **🧠 NHÓM 8: PERFORMANCE & BEST PRACTICES**

**Q29:** Re-render xảy ra khi nào và ảnh hưởng performance ra sao?

**A29:** **Re-render Triggers**
- State change → re-render component và children
- Props change → re-render
- Ảnh hưởng: DOM updates, function re-creation

---

**Q30:** Tại sao dùng `key={product.id}` trong `.map()`?

**A30:** **React Reconciliation**
- `key` giúp React identify từng element
- Optimize re-render khi array thay đổi
- Tránh re-create elements không cần thiết

---

**Q31:** Constants `ProductList_Status` có lợi ích gì?

**A31:** **Constants Benefits**
- Avoid magic strings
- Centralized values
- TypeScript friendly
- Refactoring easier

---

**Q32:** Code structure hiện tại có điểm nào cần optimize?

**A32:** **Optimization Opportunities**
- `useCallback` cho event handlers
- `useMemo` cho computed values
- Split components nhỏ hơn
- Lazy loading cho large lists

---

## 🎯 **TÓM TẮT KEY CONCEPTS:**

### **📌 CORE REACT PATTERNS:**
1. **Unidirectional Data Flow**: Props down, events up
2. **Immutability**: Spread operator cho state updates
3. **Conditional Rendering**: Ternary, logical operators
4. **Event Handling**: Callbacks và event delegation

### **📌 JAVASCRIPT FUNDAMENTALS:**
1. **Array Methods**: map, filter, spread
2. **ES6 Features**: Destructuring, template literals
3. **Function Concepts**: Parameters, callbacks
4. **Boolean Logic**: Ternary, OR operations

### **📌 BEST PRACTICES:**
1. **Component Separation**: Logic vs Presentation
2. **State Management**: Multiple states for different concerns
3. **Performance**: Keys, computed values
4. **Code Quality**: Constants, meaningful names

---

## 💡 **GỢI Ý THỰC HÀNH:**
1. Thử code để kiểm chứng câu trả lời
2. Debug với console.log để hiểu data flow
3. Thay đổi code để xem tác động
4. So sánh với TodoList để tìm pattern

**🎉 Hoàn thành! Những concepts này là nền tảng để master React development!**

