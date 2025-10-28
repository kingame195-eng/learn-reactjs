// Day 2: Render Elements
function RenderElement() {
    const name = 'Khanh Hoang';
    const age = 25;
    const isMale = true;
    const colorList = ['red', 'green', 'blue'];

    return (
        <div>
            <h3>🧩 Component UI</h3>
            <p>Tôi là {name}, {age} tuổi</p>
            {isMale ? <p>Male</p> : <p>Female</p>}
            {isMale && <p>Tôi là nam</p>}
            {!isMale && <p>Tôi là nữ</p>}
            <ul>
                {colorList.map(color => (
                    <li key={color} style={{ color: color }}>{color}</li>
                ))}
            </ul>
        </div>
    );
}

// Thêm object để access data từ bên ngoài
RenderElement.info = {
    name: 'Khanh Hoang',
    age: 25
};

export default RenderElement;