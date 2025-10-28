// 🎨 THEME TOGGLE COMPONENT - UI Component với Context Integration
import React from 'react';
// React: Core library để tạo functional components
// Không cần import { useState, useEffect } vì component này stateless
// Chỉ consume state từ Context, không manage local state

import { useTheme } from '../contexts/ThemeContext';
// useTheme: Custom hook import từ ThemeContext file
// '../contexts/': Relative path - đi lên 1 level rồi vào contexts folder
// Custom hook pattern: encapsulate context consumption logic

// 🏗️ FUNCTIONAL COMPONENT - Stateless UI Component
function ThemeToggle() {
    // function ThemeToggle(): React functional component declaration
    // Functional components: Simpler than class components, use hooks for state
    // Component name: PascalCase convention (ThemeToggle, not themeToggle)

    // 🎣 CONTEXT CONSUMPTION - Connect to Global Theme State
    const { theme, toggleTheme, isLight } = useTheme();
    // Object destructuring: Extract specific properties từ useTheme() return value
    // useTheme(): Custom hook call - automatically subscribes to ThemeContext changes
    // 
    // 🔄 CONTEXT SUBSCRIPTION FLOW:
    // 1. useTheme() calls useContext(ThemeContext)
    // 2. React finds nearest ThemeProvider trong component tree
    // 3. Return Provider's value prop: { theme, toggleTheme, isLight, isDark }
    // 4. Component automatically re-renders khi context value changes
    // 
    // 📊 DESTRUCTURED VALUES:
    // theme: Current theme string ('light' | 'dark') - source of truth
    // toggleTheme: Function reference để trigger theme switch
    // isLight: Computed boolean (theme === 'light') - convenience helper

    // Component renders with current theme values
    // Debug object để trace component lifecycle và state changes
    // Render log helps understand:
    // - When component re-renders (context changes)
    // - What values component receives from context
    // - Performance: How often re-renders happen
    // 
    // 🔍 RENDER TRIGGERS:
    // - Initial mount: Component first rendered
    // - Context update: ThemeProvider state changes → all consumers re-render
    // - Parent re-render: If parent component re-renders (rare in this case)

    // 🖼️ JSX RETURN - Component UI Structure
    return (
        <button
            // 🎨 CSS STYLING
            className="theme-toggle"
            // className: HTML attribute để apply CSS styles
            // "theme-toggle-btn": CSS class name defined trong TaskManager.scss
            // CSS class will handle: colors, spacing, hover effects, transitions

            // 🖱️ EVENT HANDLING - User Interaction
            onClick={toggleTheme}

            // 🔍 ACCESSIBILITY - User Experience Enhancement
            title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
        // title: HTML attribute tạo tooltip khi hover
        // Template literal với conditional text
        // isLight=true → "Switch to dark mode"
        // isLight=false → "Switch to light mode"  
        // UX benefit: User biết button sẽ làm gì trước khi click
        >
            {/* 🌙☀️ DYNAMIC ICON SECTION - Visual Theme Indicator */}
            <span className="theme-icon">
                {/* span: Inline container element cho styling */}
                {/* className="theme-icon": CSS class để style icon specifically */}

                {isLight ? '🌙' : '☀️'}
                {/* 🔄 CONDITIONAL RENDERING với Ternary Operator:
                    isLight ? value_if_true : value_if_false
                    
                    🎯 UX LOGIC - Icon shows OPPOSITE của current theme:
                    - Current: Light theme → Show: 🌙 (suggest switch to dark)
                    - Current: Dark theme → Show: ☀️ (suggest switch to light)
                    
                    🧠 PSYCHOLOGICAL DESIGN:
                    Icon represents the ACTION user will take, not current state
                    More intuitive than showing current state icon
                */}
            </span>

            {/* 📝 DYNAMIC TEXT SECTION - Action Description */}
            <span className="theme-text">
                {/* Text description của action sẽ thực hiện */}

                {isLight ? 'Dark' : 'Light'}
                {/* 📖 TEXT LOGIC - Shows TARGET mode:
                    - Current: Light → Text: "Dark" (will switch to dark)
                    - Current: Dark → Text: "Light" (will switch to light)
                    
                    🎯 CONSISTENT UX PATTERN:
                    Both icon và text represent same thing: NEXT action
                    User sees: 🌙 Dark → "Click to go dark mode"
                    User sees: ☀️ Light → "Click to go light mode"
                */}
            </span>

            {/* 📊 CURRENT STATUS DISPLAY - State Debugging Aid */}
            <span className="current-theme">
                ({theme})
                {/* 🔍 DEVELOPER/DEBUG INFO:
                    Parentheses indicate this is meta-information
                    Shows CURRENT theme state for debugging/confirmation
                    Format: "(light)" hoặc "(dark)"
                    
                    🎯 PURPOSE:
                    - Visual confirmation của current state
                    - Debug aid để verify state changes
                    - Could be hidden trong production với CSS
                */}
            </span>
        </button>
        // Đóng button element
    );
    // Đóng JSX return statement
}
// Đóng ThemeToggle function component

