# 🎯 BÀI TẬP THỰC HÀNH: PRODUCT LIST

## 📋 MÔ TẢ BÀI TẬP:
Tạo một ứng dụng quản lý danh sách sản phẩm tương tự như TodoList, nhưng thay vì toggle status thì toggle giữa "available" và "out_of_stock".

## 🎪 YÊU CẦU CHỨC NĂNG:
1. Hiển thị danh sách 4 sản phẩm ban đầu
2. Click vào sản phẩm để thay đổi trạng thái available ↔ out_of_stock
3. Sản phẩm "out_of_stock" hiển thị màu đỏ và có dòng gạch ngang
4. Sản phẩm "available" hiển thị màu xanh bình thường

## 📊 DỮ LIỆU BAN ĐẦU:
```javascript
const initProductList = [
    {
        id: 1,
        name: 'iPhone 15',
        price: 999,
        status: 'available'
    },
    {
        id: 2,
        name: 'MacBook Pro',
        price: 2499,
        status: 'out_of_stock'
    },
    {
        id: 3,
        name: 'AirPods',
        price: 249,
        status: 'available'
    },
    {
        id: 4,
        name: 'Apple Watch',
        price: 399,
        status: 'available'
    }
];
```

## 🏗️ CẤU TRÚC FILE CẦN TẠO:
```
exercise/
├── index.js           # Parent component (ProductFeature)
├── components/
│   ├── ProductList.js # Child component  
│   └── styles.scss    # CSS styling
└── README.md          # File này
```

## 🎨 CSS REQUIREMENTS:
- `.product-item`: padding, border, cursor pointer
- `.product-item.out_of_stock`: màu đỏ, text-decoration: line-through
- `.product-item.available`: màu xanh
- Hover effect cho các items

## 📝 HƯỚNG DẪN LÀM BÀI:
1. **Bước 1**: Tạo file `index.js` với ProductFeature component
2. **Bước 2**: Tạo state management cho product list  
3. **Bước 3**: Tạo handleProductClick function
4. **Bước 4**: Tạo file `components/ProductList.js`
5. **Bước 5**: Tạo file `components/styles.scss`
6. **Bước 6**: Test functionality

## ✅ TIÊU CHÍ HOÀN THÀNH:
- [ ] Component structure đúng (Parent/Child)
- [ ] State management hoạt động
- [ ] Click để toggle status
- [ ] Styling đúng yêu cầu
- [ ] PropTypes validation
- [ ] Code có comment rõ ràng
- [ ] Không có console errors

## 🎯 BỔ SUNG (OPTIONAL):
- Hiển thị price format: $999.00
- Đếm số sản phẩm available vs out_of_stock
- Add animation khi thay đổi status

## 💡 GỢI Ý:
- Copy structure từ TodoList và modify
- Thay đổi tên variables cho phù hợp
- Focus vào logic trước, styling sau
- Test từng bước một

**Chúc bạn làm bài thành công! 🚀**