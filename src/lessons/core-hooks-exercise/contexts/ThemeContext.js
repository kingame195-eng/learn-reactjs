// 📦 IMPORT CÁC HOOKS CẦN THIẾT TỪ REACT
import { createContext, useContext, useState, useEffect } from 'react';
// 🏗️ createContext: Factory function tạo Context object để share data globally
//    - Giải quyết "prop drilling" problem (pass props qua nhiều levels)
//    - Return object có .Provider và .Consumer components
//    - Provider wrap components và provide value, Consumer consume value
//
// 🎣 useContext: Hook để consume Context value trong functional components  
//    - Thay thế Context.Consumer pattern (cleaner syntax)
//    - Must be used inside Provider tree, otherwise return undefined
//    - Automatically subscribe to context changes → re-render when value changes
//
// 📊 useState: Hook quản lý local state trong functional components
//    - Return [stateValue, setterFunction] tuple  
//    - Trigger re-render khi state changes
//    - Support lazy initial state với callback function
//
// 🔄 useEffect: Hook để handle side effects (operations ngoài React render cycle)
//    - DOM manipulation, API calls, subscriptions, localStorage, timers
//    - Chạy sau render (asynchronously), có thể return cleanup function
//    - Dependencies array control khi effect re-runs

// 🏗️ TẠO THEME CONTEXT - Global State Container
const ThemeContext = createContext();
// createContext(): Factory function tạo Context object
// Return value: { Provider, Consumer, displayName, _currentValue, _defaultValue }
// 
// 🎯 MỤC ĐÍCH SỬ DỤNG CONTEXT:
// ❌ PROP DRILLING PROBLEM:
//    App → Header → Navigation → ThemeButton (theme prop pass qua 3 levels)
//    App → Main → Sidebar → UserProfile → ThemeDisplay (theme prop pass qua 4 levels)
//    
// ✅ CONTEXT SOLUTION:  
//    App(ThemeProvider) → any component can useTheme() directly
//    Không cần pass props qua intermediate components
//
// 📦 CONTEXT SẼ CHỨA:
// - theme: Current theme string ('light' | 'dark')
// - toggleTheme: Function để switch themes
// - isLight/isDark: Boolean helpers cho conditional rendering
// - Auto-save logic: Persist theme preference to localStorage

