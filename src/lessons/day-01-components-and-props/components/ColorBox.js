import PropTypes from 'prop-types';
import '../styles/ColorBox.css';

// Component ColorBox - Bài học ngày 1: Components và Props
function ColorBox(props) {
    const { color, rounded = true } = props; // Destructuring với default value

    // Debug: In ra giá trị rounded để kiểm tra
    console.log(`ColorBox ${color}: rounded =`, rounded);

    return (
        <div
            className="color-box"
            style={{
                backgroundColor: color,
                borderRadius: rounded ? '10px' : '0px' // Nếu rounded=true thì góc tròn, false thì góc vuông
            }}
        ></div>
    );
}

// Định nghĩa PropTypes - kiểm tra kiểu dữ liệu của props được truyền vào component
ColorBox.propTypes = {
    color: PropTypes.string.isRequired, // Prop 'color' phải là string và bắt buộc phải có (isRequired)
    rounded: PropTypes.bool,            // Prop 'rounded' phải là boolean và không bắt buộc
};

// Đã sử dụng default parameter trong destructuring thay cho defaultProps

export default ColorBox;