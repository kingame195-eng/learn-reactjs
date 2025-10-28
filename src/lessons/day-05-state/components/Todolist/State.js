// 📦 Import PureComponent từ React library
import { PureComponent } from "react";

// 🧩 Tạo class Counter kế thừa từ PureComponent
class Counter extends PureComponent {

    // 🏗️ Constructor: Hàm khởi tạo chạy đầu tiên khi component được tạo
    constructor(props) {
        super(props);  // 🔴 BREAKPOINT 1: Click vào số dòng bên trái để đặt breakpoint

        // 🔍 Debug: Xem props đang là gì
        const receivedProps = props;  // 🔴 BREAKPOINT 2: Hover để xem giá trị props

        // 🏠 Khởi tạo state - dữ liệu nội bộ của component
        // 💡 VÍ DỤ CÁC KHÁI NIỆM TRONG COMPONENT NÀY:
        // - Component: Counter (khối code tái sử dụng)
        // - Instance: this (đối tượng Counter được tạo)
        // - Object: this (thực thể có thuộc tính và methods)
        // - Property: this.state, this.props (thuộc tính)
        // - Method: render(), setState() (phương thức)
        this.state = {
            count: 0  // 🔴 BREAKPOINT 3: Xem state được khởi tạo
        };
    }

    // 🎨 Render: Hàm vẽ giao diện, React gọi mỗi khi component cần hiển thị
    render() {
        const currentState = this.state;  // 🔴 BREAKPOINT 4: Xem state hiện tại

        return (
            <div>
                {/* 📊 Hiển thị giá trị count hiện tại từ state */}
                <h2>Count: {this.state.count}</h2>

                {/* 🎯 Button với onClick event */}
                <button
                    onClick={() => {
                        const oldState = this.state;  // � BREAKPOINT 5: State trước khi thay đổi

                        // 💡 TÊN THAM SỐ TÙY Ý - Tất cả đều giống nhau:
                        this.setState(prevState => {
                            // prevState: React truyền state hiện tại vào đây
                            const newCount = prevState.count + 1;  // 🔴 BREAKPOINT 6: Giá trị mới
                            return { count: newCount };
                        });

                        // 🎨 CÁC CÁCH VIẾT TƯƠNG ĐƯƠNG:
                        // this.setState(oldState => ({ count: oldState.count + 1 }));
                        // this.setState(currentState => ({ count: currentState.count + 1 }));  
                        // this.setState(s => ({ count: s.count + 1 }));
                        // this.setState(state => ({ count: state.count + 1 }));
                    }}
                >
                    Increase
                </button>
            </div>
        );
    }
}

export default Counter;