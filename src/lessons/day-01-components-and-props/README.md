# 📚 Day 1: Components và Props

## 🎯 Mục tiêu bài học
- Tìm hiểu về React Components
- Học cách sử dụng Props
- Thực hành với PropTypes và defaultProps

## 📝 Nội dung đã học

### 1. React Component
- Tạo functional component `ColorBox`
- Component nhận props và render UI

### 2. Props (Properties)
- `color`: Màu nền của box (bắt buộc)
- `rounded`: Góc tròn hay góc vuông (tùy chọn)

### 3. PropTypes
```javascript
ColorBox.propTypes = {
  color: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
};
```

### 4. Default Props
```javascript
ColorBox.defaultProps = {
  rounded: true,
};
```

## 🎨 Demo
Component tạo ra các hộp màu với khả năng:
- Thay đổi màu sắc
- Tùy chọn góc tròn/vuông
- Hiệu ứng hover

## 📁 File cấu trúc
- `components/ColorBox.js` - Component chính
- `styles/ColorBox.css` - Styles cho component

## 🔗 Ví dụ sử dụng
```javascript
<ColorBox color="red" />                    // Góc tròn (mặc định)
<ColorBox color="green" rounded={false} />  // Góc vuông
<ColorBox color="blue" rounded={true} />    // Góc tròn
```