// 👤 USERPROFILE COMPONENT - Component hiển thị thông tin và thống kê user
import React from 'react';
import { useUser } from '../contexts/UserContext';

/**
 * 🎯 USERPROFILE COMPONENT - BẢNG ĐIỀU KHIỂN NGƯỜI DÙNG VÀ HUB CÀI ĐẶT
 * 
 * 📋 CHỨC NĂNG CHÍNH:
 * 1. 👤 DANH TÍNH NGƯỜI DÙNG: Hiển thị avatar, tên, lời chào theo thời gian
 * 2. 📊 CHỈ SỐ NĂNG SUẤT: Thống kê tasks đã tạo/hoàn thành/tỷ lệ hoàn thành
 * 3. ⚙️ CÀI ĐẶT NHANH: Bật/tắt nhanh cho preferences (thông báo, dark mode, tự động lưu)
 * 4. 🏆 THÀNH TÍCH: Hệ thống game hóa với huy hiệu và điều kiện mở khóa
 * 5. 🎨 GIAO DIỆN ĐỘNG: Lựa chọn avatar, lời chào theo thời gian, trạng thái thành tích
 * 
 * 🏗️ KIẾN TRÚC COMPONENT:
 * - Loại: Smart Component (có logic kinh doanh và tính toán)
 * - Quản lý trạng thái: Context Consumer (useUser hook)
 * - Luồng dữ liệu: Cập nhật thời gian thực từ UserContext
 * - Trách nhiệm: Giao diện người dùng và quản lý cài đặt
 * - Mẫu thiết kế: Container component với nhiều UI sections
 * 
 * 📦 CÁC PHỤ THUỘC:
 * - useUser: Custom hook từ UserContext để truy cập dữ liệu user
 * - React: Thư viện cốt lõi cho chức năng component
 * - Hàm trợ giúp: getGreeting(), getAchievements() để tính toán nội dung động
 */

