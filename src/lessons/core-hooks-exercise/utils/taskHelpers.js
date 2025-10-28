/* 
🔧 MODULE TIỆN ÍCH TASK HELPERS - Các Hàm Pure Cho Quản Lý Task

📖 MỤC ĐÍCH:
- Tách biệt logic nghiệp vụ khỏi UI components (Tách rời mối quan tâm)
- Tạo các hàm pure: Có thể dự đoán, kiểm thử, tái sử dụng
- Xử lý task tập trung: Logic nhất quán trên các component
- Hiệu suất: Các phép tính có thể dễ dàng cache/memoized

🏗️ MẪU KIẾN TRÚC: Module Tiện Ích
- Không phụ thuộc React: Các hàm JavaScript thuần túy
- Lập trình hàm: Không có tác dụng phụ, các thao tác bất biến
- Thân thiện với composition: Các hàm có thể dễ dàng kết hợp
- Độc lập framework: Logic có thể tái sử dụng ngoài React

📦 CÁC HÀM ĐƯỢC EXPORT:
- filterTasks(): Lọc tasks theo trạng thái (all/active/completed) và từ khóa tìm kiếm
- sortTasks(): Sắp xếp tasks theo tiêu chí (date/name/priority)
- getTaskStats(): Tính toán thống kê (tổng số, đang thực hiện, hoàn thành)
- validateTask(): Logic xác thực task (có thể tách từ components)
- generateTaskId(): Tạo ID duy nhất cho tasks mới
*/

// 🔍 HÀM LỌC TASK - Lọc Task Theo Nhiều Tiêu Chí
export const filterTasks = (tasks, filter, searchTerm) => {
    // 📊 XÁC THỰC THAM SỐ:
    // tasks: Mảng các đối tượng task - dữ liệu nguồn để lọc
    // filter: String - bộ lọc trạng thái hoàn thành ('all', 'active', 'completed')
    // searchTerm: String - truy vấn tìm kiếm văn bản (tùy chọn, có thể để trống)
    // Trả về: Mảng các đối tượng task đã được lọc

    // 🛡️ XÁC THỰC ĐẦU VÀO - Lập Trình Phòng Thủ
    if (!Array.isArray(tasks)) {
        // Điều kiện bảo vệ: Đảm bảo tasks là mảng hợp lệ
        console.warn('filterTasks: tham số tasks phải là một mảng');
        return []; // Trả về mảng rỗng thay vì crash ứng dụng
    }

    // 📋 BẮT ĐẦU VỚI TOÀN BỘ DỮ LIỆU
    let filteredTasks = tasks;
    // Sao chép tham chiếu: Bắt đầu với tất cả tasks, áp dụng bộ lọc từng bước
    // Phương pháp bất biến: Không thay đổi mảng tasks gốc

    // 🎯 BỘ LỌC 1: LỌC THEO TRẠNG THÁI HOÀN THÀNH
    if (filter === 'active') {
        // BỘ LỌC ĐANG THỰC HIỆN: Chỉ hiện tasks chưa hoàn thành
        filteredTasks = filteredTasks.filter(task => !task.completed);
        // filter(): Phương thức mảng - tạo mảng mới với các item thỏa mãn điều kiện
        // task => !task.completed: Hàm callback - giữ lại tasks có completed là false
        // !task.completed: Phép toán NOT - true nghĩa là task CHƯA hoàn thành (đang thực hiện)
    } else if (filter === 'completed') {
        // BỘ LỌC ĐÃ HOÀN THÀNH: Chỉ hiện tasks đã xong  
        filteredTasks = filteredTasks.filter(task => task.completed);
        // task.completed: Giữ lại tasks có completed là true
        // Đã sửa lỗi: Code gốc có !task.completed (logic sai)
    }
    // Bộ lọc 'all': Không cần lọc, giữ nguyên tất cả tasks
    // Hành vi mặc định: Nếu filter không phải 'active' hoặc 'completed', hiển thị tất cả

    // 🔍 BỘ LỌC 2: LỌC THEO TÌM KIẾM VĂN BẢN
    if (searchTerm && searchTerm.trim()) {
        // Điều kiện bảo vệ: Chỉ áp dụng tìm kiếm nếu searchTerm tồn tại và không rỗng
        // searchTerm.trim(): Xử lý trường hợp tìm kiếm chỉ có khoảng trắng

        filteredTasks = filteredTasks.filter(task =>
            // Tìm kiếm văn bản không phân biệt hoa thường trong nội dung task
            task.text.toLowerCase().includes(searchTerm.toLowerCase())
            // task.text.toLowerCase(): Chuyển text của task thành chữ thường
            // searchTerm.toLowerCase(): Chuyển từ khóa tìm kiếm thành chữ thường  
            // .includes(): Phương thức string - kiểm tra xem từ khóa có tồn tại trong text task
            // Không phân biệt hoa thường: "Buy" khớp với "buy", "BUY", "Buy Milk"
        );
    }

    // ✅ TRẢ VỀ KẾT QUẢ ĐÃ LỌC
    return filteredTasks;
    // Trả về: Mảng mới với các tasks thỏa mãn cả tiêu chí trạng thái và tìm kiếm
    // Mảng tasks gốc không thay đổi (thao tác bất biến)
    // Có thể là mảng rỗng nếu không có tasks nào khớp tiêu chí
};