// 🧩 THEMEPROVIDER COMPONENT - Component wrapper cung cấp theme data
export function ThemeProvider({ children }) {
    // { children }: Destructure props để lấy các component con
    // children = tất cả components được wrap bởi ThemeProvider

    // 📊 STATE: CURRENT THEME với LAZY INITIAL từ localStorage
    const [theme, setTheme] = useState(() => {
        // 🔧 LAZY INITIAL STATE PATTERN - Optimization technique
        // () => { ... }: Function callback cho useState
        // Chỉ execute 1 lần khi component mount, không re-run mỗi render
        // 
        // 🆚 SO SÁNH PATTERNS:
        // ❌ EAGER: useState(localStorage.getItem('theme') || 'light')
        //    → localStorage.getItem() chạy mỗi render (waste performance)
        // ✅ LAZY: useState(() => localStorage.getItem('theme') || 'light')  
        //    → localStorage.getItem() chỉ chạy 1 lần (better performance)

        const savedTheme = localStorage.getItem('theme');
        // localStorage.getItem('theme'): Browser API lấy stored data
        // Return: string value hoặc null nếu key chưa tồn tại
        // localStorage persist across browser sessions (không mất khi đóng browser)

        return savedTheme || 'dark';
        // Logical OR operator: savedTheme || 'light'
        // Nếu savedTheme = null (first visit) → return 'light' (default)
        // Nếu savedTheme = 'dark' → return 'dark' (restored preference)
        // 
        // 🔄 INITIALIZATION SCENARIOS:
        // First visit: savedTheme=null → theme='light'
        // Return visit: savedTheme='dark' → theme='dark' (restored)
    });
    // 📊 STATE STRUCTURE:
    // theme: Current theme value ('light' | 'dark') 
    // setTheme: Function để update theme + trigger re-renders
    // Lazy initial state: performance optimization cho expensive initial calculations

    // 🔄 FUNCTION ĐỂ TOGGLE THEME
    const toggleTheme = () => {
        // 🔄 FUNCTIONAL STATE UPDATE PATTERN - Safe state updates
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            return newTheme;
        });
    };

    // 💾 AUTO-SAVE THEME TO localStorage (Side Effect cho Persistence)
    useEffect(() => {
        // � useEffect PATTERN: Effect runs AFTER render completes
        // Đây là "synchronization effect" - sync React state với external system (localStorage)

        // ️ PERSIST STATE TO BROWSER STORAGE
        localStorage.setItem('theme', theme);
        // Confirmation log để verify operation completed
    }, [theme]);
    // 📋 DEPENDENCY ARRAY: [theme]
    // Effect chỉ re-run khi theme state changes (not every render)
    // Mỗi lần setTheme() updates state → effect triggers → auto-save
    // 
    // 🔄 AUTO-SYNC WORKFLOW:
    // 1. User toggles theme → setTheme() called → theme state updates
    // 2. Component re-renders với new theme value
    // 3. useEffect detects theme dependency changed → runs effect
    // 4. localStorage.setItem() saves new theme to browser storage  
    // 5. Next app load → lazy initial state reads từ localStorage
    // → Theme preference persisted across browser sessions!

    // 📱 LOAD THEME FROM LOCALSTORAGE (Chạy 1 lần khi component mount)
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            setTheme(savedTheme);
        }
        // Nếu không có saved theme → giữ nguyên default 'light'
    }, []);
    // []: Empty dependency array = chỉ chạy 1 lần khi component mount
    // Mục đích: Load theme preference khi app khởi động

    // 🎨 APPLY THEME CLASS TO BODY (Chạy mỗi khi theme thay đổi)
    useEffect(() => {
        // Apply theme class to body element
        document.body.className = `theme-${theme}`;
    }, [theme]);
    // [theme]: Chỉ chạy khi theme thay đổi
    // CSS có thể target .theme-light và .theme-dark classes

    // 📦 CONTEXT VALUE OBJECT - API Interface cho Child Components
    const value = {
        // 🎯 CORE STATE & ACTIONS
        theme,                          // Current theme string ('light' | 'dark')
        toggleTheme,                    // Function để switch theme programmatically

        // 🔧 CONVENIENCE HELPERS - Computed values để dễ sử dụng
        isLight: theme === 'light',     // Boolean: true nếu đang light mode
        isDark: theme === 'dark'        // Boolean: true nếu đang dark mode
    };
    // 🏗️ VALUE OBJECT DESIGN PRINCIPLES:
    // 1. Core data: theme state value
    // 2. Actions: functions để modify state (toggleTheme)  
    // 3. Computed values: derived state cho convenience (isLight, isDark)
    // 4. Stable reference: object tạo mới mỗi render, nhưng content có thể same
    // 
    // 💡 USAGE EXAMPLES trong child components:
    // const { theme } = useTheme();           // Get current theme string
    // const { toggleTheme } = useTheme();      // Get toggle function  
    // const { isLight, isDark } = useTheme();  // Get boolean helpers
    // 
    // 🎯 BOOLEAN HELPERS BENEFITS:
    // ✅ Clean: if (isLight) { ... }
    // ❌ Verbose: if (theme === 'light') { ... }
    // ✅ Declarative: className={isLight ? 'light-style' : 'dark-style'}
    // ❌ Imperative: className={theme === 'light' ? 'light-style' : 'dark-style'}

    // 🌐 RENDER CONTEXT PROVIDER - Distribute value to component tree
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
    // 🏗️ CONTEXT PROVIDER PATTERN:
    // <ThemeContext.Provider>: Special component từ createContext()
    // value={value}: Prop để pass data xuống component tree
    // {children}: React children prop - all nested components
    // 
    // 🔄 PROVIDER TREE STRUCTURE:
    // <ThemeProvider>              ← Provider component (this function)
    //   <App>                      ← Child level 0
    //     <Header>                 ← Child level 1  
    //       <ThemeToggle />        ← Child level 2 (can useTheme())
    //     </Header>
    //     <Main>                   ← Child level 1
    //       <TaskList />           ← Child level 2 (can useTheme())
    //     </Main>
    //   </App>
    // </ThemeProvider>
    // 
    // 💡 CONTEXT CONSUMPTION:
    // Bất kỳ component nào trong Provider tree có thể:
    // const { theme, toggleTheme, isLight } = useTheme();
    // → Nhận được same value object này
    // → Automatically re-render khi value changes
}