const UserProfile = () => {
    // 🔗 TÍCH HỢP CONTEXT - Truy cập dữ liệu user từ UserContext
    const { username, preferences, updatePreferences } = useUser();
    /* 
    🎯 PHÂN TÍCH TIÊU THỤ CONTEXT:
    - useUser(): Custom hook destructure dữ liệu user context
    - username: String - tên user hiện tại (có thể null/undefined)
    - preferences: Object - cài đặt user và lưu trữ dữ liệu
    - updatePreferences: Function - callback để cập nhật preferences user
    
    📡 LUỒNG DỮ LIỆU:
    - UserContext cung cấp data → useUser hook → component nhận
    - Cập nhật thời gian thực: khi context thay đổi → component tự động re-render
    - Hai chiều: component có thể cập nhật preferences thông qua updatePreferences
    */

    // 🐛 LOG GỠ LỖI: Theo dõi việc render component và trạng thái user
    console.log('🔄 RENDER - UserProfile:', {
        username: username,                    // Tên user hiện tại
        hasPreferences: !!preferences,         // Kiểm tra boolean preferences tồn tại
        preferencesKeys: Object.keys(preferences || {}), // Các key preference có sẵn
        timestamp: new Date().toLocaleTimeString()
    });
    /*
    📊 PHÂN TÍCH GỠ LỖI:
    - console.log(): Gỡ lỗi development (nên xóa trong production)
    - Theo dõi tần suất render để xác định vấn đề hiệu suất
    - Giám sát thay đổi trạng thái dữ liệu user
    - Object.keys() để xem các preferences có sẵn
    */

    // 📊 TÍNH TOÁN CHỈ SỐ NĂNG SUẤT NGƯỜI DÙNG
    const totalTasksCreated = preferences.tasksCreated || 0;
    /* 
    📈 TÍNH TOÁN TASKS ĐÃ TẠO:
    - preferences.tasksCreated: Giá trị từ user context (có thể undefined)
    - || 0: Toán tử fallback - nếu undefined/null thì dùng 0
    - Mặc định an toàn để tránh tính toán NaN
    - Dữ liệu bền vững: giá trị sẽ được lưu trong context
    */

    const totalTasksCompleted = preferences.tasksCompleted || 0;
    /* 
    ✅ TÍNH TOÁN TASKS ĐÃ HOÀN THÀNH:
    - Mẫu tương tự với tasksCreated
    - Theo dõi lịch sử hoàn thành của user
    - Được sử dụng để tính tỷ lệ năng suất
    */

    const productivityRate = totalTasksCreated > 0
        ? Math.round((totalTasksCompleted / totalTasksCreated) * 100)
        : 0;
    /* 
    📊 TÍNH TOÁN TỶ LỆ NĂNG SUẤT:
    - Toán tử ternary: điều_kiện ? giá_trị_nếu_đúng : giá_trị_nếu_sai
    - Điều kiện bảo vệ: totalTasksCreated > 0 để tránh chia cho zero
    - Math.round(): Làm tròn về số nguyên gần nhất cho percentage sạch
    - Công thức: (hoàn_thành / đã_tạo) * 100 = phần trăm hoàn thành
    - Trường hợp biên: 0 tasks được tạo → 0% rate (không phải undefined/NaN)
    
    🎯 LOGIC KINH DOANH:
    - Tỷ lệ năng suất = (hoàn thành / tổng tạo) * 100%
    - Phạm vi: 0% đến 100%
    - Tính toán thời gian thực: cập nhật khi preferences thay đổi
    - Được sử dụng cho achievements và phản hồi visual
    */

    // 🎭 LẤY AVATAR NGƯỜI DÙNG - Logic lựa chọn avatar động
    const getAvatarEmoji = () => {
        /* 
        🎨 ĐỊNH NGHĨA BỂ AVATAR:
        - Mảng tĩnh của professional emoji avatars
        - Đại diện đa dạng: giới tính khác nhau, nghề nghiệp khác nhau
        - Chủ đề chuyên nghiệp: developers, kinh doanh, sinh viên, nhà khoa học
        - Unicode emojis: tương thích đa nền tảng
        */
        const avatars = ['👨‍💻', '👩‍💻', '🧑‍💼', '👨‍🎓', '👩‍🎓', '🧑‍🚀', '👨‍🔬', '👩‍🔬'];

        /* 
        🔤 XỬ LÝ TÊN NGƯỜI DÙNG:
        - username || 'User': Fallback nếu username null/undefined
        - Đảm bảo có string để tính toán index
        - Mặc định 'User' có length = 4 cho hành vi có thể dự đoán
        */
        const userName = username || 'User';

        /* 
        🎯 THUẬT TOÁN LỰA CHỌN AVATAR:
        - preferences.avatar: Avatar tùy chỉnh của user (ưu tiên cao nhất)
        - ||: Fallback về avatar được tính toán nếu không có avatar tùy chỉnh
        - userName.length % avatars.length: Phép toán modulo
        - Xác định: cùng username → cùng avatar
        - Phân phối: trải đều qua các tùy chọn avatar
        
        📊 VÍ DỤ TOÁN HỌC MODULO:
        - 'Alice' (length=5) % 8 avatars = index 5 → '🧑‍🚀'
        - 'Bob' (length=3) % 8 avatars = index 3 → '👨‍🎓'
        - Ánh xạ nhất quán: cùng user luôn nhận cùng default avatar
        */
        return preferences.avatar || avatars[userName.length % avatars.length];
    };

    // 🖼️ JSX RETURN - Cấu trúc giao diện component
    return (
        <div className="user-profile">
            {/* 
            🏗️ CONTAINER CHÍNH:
            - CSS class "user-profile" cho styling và layout
            - Chứa nhiều sections: info, stats, settings, achievements
            - Flexbox/Grid layout trong CSS
            */}

            {/* 👤 PHẦN DANH TÍNH NGƯỜI DÙNG - Avatar, tên, lời chào cá nhân hóa */}
            <div className="user-info">
                <div className="user-avatar">
                    {getAvatarEmoji()}
                    {/* 
                    🎭 HIỂN THỊ AVATAR ĐỘNG:
                    - {getAvatarEmoji()}: Gọi function trong JSX expression
                    - Trả về emoji string dựa trên user preferences hoặc username
                    - Cập nhật thời gian thực khi preferences thay đổi
                    - Danh tính visual cho cá nhân hóa user
                    */}
                </div>

                <div className="user-details">
                    <h3 className="user-name">
                        {username || 'Người dùng'}
                        {/* 
                        👤 HIỂN THỊ TÊN NGƯỜI DÙNG:
                        - {username || 'Người dùng'}: Hiển thị có điều kiện với fallback
                        - Hiển thị username thực nếu có sẵn
                        - Fallback 'Người dùng' cho anonymous/khách users
                        - <h3>: Heading ngữ nghĩa cho tên user
                        */}
                    </h3>

                    <p className="user-greeting">
                        {getGreeting()}, {username || 'bạn'}! 👋
                    </p>
                    {/* 
                    🌅 PHÂN TÍCH LỜI CHÀO CÁ NHÂN HÓA:
                    - {getGreeting()}: Gọi function lời chào dựa trên thời gian
                    - Nội dung động: 'Chào buổi sáng/chiều/tối' dựa trên giờ hiện tại
                    - Cá nhân hóa: bao gồm username hoặc 'bạn' fallback
                    - 👋 emoji: phần tử visual thân thiện, chào đón
                    - Cập nhật thời gian thực khi component re-render
                    */}
                </div>
            </div>

            {/* 📊 PHẦN THỐNG KÊ NĂNG SUẤT - Chỉ số hiệu suất người dùng */}
            <div className="productivity-stats">
                <h4>📊 Năng suất làm việc</h4>
                {/* 
                🎯 TIÊU ĐỀ PHẦN:
                - <h4>: Phân cấp heading ngữ nghĩa (dưới h3 user-name)
                - 📊 icon: Chỉ báo visual cho data/thống kê
                - Nhãn tiếng Việt rõ ràng cho user hiểu
                */}

                <div className="stats-mini">
                    {/* 
                    📈 CONTAINER THỐNG KÊ:
                    - CSS Grid/Flexbox layout cho 3 stat items
                    - "stats-mini": định dạng hiển thị compact
                    - Cân nhắc thiết kế responsive
                    */}

                    <div className="stat-mini">
                        <span className="stat-value">{totalTasksCreated}</span>
                        <span className="stat-label">Đã tạo</span>
                    </div>

                    <div className="stat-mini">
                        <span className="stat-value">{totalTasksCompleted}</span>
                        <span className="stat-label">Hoàn thành</span>
                    </div>

                    <div className="stat-mini">
                        <span className="stat-value">{productivityRate}%</span>
                        <span className="stat-label">Hiệu suất</span>
                    </div>
                    {/* 
                    📊 PHÂN TÍCH HIỂN THỊ THỐNG KÊ:
                    - Ba chỉ số chính: Đã tạo, Hoàn thành, Tỷ lệ năng suất
                    - {totalTasksCreated}: Giá trị động từ biến đã tính toán
                    - {totalTasksCompleted}: Hiển thị lịch sử hoàn thành của user
                    - {productivityRate}%: Phần trăm đã tính toán với ký hiệu %
                    - "stat-value": Hiển thị số lớn, nổi bật
                    - "stat-label": Văn bản mô tả bên dưới số
                    - Cập nhật thời gian thực khi dữ liệu user thay đổi
                    - Các yếu tố gamification để khuyến khích cải thiện
                    */}
                </div>
            </div>

            {/* 🎯 PHẦN CÀI ĐẶT NHANH - Điều khiển toggle preferences người dùng */}
            <div className="quick-settings">
                <h4>⚙️ Cài đặt nhanh</h4>
                {/* ⚙️ TIÊU ĐỀ CÀI ĐẶT: Tiêu đề phần rõ ràng với gear icon */}

                {/* 🔔 TOGGLE THÔNG BÁO - Preferences thông báo người dùng */}
                <label className="setting-item">
                    {/* 
                    🏷️ PHẦN TỬ LABEL NGỮ NGHĨA:
                    - <label>: Liên kết với input element
                    - Click label sẽ toggle checkbox  
                    - Khả năng tiếp cận: screen readers hiểu kết nối
                    - "setting-item": CSS class cho tính nhất quán styling
                    */}

                    <input
                        type="checkbox"
                        checked={preferences.notifications ?? true}
                        onChange={(e) => updatePreferences({
                            notifications: e.target.checked
                        })}
                    />
                    {/* 
                    ✅ CHECKBOX THÔNG BÁO:
                    - type="checkbox": Điều khiển input boolean
                    - checked={preferences.notifications ?? true}: Controlled component
                    - ?? true: Nullish coalescing - mặc định true nếu undefined/null
                    - onChange: Event handler cho tương tác user
                    - e.target.checked: Giá trị boolean từ checkbox
                    - updatePreferences(): Cập nhật context với preference mới
                    */}

                    <span>🔔 Thông báo</span>
                    {/* 🏷️ NHÃN CÀI ĐẶT: Văn bản visual với icon */}
                </label>

                {/* 🌙 TOGGLE TỰ ĐỘNG DARK MODE - Preference dark mode tự động */}
                <label className="setting-item">
                    <input
                        type="checkbox"
                        checked={preferences.autoDarkMode ?? false}
                        onChange={(e) => updatePreferences({
                            autoDarkMode: e.target.checked
                        })}
                    />
                    {/* 
                    🌙 CHECKBOX TỰ ĐỘNG DARK MODE:
                    - ?? false: Mặc định false cho auto dark mode
                    - Mẫu giống như notifications checkbox
                    - Cập nhật property preferences.autoDarkMode
                    */}

                    <span>🌙 Dark mode tự động</span>
                </label>

                {/* 💾 TOGGLE TỰ ĐỘNG LƯU - Preference tự động lưu */}
                <label className="setting-item">
                    <input
                        type="checkbox"
                        checked={preferences.autoSave ?? true}
                        onChange={(e) => updatePreferences({
                            autoSave: e.target.checked
                        })}
                    />
                    {/* 
                    💾 CHECKBOX TỰ ĐỘNG LƯU:
                    - ?? true: Mặc định true cho auto save (thân thiện user)
                    - Mẫu nhất quán với các settings khác
                    - Cập nhật property preferences.autoSave
                    */}

                    <span>💾 Tự động lưu</span>
                </label>
            </div>

            {/* 🏆 ACHIEVEMENTS SECTION - Hệ thống huy hiệu gamification */}
            <div className="achievements">
                <h4>🏆 Thành tích</h4>
                {/* 🎯 TIÊU ĐỀ THÀNH TÍCH: Trophy icon với tiêu đề tiếng Việt rõ ràng */}

                <div className="achievement-badges">
                    {/* 🏅 CONTAINER HUY HIỆU: Grid/flex layout cho achievement badges */}

                    {getAchievements(totalTasksCreated, totalTasksCompleted, productivityRate).map(achievement => (
                        <div
                            key={achievement.id}
                            className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                            title={achievement.description}
                        >
                            <span className="badge-icon">{achievement.icon}</span>
                            <span className="badge-name">{achievement.name}</span>
                        </div>
                    ))}
                    {/* 
                        🏆 PHÂN TÍCH ACHIEVEMENT MAPPING:
                        - getAchievements(): Trả về mảng các object achievement với điều kiện unlock
                        - .map(): Chuyển đổi achievements thành các JSX badge elements
                        - key={achievement.id}: React key duy nhất cho list rendering
                        - Dynamic className: Phân biệt visual giữa unlocked/locked achievements
                        - title={achievement.description}: Tooltip hiển thị mô tả achievement
                        - badge-icon: Hiển thị emoji icon của achievement
                        - badge-name: Hiển thị tên achievement
                        - Gamification: Tạo động lực cho users bằng hệ thống reward visual
                        - Real-time updates: Trạng thái achievement thay đổi khi user stats thay đổi
                        */}
                </div>
            </div>
        </div>
    );
    /* 
    🏗️ TÓM TẮT CẤU TRÚC COMPONENT:
    <div className="user-profile"> - Container chính
      ├── <div className="user-info"> - Thông tin user: avatar và lời chào
      ├── <div className="productivity-stats"> - Thống kê metrics tasks
      ├── <div className="quick-settings"> - Các toggle preference nhanh
      └── <div className="achievements"> - Huy hiệu gamification
    
    🎯 ĐẶC ĐIỂM CHÍNH CỦA COMPONENT:
    - Smart Component: Có business logic và tính toán
    - Context Consumer: Sử dụng useUser hook để nhận data
    - Real-time Updates: Tự động cập nhật khi context thay đổi
    - Interactive: User có thể thay đổi settings và thấy feedback ngay lập tức
    - Gamified: Hệ thống achievement để khuyến khích productivity
    */
};