/* 
🎯 COMPONENT ARCHITECTURE BREAKDOWN:

📊 COMPONENT TYPE: Presentational + Container Hybrid
- Presentational: Handles UI rendering và user interactions
- Container: Connected to global state via Context (không pure presentation)
- Best practice: Separate concerns nhưng practical cho simple components

🔄 STATE MANAGEMENT PATTERN:
- LOCAL STATE: None - component is stateless
- GLOBAL STATE: Consumes theme state từ ThemeContext
- STATE FLOW: Context → useTheme() → component props → JSX rendering

🎨 UI PATTERNS:
- Conditional Rendering: ternary operators cho dynamic content  
- Semantic HTML: button element với proper attributes
- CSS Classes: Separation of concerns (styling trong separate SCSS)
- Accessibility: title attribute cho better UX

⚡ PERFORMANCE CONSIDERATIONS:
- Re-render Triggers: Chỉ re-render khi ThemeContext changes
- Function Stability: toggleTheme function reference stable (no new functions mỗi render)
- Event Handler: Inline arrow function (acceptable cho simple handlers)
*/

/* 
🔄 COMPLETE COMPONENT LIFECYCLE & DATA FLOW:

📱 1. COMPONENT MOUNT (Initial Render):
   ├── React creates ThemeToggle component instance
   ├── useTheme() hook executes:
   │   ├── useContext(ThemeContext) looks up component tree
   │   ├── Finds nearest ThemeProvider ancestor  
   │   └── Returns Provider's current value: { theme, toggleTheme, isLight }
   ├── Console log: component render info với initial values
   └── JSX renders với initial theme state

🎨 2. UI RENDERING PHASE:
   ├── JSX evaluation với current theme values:
   │   ├── isLight=true → Icon: 🌙, Text: "Dark", Status: "(light)"
   │   └── isLight=false → Icon: ☀️, Text: "Light", Status: "(dark)"
   ├── CSS classes applied: "theme-toggle-btn", "theme-icon", etc.
   ├── Event handlers attached: onClick arrow function
   └── Accessibility attributes set: title tooltip

🖱️ 3. USER INTERACTION SEQUENCE:
   ├── User hovers → CSS :hover styles applied
   ├── User clicks button → onClick handler executes:
   │   ├── Console log: current theme before action
   │   ├── toggleTheme() called → Context action triggered
   │   └── Console log: confirmation action called
   └── Note: State update is ASYNC, UI hasn't changed yet

⚡ 4. CONTEXT STATE UPDATE (trong ThemeProvider):
   ├── toggleTheme() executes setTheme() với functional update
   ├── React schedules state update: 'light' ↔ 'dark'
   ├── Multiple useEffect triggers trong ThemeProvider:
   │   ├── localStorage.setItem() → persist new theme
   │   └── document.body.className → apply CSS theme class
   └── Context value object recreated với new theme

🔄 5. RE-RENDER CASCADE (Context Change Propagation):
   ├── ThemeProvider re-renders với new theme state
   ├── All Context consumers detect value change:
   │   ├── ThemeToggle component scheduled for re-render
   │   └── Any other components using useTheme() also re-render
   ├── useTheme() returns NEW values: { theme: 'dark', isLight: false, ... }
   └── Component re-executes với updated context values

🎨 6. UI UPDATE & CSS APPLICATION:
   ├── JSX re-evaluates với new theme values:
   │   ├── Icon switches: 🌙 ↔ ☀️
   │   ├── Text switches: "Dark" ↔ "Light"  
   │   └── Status updates: "(light)" ↔ "(dark)"
   ├── CSS theme class applied to body: "theme-light" ↔ "theme-dark"
   ├── CSS variables cascade through entire app
   └── Smooth transitions animate color changes

📊 PERFORMANCE & OPTIMIZATION ANALYSIS:

🔥 RENDER OPTIMIZATION:
- Component chỉ re-renders khi Context value thay đổi (not every parent render)
- Destructuring stable references: toggleTheme function reference không đổi
- No unnecessary re-renders: React's reconciliation skips unchanged elements

💾 MEMORY EFFICIENCY:  
- No local state: component doesn't hold any state internally
- Event handlers: inline arrow function acceptable cho simple interactions
- Context subscription: automatic cleanup khi component unmounts

🎯 REACT PATTERNS & BEST PRACTICES DEMONSTRATED:

✅ SEPARATION OF CONCERNS:
- Logic: ThemeContext handles state management
- UI: ThemeToggle handles presentation & user interaction
- Styling: CSS/SCSS handles visual appearance

✅ COMPOSITION OVER INHERITANCE:
- Component composes functionality từ useTheme hook
- No class inheritance, pure functional approach
- Easy to test, debug, và extend

✅ DECLARATIVE PROGRAMMING:
- UI describes WHAT should render, not HOW to manipulate DOM
- React handles DOM updates automatically
- Conditional rendering với ternary operators

✅ ACCESSIBILITY FIRST:
- Semantic HTML: button element với proper semantics
- Tooltips: title attribute provides context
- Keyboard accessible: button naturally focusable

🚀 ADVANCED CONCEPTS FOR FURTHER LEARNING:

🔧 PERFORMANCE OPTIMIZATIONS:
- React.memo() để prevent unnecessary re-renders
- useMemo() cho expensive computations
- useCallback() cho stable function references

🧪 TESTING STRATEGIES:
- Unit tests: mock useTheme hook, test rendering logic
- Integration tests: test với real ThemeProvider
- E2E tests: test full user interaction flow

� UI/UX ENHANCEMENTS:
- Loading states during theme transition
- Animation libraries (Framer Motion, React Spring)
- Advanced theming với CSS-in-JS libraries

🏗️ ARCHITECTURE EVOLUTION:
- Multiple themes: extend beyond light/dark
- Theme persistence: sync across tabs với BroadcastChannel
- Theme scheduling: automatic light/dark based on time
*/

