// 🎯 BÀI TẬP: Xác định từng thành phần

// Câu 1: Đây là gì?
class Car {                    // ← Điền: ________
    constructor(brand) {
        this.brand = brand;    // ← Điền: ________ 
        this.speed = 0;        // ← Điền: ________
    }

    accelerate() {             // ← Điền: ________
        this.speed += 10;
    }
}

// Câu 2: Đây là gì?
const myCar = new Car("Toyota");  // ← Điền: ________

// Câu 3: Đây là gì?
myCar.brand                    // ← Điền: ________
myCar.accelerate()             // ← Điền: ________

/* 
ĐÁP ÁN:
1. class Car → CLASS  
2. this.brand → PROPERTY
3. this.speed → PROPERTY  
4. accelerate() → METHOD
5. const myCar → INSTANCE (OBJECT)
6. myCar.brand → PROPERTY access
7. myCar.accelerate() → METHOD call
*/