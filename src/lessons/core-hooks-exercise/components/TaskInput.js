// 📝 TASK INPUT COMPONENT - Controlled Form Component với Advanced Features
import React, { useState } from 'react';
// React: Core library cho functional components
// useState: Hook quản lý local state - multiple state variables cho form functionality

// 🏗️ FUNCTIONAL COMPONENT với PROPS INTERFACE
function TaskInput({ onAddTask }) {
    // { onAddTask }: Destructure props để lấy callback function từ parent
    // onAddTask: Function prop - parent component's handler để add new task
    // Props pattern: Child component receives functions từ parent để communicate up
    // Type signature: onAddTask: (taskText: string) => Promise<void> | void

    // 📊 MULTI-STATE MANAGEMENT - Local Component State
    const [inputValue, setInputValue] = useState('');
    // inputValue: Current text trong input field (controlled component pattern)
    // setInputValue: State setter để update input value
    // '': Initial empty string - clean form state
    // Controlled component: React state controls input value (not DOM)

    const [isLoading, setIsLoading] = useState(false);
    // isLoading: Boolean flag cho async operation status
    // setIsLoading: Toggle loading state during task creation
    // false: Initial not-loading state
    // Loading states: Prevent double-submission, provide user feedback

    const [error, setError] = useState('');
    // error: Current validation/operation error message (string)
    // setError: Set error message để display to user
    // '': Initial no-error state (empty string = falsy = no error)
    // Error state: User feedback, form validation, operation failures

    // 📝 COMPREHENSIVE INPUT VALIDATION - Multi-Rule Validation System
    const validateInput = (value) => {
        // value: Input string cần validate (có thể chứa whitespace)
        // Return: Error message string nếu invalid, null nếu valid
        // Pure function: No side effects, predictable output cho same input

        // 🔍 RULE 1: EMPTY INPUT PREVENTION
        if (!value.trim()) {
            // !value.trim(): Check if trimmed string is falsy
            // value.trim(): Remove whitespace từ đầu và cuối string
            // Empty string after trim = user chỉ nhập spaces/tabs/newlines
            return 'Task không được để trống';
            // Early return pattern: Exit function ngay khi find first error
        }

        // 🔍 RULE 2: MINIMUM LENGTH REQUIREMENT  
        if (value.trim().length < 3) {
            // Meaningful content requirement: Prevent overly short tasks
            // "Hi" → too short, "Buy milk" → acceptable
            // UX consideration: Balance between flexibility và meaningful content
            return 'Task phải có ít nhất 3 ký tự';
        }

        // 🔍 RULE 3: SECURITY - DANGEROUS CHARACTER FILTERING
        const invalidChars = /[<>{}[\]\\]/g;
        // RegExp: Regular expression cho pattern matching
        // [<>{}[\]\\]: Character class - match any of these characters
        // /g: Global flag - find all matches, not just first
        // Escaping: \\ = literal backslash, \[ \] = literal brackets
        // Security concern: Prevent potential XSS, template injection

        if (invalidChars.test(value)) {
            // .test(): RegExp method - return true nếu pattern matches
            // Check entire input string cho forbidden characters
            return 'Task không được chứa ký tự đặc biệt: < > { } [ ] \\';
            // User-friendly error: Show which characters are forbidden
        }

        // 🔍 RULE 4: WHITESPACE-ONLY PREVENTION (Redundant but explicit)
        if (value.trim().length === 0) {
            // This check is actually redundant với rule 1 (!value.trim())
            // But kept for explicit clarity và potential future modifications
            // Could be removed for simplification
            return 'Task không được chỉ có khoảng trắng';
        }

        // 🔍 RULE 5: MAXIMUM LENGTH CONSTRAINT
        if (value.trim().length > 100) {
            // Prevent overly long tasks - UX và storage considerations
            // 100 characters: Balance between expressiveness và conciseness  
            // Database consideration: VARCHAR field limits
            // UI consideration: Display trong limited space
            return 'Task không được vượt quá 100 ký tự';
        }

        // ✅ VALIDATION PASSED
        return null;
        // null return: Conventional way để indicate "no error"
        // Falsy value: Easy to check with if (error) { ... }
        // Alternative: return { isValid: true } object pattern
    };

    // 🚀 FORM SUBMISSION HANDLER - Comprehensive Async Form Processing
    const handleSubmit = async (e) => {
        // e: SyntheticEvent object từ React (wrapper around native DOM event)
        // async: Function returns Promise - enables await syntax
        // Event handler pattern: Function triggered by user interaction

        // 🛡️ PREVENT DEFAULT FORM BEHAVIOR
        e.preventDefault();
        // preventDefault(): Stop browser's default form submission behavior
        // Default behavior: Page reload, HTTP POST request  
        // SPA behavior: Handle submission trong JavaScript, không reload page
        // Essential cho React forms: Maintain client-side state

        // ✅ CLIENT-SIDE VALIDATION - Pre-submission Check
        const validationError = validateInput(inputValue);
        // Call validation function với current input value
        // Return: Error message string hoặc null
        // Client-side validation: Immediate feedback, no server round-trip

        if (validationError) {
            // Guard clause: Stop execution nếu validation fails
            setError(validationError);
            // Update error state → triggers re-render → shows error message
            return;
            // Early return: Exit function, don't proceed với submission
            // User sees error message, can fix input và try again
        }

        // ⏳ LOADING STATE ACTIVATION - UI Feedback Setup
        setIsLoading(true);
        // Set loading flag → triggers re-render → shows loading spinner
        // Prevents double-submission: Button becomes disabled
        // User feedback: Visual indication that operation is in progress

        setError('');
        // Clear any previous error messages
        // Clean state: Don't show old errors during new operation
        // UX improvement: Clean slate cho new attempt

        try {
            // 🔄 TRY BLOCK - Main Operation với Error Handling

            // 📤 DELEGATE TO PARENT - Component Communication
            await onAddTask(inputValue.trim());
            // onAddTask: Callback function prop từ parent component
            // inputValue.trim(): Send cleaned input (no leading/trailing spaces)
            // await: Wait for async operation to complete (if onAddTask returns Promise)
            // Parent responsibility: Add task to global state, API calls, etc.
            //
            // 🔄 COMPONENT COMMUNICATION PATTERN:
            // Child (TaskInput) → Parent (TaskManager/App) via callback props
            // Child handles: UI, validation, loading states, user interaction
            // Parent handles: Business logic, state management, data persistence

            // ✅ SUCCESS STATE - Operation Completed Successfully  
            setInputValue('');
            // Clear input field: Ready for next task input
            // UX pattern: Clean form after successful submission
            // User can immediately start typing new task

        } catch (err) {
            // 🚨 ERROR HANDLING - Operation Failed
            // catch: Handles any errors thrown by onAddTask()
            // err: Error object với details about what went wrong

            setError('Không thể thêm task. Vui lòng thử lại.');
            // Set user-friendly error message
            // Generic message: Don't expose technical details to user
            // Actionable message: Suggests what user can do (try again)

            console.error('Add task error:', err);
            // Log technical details cho developer debugging
            // console.error: Higher priority than console.log
            // Development tool: Helps diagnose issues trong development

        } finally {
            // 🔄 CLEANUP BLOCK - Always Executes
            // finally: Runs regardless of try/catch outcome
            // Cleanup operations: Reset states, clear timers, etc.

            setIsLoading(false);
            // Reset loading state: Re-enable form interactions
            // Always executes: Whether success hoặc error occurred
            // UI consistency: Button returns to normal state
        }
    };

    // ⌨️ KEYBOARD INTERACTION HANDLER - Enhanced User Experience
    const handleKeyPress = (e) => {
        // e: KeyboardEvent object chứa information về key pressed
        // Event handler: Responds to keyboard input beyond just typing
        // UX enhancement: Keyboard shortcuts, immediate feedback

        // 🚀 ENTER KEY SUBMISSION - Quick Submit Shortcut
        if (e.key === 'Enter') {
            // e.key: String representation của key pressed
            // 'Enter': Standard key identifier cho Enter/Return key
            // Alternative check: e.keyCode === 13 (deprecated)
            // Alternative check: e.which === 13 (legacy)

            handleSubmit(e);
            // Trigger same submission logic như button click
            // Pass event object: handleSubmit needs e.preventDefault()
            // UX benefit: Users can submit without reaching cho button
            // Common pattern: Forms submitted với Enter key
        }

        // 🧹 REAL-TIME ERROR CLEARING - Immediate Feedback Reset  
        if (error) {
            // Check if there's currently an error message showing
            // error: Current error state (string hoặc empty string)
            // Falsy check: Empty string = no error, non-empty = has error

            setError('');
            // Clear error message immediately when user starts typing
            // UX improvement: Don't show stale error during correction
            // Real-time feedback: Error disappears as soon as user acts
            // Alternative trigger: Could also clear trong onChange handler
            //
            // 🎯 USER EXPERIENCE FLOW:
            // 1. User submits invalid input → Error message shows
            // 2. User starts typing correction → Error message disappears  
            // 3. User submits again → Fresh validation, clean state
        }
    };

    // 📊 CHARACTER COUNT CALCULATION - Real-time Input Metrics
    const maxLength = 100;
    // maxLength: Maximum allowed characters cho task input
    // Constant value: Matches validation rule cho consistency
    // Could be moved to config file hoặc prop cho reusability

    const remainingChars = maxLength - inputValue.length;
    // remainingChars: How many more characters user can type
    // Real-time calculation: Updates with every keystroke
    // inputValue.length: Current character count (includes spaces, special chars)
    // Math: 100 - 25 = 75 characters remaining
    //
    // 🎯 USER FEEDBACK PURPOSES:
    // - Show remaining space before hitting limit
    // - Visual warning when approaching limit (remainingChars < 10)
    // - Prevent user surprise when hitting maxLength limit
    // - Professional form UX pattern

    // 🖼️ JSX RENDER - Component UI Structure
    return (
        <div className="task-input-container">
            {/* � MAIN CONTAINER - Top-level component wrapper */}
            {/* className: CSS class cho component styling và layout */}

            {/* �📝 SEMANTIC FORM ELEMENT - Proper HTML Form Structure */}
            <form onSubmit={handleSubmit} className="task-input-form">
                {/* form: Semantic HTML element cho user input collection */}
                {/* onSubmit: React event handler - triggers when form submitted */}
                {/* handleSubmit: Function called on submit (button click hoặc Enter key) */}
                {/* className: CSS class cho form-specific styling */}

                <div className="input-wrapper">
                    {/* � INPUT WRAPPER - Container cho input field và button */}
                    {/* Layout helper: Flexbox hoặc grid positioning */}

                    {/* 📝 CONTROLLED INPUT COMPONENT - React-Managed Input */}
                    <input
                        // 🎯 INPUT TYPE & BASIC ATTRIBUTES
                        type="text"
                        // type="text": Standard single-line text input
                        // Alternative: "search", "email", etc. cho different behaviors

                        // 🔄 CONTROLLED COMPONENT PATTERN - React State Management
                        value={inputValue}
                        // value: Current input value từ React state (not DOM)
                        // Controlled component: React controls value, not browser
                        // Single source of truth: inputValue state is authoritative

                        onChange={(e) => setInputValue(e.target.value)}
                        // onChange: Event handler triggered mỗi keystroke
                        // e: SyntheticEvent với target property
                        // e.target.value: Current input value từ DOM element
                        // setInputValue: Update React state với new value
                        // Arrow function: Inline event handler
                        //
                        // 🔄 CONTROLLED COMPONENT FLOW:
                        // 1. User types → onChange triggered → e.target.value = new input
                        // 2. setInputValue(newValue) → inputValue state updates
                        // 3. Component re-renders → value={inputValue} syncs DOM
                        // 4. Input shows updated value → cycle complete

                        // ⌨️ KEYBOARD EVENT HANDLING
                        onKeyPress={handleKeyPress}
                        // onKeyPress: Event handler cho keyboard interactions
                        // handleKeyPress: Function handles Enter key submission + error clearing
                        // Enhanced UX: Keyboard shortcuts, immediate feedback

                        // 🎨 USER EXPERIENCE ATTRIBUTES
                        placeholder="Nhập task mới..."
                        // placeholder: Hint text shown when input is empty
                        // Vietnamese text: Localized user interface
                        // UX guidance: Shows user what to do

                        // 🔒 LOADING STATE HANDLING
                        disabled={isLoading}
                        // disabled: Boolean - prevents interaction during async operations
                        // isLoading state: True during task submission
                        // Prevents: Double-submission, user confusion during processing

                        // 📏 INPUT CONSTRAINTS
                        maxLength={maxLength}
                        // maxLength: Browser-enforced character limit
                        // Matches validation rule: Consistent constraint enforcement
                        // Browser fallback: Even if JS validation fails

                        // 🎨 DYNAMIC STYLING - State-Based CSS Classes
                        className={`task-input ${error ? 'error' : ''}`}
                        // Template literal: Combine base class với conditional classes
                        // Base class: "task-input" - standard input styling
                        // Conditional class: "error" added when error state exists
                        // CSS can style .task-input.error differently (red border, etc.)
                        // Dynamic UI: Visual feedback based on component state

                        // 🎯 ACCESSIBILITY & UX
                        autoFocus
                    // autoFocus: Automatically focus input when component mounts
                    // UX improvement: User can start typing immediately
                    // Accessibility consideration: Screen readers announce focused element
                    // Use carefully: Don't interfere với user navigation
                    />

                    {/* 🚀 SUBMIT BUTTON - Form Action Trigger */}
                    <button
                        // 🎯 BUTTON TYPE & BEHAVIOR
                        type="submit"
                        // type="submit": Button triggers form onSubmit event
                        // Form association: Button connected to parent form element
                        // Alternative: type="button" với onClick handler
                        // Semantic HTML: Proper form submission behavior

                        // 🔒 SMART DISABLE LOGIC - Prevent Invalid Submissions
                        disabled={isLoading || !inputValue.trim()}
                        // Compound boolean condition: Disable trong multiple scenarios
                        // isLoading: Prevent double-submission during async operation
                        // !inputValue.trim(): Prevent empty/whitespace-only submissions
                        // Logical OR: Button disabled if EITHER condition is true
                        //
                        // 🔄 DISABLE STATE SCENARIOS:
                        // 1. isLoading=true: User clicked, operation in progress
                        // 2. inputValue='': User hasn't typed anything
                        // 3. inputValue='   ': User typed only spaces
                        // 4. Both conditions: Loading AND empty input

                        // 🎨 CSS STYLING
                        className="add-task-btn"
                    // CSS class cho button styling
                    // Can include :disabled pseudo-class styles
                    // Visual feedback: Disabled button looks different
                    >
                        {/* 🔄 CONDITIONAL BUTTON CONTENT - Dynamic UI Based on State */}
                        {isLoading ? (
                            // LOADING STATE: Show spinner during async operation
                            <span className="loading-spinner">⏳</span>
                            // Emoji spinner: Visual feedback that operation is in progress
                            // Could be replaced với CSS animation hoặc SVG spinner
                            // className: CSS class để animate spinner if needed
                        ) : (
                            // NORMAL STATE: Show standard button text với icon
                            <span>➕ Thêm</span>
                            // ➕: Plus emoji indicates "add" action
                            // "Thêm": Vietnamese text cho "Add"
                            // Clear action indication: User knows what button does
                        )}
                        {/* 
                        🎯 CONDITIONAL RENDERING PATTERN:
                        - Ternary operator: condition ? trueValue : falseValue
                        - State-driven UI: Button content changes based on component state
                        - User feedback: Loading spinner shows operation in progress
                        - Accessibility: Screen readers can announce state changes
                        */}
                    </button>
                </div>
                {/* Đóng input-wrapper container */}

                {/* 📊 CHARACTER COUNT DISPLAY - Real-time Input Metrics */}
                <div className="input-meta">
                    {/* 📦 META INFORMATION CONTAINER - Secondary form information */}
                    {/* className: CSS class cho metadata styling (smaller text, muted colors) */}

                    <span className={`char-count ${remainingChars < 10 ? 'warning' : ''}`}>
                        {/* 🔢 DYNAMIC CHARACTER COUNTER - Live Input Feedback */}
                        {/* Template literal className: Combine base với conditional classes */}
                        {/* Base class: "char-count" - normal counter styling */}
                        {/* Conditional class: "warning" when remainingChars < 10 */}
                        {/* Warning threshold: Alert user when approaching limit */}
                        {/* CSS styling: .warning class can use orange/red colors */}

                        {remainingChars}/{maxLength}
                        {/* Display format: "remaining/total" (e.g., "75/100") */}
                        {/* Real-time update: Changes với every keystroke */}
                        {/* User guidance: Shows available space before hitting limit */}
                        {/* Professional UX: Common pattern trong modern forms */}
                    </span>
                </div>

                {/* ❌ ERROR MESSAGE DISPLAY - Conditional Error Feedback */}
                {error && (
                    // Conditional rendering: Only show error when error state exists
                    // error: Truthy string = show message, empty string = hide
                    // Short-circuit evaluation: error && <Component> pattern

                    <div className="error-message">
                        {/* 🚨 ERROR MESSAGE CONTAINER - User Feedback Display */}
                        {/* className: CSS class cho error styling (red colors, borders) */}

                        ⚠️ {error}
                        {/* ⚠️: Warning emoji - visual error indicator */}
                        {/* {error}: Dynamic error message từ validation hoặc operation failure */}
                        {/* User-friendly messages: Clear, actionable feedback */}
                        {/* 
                        📝 ERROR MESSAGE EXAMPLES:
                        - "Task không được để trống"
                        - "Task phải có ít nhất 3 ký tự"  
                        - "Không thể thêm task. Vui lòng thử lại."
                        */}
                    </div>
                )}
                {/* 
                🎯 CONDITIONAL RENDERING BENEFITS:
                - Clean UI: Error messages only appear when needed
                - State-driven: UI reflects current component state
                - Performance: DOM elements only created when necessary
                - Accessibility: Screen readers only announce relevant content
                */}
            </form>
            {/* Đóng form element */}
        </div>
        // {/* Đóng task-input-container */}
    );
}
// Đóng TaskInput function component