// 🌅 LẤY LỜI CHÀO DỰA TRÊN THỜI GIAN - Hàm trợ giúp cho nội dung nhạy cảm thời gian
function getGreeting() {
    /* 
    ⏰ LOGIC LỜI CHÀO DỰA TRÊN THỜI GIAN:
    - new Date().getHours(): Lấy giờ hiện tại (0-23)
    - Ba khoảng thời gian: sáng, chiều, tối
    - Lời chào tiếng Việt cho trải nghiệm user bản địa hóa
    */
    const hour = new Date().getHours();

    if (hour < 12) return 'Chào buổi sáng';      // 0-11: Lời chào buổi sáng
    if (hour < 18) return 'Chào buổi chiều';    // 12-17: Lời chào buổi chiều
    return 'Chào buổi tối';                     // 18-23: Lời chào buổi tối

    /* 
    🎯 PHÂN TÍCH FUNCTION LỜI CHÀO:
    - Pure function: cùng input → cùng output
    - Không side effects, không dependencies
    - Hành vi xác định dựa trên thời gian hệ thống
    - Nội dung bản địa hóa cho users Việt Nam
    - Có thể dễ dàng unit test
    - Cập nhật tự động khi component re-render (nếu giờ thay đổi)
    */
}

// 🏆 HÀM LẤY THÀNH TÍCH USER - Hệ thống tạo gamification
function getAchievements(created, completed, rate) {
    /* 
    🎮 THAM SỐ GAMIFICATION:
    - created: Tổng số tasks user đã tạo (số nguyên)
    - completed: Tổng số tasks user đã hoàn thành (số nguyên)  
    - rate: Tỷ lệ productivity dạng percentage (0-100)
    - Return: Mảng các object achievement với điều kiện unlock
    */

    return [
        {
            /* 🎯 THÀNH TÍCH TASK ĐẦU TIÊN - Milestone cấp độ nhập môn */
            id: 'first-task',                      // Định danh duy nhất
            name: 'Task đầu tiên',                 // Tên hiển thị (tiếng Việt)
            icon: '🎯',                            // Icon emoji visual
            description: 'Tạo task đầu tiên',     // Mô tả tooltip
            unlocked: created >= 1                 // Điều kiện unlock: ít nhất 1 task được tạo
        },
        {
            /* ⚡ THÀNH TÍCH NĂNG SUẤT - Milestone cấp độ trung cấp */
            id: 'productive',
            name: 'Người năng suất',
            icon: '⚡',
            description: 'Hoàn thành 10 tasks',
            unlocked: completed >= 10              // Điều kiện unlock: 10+ tasks hoàn thành
        },
        {
            /* 💎 THÀNH TÍCH HOÀN HẢO - Milestone hiệu suất cao */
            id: 'perfectionist',
            name: 'Người hoàn hảo',
            icon: '💎',
            description: 'Đạt 100% completion rate',
            unlocked: rate === 100 && created >= 5  // Unlock: 100% rate + tối thiểu 5 tasks
            /* Điều kiện kết hợp: vừa có tỷ lệ hoàn hảo VÀ mẫu dữ liệu có ý nghĩa */
        },
        {
            /* 🐝 THÀNH TÍCH ONG CHĂM CHỈ - Milestone dựa trên khối lượng */
            id: 'busy-bee',
            name: 'Ong chăm chỉ',
            icon: '🐝',
            description: 'Tạo 50+ tasks',
            unlocked: created >= 50                 // Điều kiện unlock: khối lượng tạo task cao
        }
    ];

    /* 
    🏆 NGUYÊN TẮC THIẾT KẾ HỆ THỐNG ACHIEVEMENT:
    - Độ khó tăng dần: 1 → 10 → 50 tasks, 100% completion
    - Tiêu chí hỗn hợp: tạo task, hoàn thành task, tỷ lệ hiệu quả
    - Phần thưởng visual: icon độc đáo cho từng loại achievement
    - Nội dung bản địa hóa: tên và mô tả tiếng Việt
    - Trạng thái unlock đơn giản: logic true/false đơn giản
    - Có thể mở rộng: dễ dàng thêm achievements mới sau này
    - Tính động lực: khuyến khích các hành vi productivity khác nhau
    */
}