// 📊 HÀM SẮP XẾP TASK - Sắp Xếp Theo Nhiều Tiêu Chí
export const sortTasks = (tasks, sortBy) => {
    // 📊 THAM SỐ:
    // tasks: Mảng các đối tượng task cần sắp xếp
    // sortBy: String - tiêu chí sắp xếp ('date', 'name', 'completed', 'priority')
    // Trả về: Mảng mới đã được sắp xếp (mảng gốc không thay đổi)

    // 🛡️ XÁC THỰC ĐẦU VÀO
    if (!Array.isArray(tasks)) {
        console.warn('sortTasks: tham số tasks phải là một mảng');
        return [];
    }

    // 📋 TẠO BẢN SAO ĐÃ SẮP XẾP - Thao Tác Bất Biến
    const sortedTasks = [...tasks];
    // Toán tử spread: Tạo bản sao nông của mảng tasks
    // Bất biến: Không thay đổi mảng gốc, sắp xếp bản sao
    // .sort() thay đổi mảng tại chỗ, nên cần sao chép trước

    // 🔄 ÁP DỤNG THUẬT TOÁN SẮP XẾP dựa trên tiêu chí
    switch (sortBy) {
        case 'date':
            // SẮP XẾP THEO NGÀY TẠO - Mới nhất trước
            return sortedTasks.sort((a, b) => {
                // Array.sort() với hàm so sánh
                // (a, b) => number: Hàm so sánh quyết định thứ tự sắp xếp
                // Trả về âm: a đứng trước b
                // Trả về dương: b đứng trước a  
                // Trả về zero: a và b bằng nhau

                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                // Chuyển chuỗi ngày thành đối tượng Date để so sánh đúng
                // createdAt: Chuỗi ngày ISO hoặc đối tượng Date

                return dateB.getTime() - dateA.getTime();
                // getTime(): Chuyển Date thành milliseconds (số)
                // dateB - dateA: Sắp xếp giảm dần (mới nhất trước)
                // dateA - dateB: Sẽ sắp xếp tăng dần (cũ nhất trước)
            });

        case 'name':
            // SẮP XẾP THEO VĂN BẢN TASK - Thứ tự bảng chữ cái
            return sortedTasks.sort((a, b) => {
                // So sánh chuỗi cho sắp xếp theo bảng chữ cái
                return a.text.toLowerCase().localeCompare(b.text.toLowerCase());
                // toLowerCase(): Sắp xếp không phân biệt hoa thường
                // localeCompare(): So sánh chuỗi Unicode đúng cách
                // Xử lý ký tự có dấu, văn bản quốc tế một cách chính xác
                // Trả về: -1, 0, hoặc 1 (giá trị trả về đúng của hàm so sánh)
            });

        case 'completed':
            // SẮP XẾP THEO TRẠNG THÁI HOÀN THÀNH - Tasks đang thực hiện trước, sau đó là đã hoàn thành
            return sortedTasks.sort((a, b) => {
                // So sánh Boolean: false (0) đứng trước true (1)
                return a.completed - b.completed;
                // a.completed - b.completed: 
                // false - false = 0 (bằng nhau)
                // false - true = -1 (a đứng trước)  
                // true - false = 1 (b đứng trước)
                // true - true = 0 (bằng nhau)
                // Kết quả: Tasks đang thực hiện (false) trước tasks đã hoàn thành (true)
            });

        case 'priority':
            // SẮP XẾP THEO ĐỘ ƯU TIÊN - Độ ưu tiên cao trước (nếu trường priority tồn tại)
            return sortedTasks.sort((a, b) => {
                // Giả định độ ưu tiên: 'high' = 3, 'medium' = 2, 'low' = 1
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                const priorityA = priorityOrder[a.priority] || 1; // Mặc định là thấp
                const priorityB = priorityOrder[b.priority] || 1;

                return priorityB - priorityA; // Độ ưu tiên cao trước (giảm dần)
            });

        default:
            // MẶC ĐỊNH: Trả về thứ tự gốc (không sắp xếp)
            console.warn(`sortTasks: Tiêu chí sắp xếp không xác định '${sortBy}', trả về thứ tự gốc`);
            return sortedTasks;
        // Xử lý lỗi nhẹ nhàng: Không crash, chỉ trả về dữ liệu chưa sắp xếp
    }
};

