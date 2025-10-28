// 📋 CHEAT SHEET - Cách nhận biết nhanh trong code

/* 
🏗️ CLASS - Luôn có từ khóa "class"
*/
class Counter extends PureComponent { }  // ← CLASS

/* 
🎯 INSTANCE = CÁI GÌ ĐƯỢC TẠO RA TỪ CLASS
*/

// Ví dụ 1: Class và Instance giống như khuôn bánh và chiếc bánh
class BanhMi {
    constructor(nhan) {
        this.nhan = nhan;  // this = chiếc bánh mì cụ thể đang làm
    }
}

const banhMiThit = new BanhMi("thịt");     // Instance 1: bánh mì thịt
const banhMiCha = new BanhMi("chả");       // Instance 2: bánh mì chả  
const banhMiTrung = new BanhMi("trứng");   // Instance 3: bánh mì trứng

// Mỗi Instance là 1 chiếc bánh mì riêng biệt!
console.log(banhMiThit.nhan);   // "thịt"
console.log(banhMiCha.nhan);    // "chả"

// Trong React:
// Ví dụ về constructor trong một class React component:
class ExampleComponent extends React.Component {
    constructor(props) {
        super(props);
        // this = 1 Counter component cụ thể đang được tạo
        this.state = { count: 0 };
    }
}

/* 
📦 OBJECT - Có dấu {} hoặc được tạo bằng "new"  
*/
const user = { name: "John" };           // ← OBJECT literal
const counter = new Counter();           // ← OBJECT từ class

/* 
🏷️ PROPERTY - Truy cập bằng dấu chấm (.)
*/
this.state        // ← PROPERTY của instance
this.props        // ← PROPERTY của instance  
user.name         // ← PROPERTY của object

/* 
⚡ METHOD - Có dấu ngoặc () và thân hàm
*/
render() { return <div></div>; }         // ← METHOD
this.setState({ count: 1 });             // ← Gọi METHOD