export default UserProfile;

/*
🎓 KIẾN THỨC REACT TOÀN DIỆN - PHÂN TÍCH SÂU USERPROFILE COMPONENT

📋 CÁC MẪU THIẾT KẾ VÀ KHÁI NIỆM REACT:

🎯 1. TÍCH HỢP CONTEXT:
   📡 Sử dụng useUser Hook:
   - useUser(): Custom hook để truy cập dữ liệu user context
   - Destructuring: { username, preferences, updatePreferences }
   - Cập nhật thời gian thực: Component tự động re-render khi context thay đổi
   - Lưu trữ tự động: Dữ liệu được lưu trữ thông qua UserContext
   
   🔄 Luồng Dữ Liệu:
   - UserContext cung cấp data → useUser hook → component nhận
   - Hai chiều: Component cũng có thể cập nhật preferences qua updatePreferences
   - Nguồn sự thật duy nhất: Tất cả dữ liệu user được quản lý tập trung

�📊 2. GIÁ TRỊ TÍNH TOÁN - Tính Toán Động:
   🧮 Chỉ Số Năng Suất:
   - totalTasksCreated: Lấy từ preferences với fallback || 0
   - totalTasksCompleted: Theo dõi lịch sử hoàn thành của user
   - productivityRate: Tính toán phần trăm với Math.round()
   - Mệnh đề bảo vệ: Tránh chia cho zero với điều kiện totalTasksCreated > 0
   
   🎯 Hệ Thống Thành Tích Động:
   - getAchievements(): Function tạo achievements dựa trên thống kê user
   - Điều kiện mở khóa: Logic điều kiện để mở khóa achievements
   - Tính toán thời gian thực: Achievements cập nhật khi stats thay đổi

🎨 3. GIAO DIỆN ĐỘNG - Giao Diện Động:
   🎭 Lựa Chọn Avatar:
   - Thuật toán: userName.length % avatars.length cho lựa chọn xác định
   - Hệ thống fallback: preferences.avatar hoặc avatar được tính toán
   - Đại diện đa dạng: Professional emoji avatars
   
   🌅 Lời Chào Dựa Trên Thời Gian:
   - getGreeting(): Function dựa trên giờ hiện tại
   - Nội dung bản địa hóa: Lời chào tiếng Việt
   - Cập nhật tự động: Thay đổi theo thời gian khi component re-render
   
   🏆 Trạng Thái Huy Hiệu Thành Tích:
   - className động: 'unlocked' vs 'locked' dựa trên điều kiện
   - Phản hồi visual: Styling khác biệt cho trạng thái đã đạt/chưa đạt
   - Tooltips: Mô tả cho hướng dẫn user

⚙️ 4. TÙY CHỌN NGƯỜI DÙNG - Quản Lý Tùy Chọn:
   ✅ Components Được Kiểm Soát:
   - Checkbox inputs: type="checkbox" với mẫu controlled
   - checked={preferences.property ?? defaultValue}: Nullish coalescing
   - onChange handlers: (e) => updatePreferences({ property: e.target.checked })
   - Cập nhật ngay lập tức: Thay đổi ngay khi user tương tác
   
   💾 Lưu Trữ Bền Vững:
   - updatePreferences(): Function cập nhật context
   - Lưu trữ tự động: Context tự động lưu preferences
   - Giá trị mặc định: Mặc định hợp lý với ?? operator

🎮 5. HỆ THỐNG GAME HÓA - Hệ Thống Game Hóa:
   🏆 Kiến Trúc Thành Tích:
   - Độ khó tăng dần: 1 → 10 → 50 tasks, hoàn thành 100%
   - Tiêu chí hỗn hợp: Tạo, hoàn thành, hiệu quả
   - Trạng thái unlock boolean: Logic true/false đơn giản
   - Thiết kế có thể mở rộng: Dễ thêm achievements mới
   
   🎯 Tính Năng Tạo Động Lực:
   - Phần thưởng visual: Icons và badges cho achievements
   - Chỉ báo tiến độ: Stats hiển thị tiến độ user
   - Củng cố tích cực: Ngôn ngữ khuyến khích và hình ảnh

🏗️ KIẾN TRÚC COMPONENT NÂNG CAO:

📦 1. PHÂN LOẠI LOẠI COMPONENT:
   🧠 Đặc Điểm Smart Component:
   - Logic kinh doanh: Tính toán, xử lý dữ liệu
   - Quản lý trạng thái: Tiêu thụ context và cập nhật
   - Tương tác user: Xử lý sự kiện và cập nhật preference
   - Nhiều trách nhiệm: UI + logic + quản lý dữ liệu

🔗 2. KẾT HỢP COMPONENT:
   🎨 Các Phần UI:
   - user-info: Danh tính và lời chào
   - productivity-stats: Hiển thị metrics
   - quick-settings: Điều khiển preference
   - achievements: Huy hiệu gamification
   
   📏 Chiến Lược Layout:
   - HTML ngữ nghĩa: Phân cấp heading đúng (h3, h4)
   - CSS classes: Tên class có ý nghĩa cho styling
   - Thiết kế responsive: Cấu trúc thân thiện mobile

♿ 3. CÂN NHẮC KHẢ NĂNG TIẾP CẬN:
   🏷️ Phần Tử Ngữ Nghĩa:
   - Liên kết <label> với input elements
   - Phân cấp heading đúng cho screen readers
   - Thuộc tính title cho tooltips
   - Nội dung văn bản có ý nghĩa

🚀 HIỆU SUẤT VÀ TỐI ƯU HÓA:

⚡ 1. HIỆU QUẢ RENDERING:
   🔄 Các Trigger Re-render:
   - Thay đổi giá trị context
   - Thay đổi props (nếu có)
   - Parent component re-render
   
   🎯 Cơ Hội Tối Ưu Hóa:
   - React.memo() có thể wrap component nếu cần
   - useMemo() cho tính toán tốn kém
   - useCallback() cho tham chiếu function ổn định

💾 2. QUẢN LÝ BỘ NHỚ:
   🧹 Mẫu Dọn Dẹp:
   - Không có subscriptions cần cleanup trong component này
   - Context xử lý lưu trữ tự động
   - Functions là pure và không tạo memory leaks

UserProfile component này minh họa phát triển React toàn diện
với tích hợp context, giao diện động, tùy chọn user, và gamification.
Ví dụ hoàn hảo của kiến trúc component React hiện đại! 🎯
*/