// 📈 HÀM THỐNG KÊ TASK - Tính Toán Các Chỉ Số Task
export const getTaskStats = (tasks) => {
    // 📊 THAM SỐ:
    // tasks: Mảng các đối tượng task cần phân tích
    // Trả về: Đối tượng chứa dữ liệu thống kê

    // 🛡️ XÁC THỰC ĐẦU VÀO
    if (!Array.isArray(tasks)) {
        console.warn('getTaskStats: tham số tasks phải là một mảng');
        return { total: 0, active: 0, completed: 0, completionRate: 0 };
    }

    // 📊 TÍNH TOÁN CÁC SỐ LIỆU CƠ BẢN
    const total = tasks.length;
    // Tổng số task: Độ dài mảng đơn giản

    const completed = tasks.filter(task => task.completed).length;
    // Số task đã hoàn thành: Lọc tasks đã hoàn thành và lấy độ dài
    // filter(): Tạo mảng mới chỉ với tasks đã hoàn thành
    // .length: Đếm số items trong mảng đã lọc

    const active = total - completed;
    // Số task đang thực hiện: Tính toán toán học thay vì lọc khác
    // Hiệu quả hơn: Một phép trừ so với một lần lặp mảng khác

    // 📊 TÍNH TOÁN CÁC CHỈ SỐ DẪN XUẤT
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    // Tỷ lệ hoàn thành: (đã hoàn thành / tổng số) * 100
    // Math.round(): Làm tròn đến số nguyên gần nhất (85.7% → 86%)
    // Điều kiện bảo vệ: Tránh chia cho zero khi không có tasks

    // 📅 TÍNH TOÁN CÁC CHỈ SỐ THEO THỜI GIAN (Tùy chọn)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bắt đầu ngày hôm nay

    const createdToday = tasks.filter(task => {
        const taskDate = new Date(task.createdAt);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
    }).length;

    // ✅ TRẢ VỀ THỐNG KÊ TOÀN DIỆN
    return {
        total,              // Tổng số tasks
        active,             // Số tasks chưa hoàn thành  
        completed,          // Số tasks đã hoàn thành
        completionRate,     // Tỷ lệ hoàn thành (0-100)
        createdToday,       // Tasks được tạo hôm nay

        // 📊 CÁC CHỈ SỐ BỔ SUNG (có thể mở rộng)
        hasActiveTasks: active > 0,           // Helper Boolean
        hasCompletedTasks: completed > 0,     // Helper Boolean
        isEmpty: total === 0,                 // Helper Boolean
        isAllCompleted: total > 0 && active === 0  // Helper Boolean
    };
};