// 📤 COMPONENT EXPORT - Module System Integration
export default TaskInput;
// export default: ES6 module syntax cho default export
// TaskInput: Component function name được exported
// Allows importing với custom name: import AnyName from './TaskInput'
// Module pattern: Encapsulated component logic trong reusable module

/* 
🎯 COMPONENT ARCHITECTURE SUMMARY:

📊 STATE MANAGEMENT PATTERN:
- Multiple useState hooks: Each piece of state has dedicated hook
- inputValue: Controlled component state (form data)
- isLoading: UI state (async operation feedback)  
- error: User feedback state (validation và operation errors)
- Independent states: Each can update without affecting others

🔄 EVENT HANDLING STRATEGY:
- handleSubmit: Form submission với comprehensive async handling
- handleKeyPress: Keyboard shortcuts và real-time error clearing
- onChange: Controlled component input value updates
- Event delegation: Form onSubmit captures button clicks và Enter key

✅ VALIDATION ARCHITECTURE:
- validateInput: Pure function với multiple validation rules
- Client-side validation: Immediate feedback without server round-trip
- Comprehensive rules: Empty, length, characters, security considerations
- User-friendly messages: Clear, actionable error descriptions

⚡ ASYNC OPERATION HANDLING:
- Loading states: Prevent double-submission, provide user feedback
- Error handling: try-catch với user-friendly error messages
- Finally cleanup: Always reset loading state regardless of outcome
- Promise-based: Compatible với async/await parent functions

🎨 USER EXPERIENCE FEATURES:
- Real-time character counting: Progress feedback jako user types
- Dynamic button states: Visual feedback cho form validity
- Conditional styling: Error states change visual appearance
- Keyboard shortcuts: Enter key submission cho power users
- Loading feedback: Spinner indicates operation trong progress

🏗️ COMPONENT COMMUNICATION:
- Props interface: onAddTask callback cho parent communication
- Controlled component: Parent can control input value if needed
- Event bubbling: Form submission integrates với parent form handling
- Error boundaries: Component errors can be caught by parent

🔒 SECURITY CONSIDERATIONS:
- Input validation: Prevent dangerous characters, length limits
- XSS prevention: Character filtering cho template injection
- Client-side validation: First line of defense (server validation still needed)
- Sanitization: trim() removes potentially problematic whitespace

📱 ACCESSIBILITY FEATURES:
- Semantic HTML: form, input, button elements với proper roles
- autoFocus: Immediate keyboard access cho screen readers
- Error announcements: Dynamic error messages announced by screen readers
- Keyboard navigation: Full functionality available without mouse

🚀 PERFORMANCE CONSIDERATIONS:
- Controlled components: Efficient React reconciliation
- Event handlers: Inline functions acceptable cho simple components
- Conditional rendering: DOM elements only created when needed
- State updates: React batches multiple setState calls

🔧 EXTENSIBILITY & MAINTENANCE:
- Pure functions: validateInput easy to test và modify
- Modular structure: Each concern separated into distinct functions
- CSS classes: Styling separated từ logic
- Configuration: maxLength và validation rules easy to modify
- Type safety: Clear prop interfaces và consistent patterns
*/

/* 
🎯 CÁCH SỬ DỤNG:

// Trong parent component:
const handleAddTask = async (taskText) => {
    // TODO: Thêm task vào state
    console.log('Adding task:', taskText);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add to tasks array
    setTasks(prevTasks => [
        ...prevTasks,
        {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date()
        }
    ]);
};

// Usage:
<TaskInput onAddTask={handleAddTask} />

📚 KIẾN THỨC SỬ DỤNG:
✅ useState - Multiple state variables
✅ Form handling - onSubmit, preventDefault
✅ Input controlled components - value, onChange
✅ Event handling - onKeyPress, onClick
✅ Conditional rendering - Loading, error states
✅ Props - Callback functions
✅ Async/await - Handle async operations
✅ Form validation - Input validation
✅ CSS classes - Dynamic className

🎨 CSS CLASSES CẦN STYLE:
- .task-input-container
- .task-input-form  
- .input-wrapper
- .task-input
- .task-input.error
- .add-task-btn
- .add-task-btn:disabled
- .loading-spinner
- .input-meta
- .char-count
- .char-count.warning
- .error-message
*/