// 📤 COMPONENT EXPORT
export default ThemeToggle;
// export default: ES6 module syntax để export component như default export
// Allows importing với custom name: import AnyName from './ThemeToggle'
// vs named export: export { ThemeToggle } → import { ThemeToggle } from './ThemeToggle'
//
// 🏗️ MODULE SYSTEM BENEFITS:
// - Code reusability: Component có thể được import vào bất kỳ file nào
// - Dependency management: Clear import/export relationships
// - Tree shaking: Bundlers có thể remove unused exports
// - Type checking: TypeScript có thể infer component type từ export

/* 
📚 LEARNING OUTCOMES - KẾT QUẢ HỌC TẬP:

🎯 REACT FUNDAMENTALS:
✅ Functional Components: Modern React component pattern
✅ Hooks Integration: useTheme() custom hook consumption  
✅ Context API: Global state management without prop drilling
✅ Event Handling: onClick synthetic events với proper patterns
✅ Conditional Rendering: Dynamic UI với ternary operators
✅ Component Lifecycle: Mount, render, re-render cycle

🏗️ ARCHITECTURE PATTERNS:
✅ Custom Hooks: Reusable stateful logic encapsulation
✅ Provider Pattern: Context-based dependency injection  
✅ Separation of Concerns: Logic vs UI vs Styling separation
✅ Declarative UI: Describe what UI should look like, not how to build it

💡 JAVASCRIPT CONCEPTS:
✅ ES6 Modules: import/export system
✅ Destructuring: Object property extraction
✅ Arrow Functions: Modern function syntax
✅ Template Literals: String interpolation với backticks
✅ Ternary Operators: Concise conditional expressions

🎨 UX/UI PRINCIPLES:
✅ Visual Feedback: Icons và text indicate next action
✅ Accessibility: Semantic HTML và tooltip attributes
✅ Intuitive Design: UI clearly communicates functionality
✅ Responsive Design: Component works across different contexts

🚀 NEXT STEPS FOR SKILL DEVELOPMENT:

1. 🧪 TESTING:
   - Write unit tests với Jest và React Testing Library
   - Mock useTheme hook để test different scenarios
   - Test accessibility với @testing-library/jest-dom

2. 🎨 STYLING:
   - Learn CSS-in-JS libraries (styled-components, emotion)
   - Advanced CSS animations và transitions
   - Responsive design patterns

3. 🔧 PERFORMANCE:
   - React DevTools để analyze component performance
   - useMemo và useCallback optimization patterns
   - Code splitting với React.lazy()

4. 🏗️ ARCHITECTURE:
   - State management libraries (Redux, Zustand)
   - Component composition patterns
   - Design systems và component libraries

5. 📱 ADVANCED FEATURES:
   - System theme detection với prefers-color-scheme
   - Theme persistence across browser tabs
   - Smooth theme transitions với CSS custom properties
*/