// 🆔 TẠO ID DUY NHẤT - Tạo Định Danh Duy Nhất Cho Task
export const generateTaskId = () => {
    // 🎯 MỤC ĐÍCH: Tạo ID duy nhất cho các tasks mới
    // Thay thế cho Date.now(): Chống xung đột tốt hơn

    // PHƯƠNG PHÁP 1: Chuỗi giống UUID (phiên bản đơn giản)
    return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    // 'task_': Tiền tố để debug dễ hơn
    // Date.now(): Thành phần timestamp (duy nhất mỗi millisecond)
    // Math.random().toString(36): Chuỗi ngẫu nhiên chữ và số
    // .substr(2, 9): Bỏ tiền tố '0.', lấy 9 ký tự
    // Kết quả: 'task_1698165234567_abc123def'
};

// ✅ TIỆN ÍCH XÁC THỰC TASK - Logic Xác Thực Được Tách Ra
export const validateTask = (taskText) => {
    // 📊 THAM SỐ: taskText - chuỗi cần xác thực
    // Trả về: { isValid: boolean, error: string | null }

    // 🔍 QUY TẮC XÁC THỰC (giống như component TaskInput)
    if (!taskText || !taskText.trim()) {
        return { isValid: false, error: 'Task không được để trống' };
    }

    if (taskText.trim().length < 3) {
        return { isValid: false, error: 'Task phải có ít nhất 3 ký tự' };
    }

    if (taskText.trim().length > 100) {
        return { isValid: false, error: 'Task không được vượt quá 100 ký tự' };
    }

    const invalidChars = /[<>{}[\]\\]/g;
    if (invalidChars.test(taskText)) {
        return { isValid: false, error: 'Task không được chứa ký tự đặc biệt: < > { } [ ] \\' };
    }

    return { isValid: true, error: null };
};

// 🔄 TIỆN ÍCH BIẾN ĐỔI TASK - Helpers Xử Lý Dữ Liệu

// TẠO ĐỐI TƯỢNG TASK - Tạo Task Chuẩn Hóa
export const createTask = (text, options = {}) => {
    // 📊 THAM SỐ:
    // text: Chuỗi nội dung task
    // options: Các thuộc tính tùy chọn { priority, dueDate, tags, etc. }

    return {
        id: generateTaskId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...options  // Spread các tùy chọn bổ sung
    };
};

// CHUYỂN ĐỔI TRẠNG THÁI HOÀN THÀNH TASK - Cập Nhật Task Bất Biến
export const toggleTaskCompletion = (task) => {
    // 📊 THAM SỐ: task - đối tượng task cần chuyển đổi
    // Trả về: Đối tượng task mới với trạng thái hoàn thành đã chuyển đổi

    return {
        ...task,                    // Sao chép tất cả thuộc tính hiện có
        completed: !task.completed, // Chuyển đổi trạng thái hoàn thành
        updatedAt: new Date().toISOString() // Cập nhật timestamp
    };
};

// CẬP NHẬT VĂN BẢN TASK - Cập Nhật Văn Bản Bất Biến
export const updateTaskText = (task, newText) => {
    // 📊 THAM SỐ: đối tượng task, chuỗi newText
    // Trả về: Đối tượng task mới với văn bản đã cập nhật

    return {
        ...task,                    // Sao chép tất cả thuộc tính hiện có
        text: newText.trim(),       // Cập nhật văn bản (đã trim)
        updatedAt: new Date().toISOString() // Cập nhật timestamp
    };
};