// 🎣 CUSTOM HOOK - Safe Context Consumer với Error Boundary
export function useTheme() {
    // 🏗️ CUSTOM HOOK PATTERN: Encapsulate context consumption logic
    // Benefits: Type safety, error handling, consistent API, reusability
    // Pattern: useContext + validation + error handling

    // 📡 CONSUME CONTEXT VALUE
    const context = useContext(ThemeContext);
    // useContext(ThemeContext): React hook để access nearest Provider value
    // Return: value object từ nearest ThemeProvider trong component tree
    // Hoặc: undefined nếu không có Provider ancestor
    // 
    // 🔍 CONTEXT LOOKUP PROCESS:
    // 1. React traverse lên component tree từ calling component
    // 2. Tìm nearest <ThemeContext.Provider> ancestor  
    // 3. Return value prop của Provider đó
    // 4. Nếu không tìm thấy Provider → return createContext() default value (undefined)

    // 🛡️ ERROR BOUNDARY - Fail Fast Pattern
    if (context === undefined) {
        // Guard clause: Validate context trước khi use
        // context === undefined: Component không trong Provider tree

        throw new Error('useTheme must be used within a ThemeProvider');
        // throw Error: Crash app immediately với clear message
        // "Fail fast" principle: Detect bugs sớm rather than silent failures
        // Message rõ ràng giúp developer fix bug nhanh chóng
        // 
        // 🎯 ALTERNATIVE APPROACHES:
        // ❌ Return null: Silent failure, hard to debug
        // ❌ Return default: Hide configuration errors  
        // ✅ Throw Error: Clear failure, easy to fix
    }

    // ✅ RETURN VALIDATED CONTEXT
    return context;
    // Return: { theme, toggleTheme, isLight, isDark }
    // Type-safe: TypeScript có thể infer exact type
    // Guaranteed: context definitely not undefined at this point
    // 
    // 💡 USAGE PATTERNS trong components:
    // const { theme } = useTheme();                    // Destructure specific values
    // const themeContext = useTheme();                 // Get full object
    // const { isLight, toggleTheme } = useTheme();     // Multiple destructured values
}

/* 
🎯 CUSTOM HOOK BENEFITS:

1. 🛡️ ERROR HANDLING: Automatic validation, clear error messages
2. 🔒 ENCAPSULATION: Hide useContext complexity, provide clean API  
3. 🔄 CONSISTENCY: Same consumption pattern across all components
4. 🧪 TESTABILITY: Easy to mock custom hook in tests
5. 📚 DOCUMENTATION: Single place để document context usage
6. 🚀 EXTENSIBILITY: Easy to add logging, analytics, etc.

📖 USAGE EXAMPLES:
```jsx
// ✅ Correct usage (inside Provider)
function ThemeButton() {
    const { isLight, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme}>
            {isLight ? '🌙' : '☀️'}
        </button>
    );
}

// ❌ Incorrect usage (outside Provider) 
function BrokenComponent() {
    const { theme } = useTheme(); // → Error: useTheme must be used within ThemeProvider
    return <div>{theme}</div>;
}
```
*/

/* 
🔄 LUỒNG HOẠT ĐỘNG CHI TIẾT:

📱 Mount Phase (App khởi động):
1. ThemeProvider component được mount
2. useState('light') khởi tạo → theme = 'light'  
3. useEffect([], []) chạy → load theme từ localStorage
4. Nếu có saved theme → setTheme() → theme updates
5. useEffect([theme]) chạy → set body className
6. Render Provider với value object

🔄 Theme Toggle (User interaction):
1. User click button → gọi toggleTheme()
2. setTheme() được call → theme state changes
3. useEffect([theme]) trigger → save theme to localStorage 
4. useEffect([theme]) trigger → update body className
5. Component re-render với theme mới
6. All children components nhận value mới

🧩 Component Consume (Component sử dụng theme):
1. Component call useTheme() hook
2. useContext() lấy value từ nearest ThemeProvider
3. Return { theme, toggleTheme, isLight, isDark }
4. Component dùng data để render UI theo theme
*/


