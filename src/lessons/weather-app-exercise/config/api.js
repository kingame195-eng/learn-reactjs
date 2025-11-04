/**
 * WEATHER_API - Object cấu hình cho OpenWeatherMap API
 * 
 * Đây là một configuration object chứa tất cả thông tin cần thiết
 * để kết nối và sử dụng OpenWeatherMap API service
 */
export const WEATHER_API = {
    /**
     * BASE_URL: Đường dẫn gốc của OpenWeatherMap API
     * - 'https://api.openweathermap.org/data/2.5': URL chính thức của OpenWeatherMap
     * - '/data/2.5': Phiên bản API hiện tại (version 2.5)
     * - Tất cả API calls sẽ bắt đầu từ URL này
     */
    BASE_URL: 'https://api.openweathermap.org/data/2.5',

    /**
     * API_KEY: Khóa xác thực để truy cập API
     * - process.env.REACT_APP_WEATHER_API_KEY: Đọc từ environment variable
     * - Environment variables trong React phải bắt đầu bằng 'REACT_APP_'
     * - 'demo-key': Giá trị fallback nếu không có environment variable
     * - || operator: Nếu giá trị bên trái falsy, sử dụng giá trị bên phải
     * 
     * Cách hoạt động:
     * 1. Tìm REACT_APP_WEATHER_API_KEY trong file .env
     * 2. Nếu không tìm thấy → sử dụng 'demo-key'
     * 3. API key này sẽ được gửi kèm mọi request để xác thực
     */
    API_KEY: process.env.REACT_APP_WEATHER_API_KEY || 'demo-key',

    /**
     * ENDPOINTS: Object chứa các đường dẫn API endpoints
     * Mỗi endpoint phục vụ một mục đích khác nhau
     */
    ENDPOINTS: {
        /**
         * CURRENT: '/weather'
         * - Endpoint để lấy thông tin thời tiết hiện tại
         * - Trả về: nhiệt độ, độ ẩm, mô tả thời tiết của 1 thành phố
         * - URL đầy đủ: BASE_URL + '/weather' + query parameters
         */
        CURRENT: '/weather',

        /**
         * FORECAST: '/forecast'
         * - Endpoint để lấy dự báo thời tiết 5 ngày tới
         * - Trả về: dự báo chi tiết theo từng khoảng thời gian (3h/lần)
         * - URL đầy đủ: BASE_URL + '/forecast' + query parameters
         */
        FORECAST: '/forecast'
    }
};

/**
 * buildWeatherUrl - Hàm xây dựng URL để lấy thời tiết hiện tại
 * 
 * @param {string} city - Tên thành phố cần lấy thời tiết
 * @returns {string} - URL hoàn chỉnh để gọi API
 * 
 * Mục đích:
 * - Tạo URL đầy đủ để gọi API lấy thời tiết hiện tại
 * - Kết hợp base URL, endpoint, và các query parameters
 * - Đảm bảo format URL đúng chuẩn
 */
export const buildWeatherUrl = (city) => {
    /**
     * Template Literal (backticks ``) để xây dựng URL
     * 
     * Cấu trúc URL: BASE_URL + ENDPOINT + QUERY_PARAMETERS
     * 
     * Các thành phần:
     * - ${WEATHER_API.BASE_URL}: 'https://api.openweathermap.org/data/2.5'
     * - ${WEATHER_API.ENDPOINTS.CURRENT}: '/weather'
     * - ?q=${city}: Query parameter tên thành phố (ví dụ: ?q=Hanoi)
     * - &appid=${WEATHER_API.API_KEY}: API key để xác thực
     * - &units=metric: đơn vị đo (metric = Celsius, km/h, hPa)
     * - &lang=vi: ngôn ngữ trả về (vi = tiếng Việt)
     * 
     * Ví dụ URL được tạo:
     * 'https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=your-api-key&units=metric&lang=vi'
     * 
     * Query Parameters giải thích:
     * - q=Hanoi: tìm thời tiết của thành phố Hanoi
     * - appid=key: xác thực API key
     * - units=metric: nhiệt độ Celsius, tốc độ gió km/h
     * - lang=vi: mô tả thời tiết bằng tiếng Việt
     */
    return `${WEATHER_API.BASE_URL}${WEATHER_API.ENDPOINTS.CURRENT}?q=${city}&appid=${WEATHER_API.API_KEY}&units=metric&lang=vi`;
};

/**
 * buildForecastUrl - Hàm xây dựng URL để lấy dự báo thời tiết 5 ngày
 * 
 * @param {string} city - Tên thành phố cần lấy dự báo thời tiết
 * @returns {string} - URL hoàn chỉnh để gọi API forecast
 * 
 * Mục đích:
 * - Tạo URL để lấy dự báo thời tiết 5 ngày tới
 * - Tương tự buildWeatherUrl nhưng sử dụng endpoint '/forecast'
 * - Trả về dữ liệu dự báo chi tiết theo từng khoảng 3 giờ
 */
export const buildForecastUrl = (city) => {
    /**
     * Template Literal để xây dựng URL cho dự báo thời tiết
     * 
     * Cấu trúc tương tự buildWeatherUrl nhưng:
     * - Sử dụng ENDPOINTS.FORECAST thay vì ENDPOINTS.CURRENT
     * - Endpoint '/forecast' trả về dữ liệu dự báo 5 ngày
     * - Mỗi ngày có 8 mốc thời gian (3 giờ/lần): 00:00, 03:00, 06:00, ..., 21:00
     * 
     * Các thành phần URL:
     * - ${WEATHER_API.BASE_URL}: 'https://api.openweathermap.org/data/2.5'
     * - ${WEATHER_API.ENDPOINTS.FORECAST}: '/forecast'
     * - ?q=${city}: tên thành phố cần dự báo
     * - &appid=${WEATHER_API.API_KEY}: API key xác thực
     * - &units=metric: đơn vị metric (°C, km/h, hPa)
     * - &lang=vi: ngôn ngữ tiếng Việt
     * 
     * Ví dụ URL được tạo:
     * 'https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&appid=your-api-key&units=metric&lang=vi'
     * 
     * Dữ liệu trả về bao gồm:
     * - 40 records (5 ngày × 8 mốc thời gian)
     * - Nhiệt độ, độ ẩm, gió, mô tả cho từng mốc
     * - Timestamps để biết chính xác thời gian dự báo
     */
    return `${WEATHER_API.BASE_URL}${WEATHER_API.ENDPOINTS.FORECAST}?q=${city}&appid=${WEATHER_API.API_KEY}&units=metric&lang=vi`;
};