/* 
🎯 VÍ DỤ SỬ DỤNG - Cách Sử Dụng Task Helpers trong Components:

// 📖 VÍ DỤ 1: LỌC TASKS trong TaskList Component
// const TaskList = () => {
//     const [tasks, setTasks] = useState([
//         { id: 1, text: 'Mua đồ tạp hóa', completed: false, createdAt: '2025-10-25T10:00:00Z' },
//         { id: 2, text: 'Học React', completed: true, createdAt: '2025-10-24T15:30:00Z' },
//         { id: 3, text: 'Viết tài liệu', completed: false, createdAt: '2025-10-25T09:15:00Z' }
//     ]);
//     const [filter, setFilter] = useState('all');
//     const [searchTerm, setSearchTerm] = useState('');
//     
//     // Áp dụng lọc với hàm helper
//     const displayedTasks = filterTasks(tasks, filter, searchTerm);
//     
//     return (
//         <div>
//             {displayedTasks.map(task => (
//                 <TaskItem key={task.id} task={task} />
//             ))}
//         </div>
//     );
// };

🏗️ LỢI ÍCH KIẾN TRÚC:

✅ TÁCH RỜI MỐI QUAN TÂM:
- Logic UI: Components xử lý rendering, events, quản lý state
- Logic Nghiệp vụ: Helpers xử lý xử lý dữ liệu, xác thực, tính toán
- Ranh giới rõ ràng: Dễ hiểu, chỉnh sửa và kiểm thử riêng biệt

✅ KHẢ NĂNG TÁI SỬ DỤNG:
- Hàm pure: Có thể sử dụng trên nhiều components
- Độc lập framework: Logic không gắn liền với React cụ thể
- Có thể kết hợp: Các hàm có thể dễ dàng kết hợp với nhau

✅ KHẢ NĂNG KIỂM THỬ:
- Hàm pure: Input/output có thể dự đoán, dễ unit test
- Không có tác dụng phụ: Tests không cần mock React components
- Kiểm thử tách biệt: Kiểm thử logic nghiệp vụ riêng biệt với UI

✅ HIỆU SUẤT:
- Thân thiện với memoization: Hàm pure hoạt động tốt với useMemo/useCallback
- Thuật toán hiệu quả: Triển khai sắp xếp/lọc được tối ưu hóa
- Phụ thuộc tối thiểu: Nhẹ, thực thi nhanh

✅ KHẢ NĂNG BẢO TRÌ:
- Logic tập trung: Một nơi để cập nhật quy tắc nghiệp vụ
- An toàn kiểu: Chữ ký hàm rõ ràng, hành vi có thể dự đoán
- Tài liệu: Code tự ghi chép với các ghi chú toàn diện

🚀 VÍ DỤ KIỂM THỬ:

// Unit tests cho task helpers
import { filterTasks, sortTasks, getTaskStats, validateTask } from './taskHelpers';

describe('filterTasks', () => {
    const mockTasks = [
        { id: 1, text: 'Mua sữa', completed: false },
        { id: 2, text: 'Học React', completed: true },
        { id: 3, text: 'Mua đồ tạp hóa', completed: false }
    ];

    test('lọc tasks đang thực hiện chính xác', () => {
        const result = filterTasks(mockTasks, 'active', '');
        expect(result).toHaveLength(2);
        expect(result.every(task => !task.completed)).toBe(true);
    });

    test('lọc tasks đã hoàn thành chính xác', () => {
        const result = filterTasks(mockTasks, 'completed', '');
        expect(result).toHaveLength(1);
        expect(result[0].completed).toBe(true);
    });

    test('lọc theo từ khóa tìm kiếm không phân biệt hoa thường', () => {
        const result = filterTasks(mockTasks, 'all', 'mua');
        expect(result).toHaveLength(2);
        expect(result.every(task => task.text.toLowerCase().includes('mua'))).toBe(true);
    });
});

describe('getTaskStats', () => {
    test('tính toán thống kê chính xác', () => {
        const tasks = [
            { completed: false },
            { completed: true },
            { completed: false }
        ];
        
        const stats = getTaskStats(tasks);
        expect(stats.total).toBe(3);
        expect(stats.active).toBe(2);
        expect(stats.completed).toBe(1);
        expect(stats.completionRate).toBe(33); // Math.round(1/3 * 100)
    });
});
*/