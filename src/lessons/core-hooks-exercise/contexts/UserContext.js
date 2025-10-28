// 📦 IMPORT CÁC REACT HOOKS CHO USER MANAGEMENT SYSTEM
import { createContext, useContext, useState, useEffect } from 'react';
// 🏗️ createContext: Factory function tạo Context object cho global state
//    - Giải quyết prop drilling cho user data (username, preferences)
//    - Return object với Provider và Consumer components
//    - Enable sharing user state across entire component tree
//
// 🎣 useContext: Hook consume Context value trong functional components
//    - Cleaner alternative to Context.Consumer render prop pattern
//    - Automatically subscribes component to context changes
//    - Triggers re-render when context value updates
//
// 📊 useState: Hook manage local state trong functional components
//    - Multiple useState calls cho different pieces of user state
//    - Each useState independent với own setter function
//    - Support complex state shapes (objects, arrays)
//
// 🔄 useEffect: Hook handle side effects ngoài React render cycle
//    - localStorage operations: save/load user data persistence
//    - Data synchronization: sync React state với external storage
//    - Cleanup operations: prevent memory leaks khi component unmounts

// 🏗️ TẠO USER CONTEXT - Global User State Container  
const UserContext = createContext();
// createContext(): Tạo Context object để manage user-related global state
// Return value: { Provider, Consumer, displayName, _currentValue, _defaultValue }
//
// 🎯 USER CONTEXT PURPOSE - Giải quyết User Data Management:
// ❌ PROP DRILLING PROBLEM cho user data:
//    App → Header → UserProfile (username prop)
//    App → Main → TaskList → TaskItem → UserBadge (username prop)  
//    App → Sidebar → Settings → UserPreferences (preferences prop)
//    → Phải pass user data through multiple intermediate components
//
// ✅ CONTEXT SOLUTION:
//    App(UserProvider) → any component can useUser() directly
//    Clean access to user data without passing props through layers
//
// 📦 USER CONTEXT WILL CONTAIN:
// - username: Current logged user name (string)
// - preferences: User settings object (showCompleted, sortBy, etc.)
// - setUsername: Function update username
// - updatePreferences: Function merge update preferences  
// - isConfigured: Boolean helper (has username or not)
// - Auto-save logic: Persist user data to localStorage
//
// 🔗 RELATIONSHIP với ThemeContext:
// - Independent contexts: User và Theme are separate concerns
// - Both can be consumed trong same component
// - Compose together với multiple Providers: <ThemeProvider><UserProvider>...

// 🧩 USERPROVIDER COMPONENT - Component wrapper cung cấp user data
export function UserProvider({ children }) {
    // { children }: Destructure props để lấy các component con
    // children = tất cả components được wrap bởi UserProvider

    // 📊 USER IDENTITY STATE - Who is the current user?
    const [username, setUsername] = useState('');
    // username: Current user identifier (string)
    // setUsername: State setter function để update username
    // '': Default empty string = "anonymous/not logged in" state
    //
    // 🔄 USERNAME LIFECYCLE:
    // 1. Initial: '' (empty) → User chưa identify themselves
    // 2. User inputs name → setUsername('John') → User identified  
    // 3. Persistence: Auto-saved to localStorage
    // 4. Restore: Loaded từ localStorage on app restart
    //
    // � DESIGN DECISIONS:
    // - Simple string instead of complex user object (YAGNI principle)
    // - Empty string = falsy → easy boolean checks (!!username)
    // - Could extend to object later: { id, name, email, avatar }

    // 📊 USER PREFERENCES STATE - How user wants app to behave?
    const [preferences, setPreferences] = useState({
        showCompleted: true,    // Boolean: Show completed tasks trong task list?
        sortBy: 'date'         // String: Task sorting criteria ('date', 'name', 'priority')
    });
    // preferences: Configuration object cho user-specific app behavior
    // setPreferences: State setter để update entire preferences object
    //
    // 🎯 PREFERENCES STRUCTURE DESIGN:
    // {
    //   showCompleted: boolean - Toggle visibility của completed tasks
    //   sortBy: string - Sorting algorithm cho task list display
    // }
    //
    // 🔄 PREFERENCES LIFECYCLE:
    // 1. Default: showCompleted=true, sortBy='date' (sensible defaults)
    // 2. User changes: Toggle shows/hides completed, changes sort order
    // 3. Auto-save: Every change persisted to localStorage
    // 4. Restore: User preferences maintained across browser sessions
    //
    // 🚀 EXTENSIBILITY - Easy to add more preferences:
    // - theme: 'light' | 'dark' (if not using separate ThemeContext)  
    // - language: 'en' | 'vi' | 'fr'
    // - notifications: boolean
    // - itemsPerPage: number
    // - defaultPriority: 'low' | 'medium' | 'high'

    // 🔄 SMART PREFERENCES UPDATE FUNCTION - Partial updates với merge logic
    const updatePreferences = (newPrefs) => {
        // newPrefs: Partial preferences object - chỉ chứa fields cần update
        // Type: Partial<PreferencesType> = { showCompleted?: boolean, sortBy?: string }
        //
        // 💡 FUNCTION DESIGN BENEFITS:
        // ✅ Partial updates: Chỉ update specific fields, không overwrite all
        // ✅ Immutable: Tạo new object, không mutate existing state  
        // ✅ Type safety: Easy to extend với new preference fields
        // ✅ Convenient API: updatePreferences({ showCompleted: false })
        //
        // 📖 USAGE EXAMPLES:
        // updatePreferences({ showCompleted: false })           → Only update showCompleted
        // updatePreferences({ sortBy: 'name' })                → Only update sortBy  
        // updatePreferences({ showCompleted: true, sortBy: 'priority' }) → Update both

        setPreferences(prev => ({ ...prev, ...newPrefs }));
        // 🔧 IMMUTABLE MERGE PATTERN - Safe state updates:
        // prev: Previous preferences state (guaranteed fresh từ React)
        // { ...prev }: Spread syntax - shallow copy all existing properties
        // { ...newPrefs }: Spread syntax - merge new properties
        // Result: New object = existing properties + new properties (new overrides existing)
        //
        // 🔄 MERGE ALGORITHM EXAMPLE:
        // prev = { showCompleted: true, sortBy: 'date' }
        // newPrefs = { showCompleted: false }
        // Result = { showCompleted: false, sortBy: 'date' }
        //
        // 🆚 ALTERNATIVE PATTERNS:
        // ❌ Direct mutation: prev.showCompleted = false (React won't detect change)
        // ❌ Full replacement: setPreferences(newPrefs) (loses other fields)  
        // ✅ Immutable merge: { ...prev, ...newPrefs } (safe partial update)
        //
        // ⚡ REACT RECONCILIATION:
        // New object reference → React detects state change → triggers re-render
        // All components consuming preferences get updated values
        // useEffect dependency [preferences] triggers → auto-save to localStorage
    };

    // 💾 AUTO-SAVE USER DATA - Persistence Layer cho User State
    useEffect(() => {
        // useEffect: Synchronization effect - sync React state với external system
        // Trigger: Runs after render completion when dependencies change

        // 📦 AGGREGATE USER DATA - Combine all user-related state
        const userData = { username, preferences };
        // userData: Complete user data object cho persistence
        // Centralized data structure: Easy to save/load as single unit
        // JSON-serializable: No functions, dates, or complex objects
        //
        // 🏗️ DATA STRUCTURE DESIGN:
        // {
        //   username: string,                    // User identity
        //   preferences: {                       // User settings
        //     showCompleted: boolean,
        //     sortBy: string
        //   }
        // }

        // 🗄️ PERSIST TO BROWSER STORAGE
        localStorage.setItem('userData', JSON.stringify(userData));
        // localStorage: Browser Web API - domain-specific persistent storage
        // setItem(key, value): Store key-value pair (both must be strings)
        // 'userData': Unique key identifier cho user data trong storage
        // JSON.stringify(userData): Serialize object → JSON string
        //
        // 📊 LOCALSTORAGE CHARACTERISTICS:
        // - Persistent: Data survives browser restarts, tab closures
        // - Synchronous: Blocking I/O operation (usually fast)
        // - Domain-isolated: Each website has separate storage namespace
        // - Storage limit: ~5-10MB per domain (varies by browser)
        // - String-only: Cannot directly store objects, arrays, functions
        //
        // 🔄 SERIALIZATION PROCESS:
        // JavaScript Object → JSON.stringify() → JSON String → localStorage
        // Example: { username: "John" } → '{"username":"John"}' → stored
        //
        // ⚠️ EDGE CASES HANDLED:
        // - Storage quota exceeded: Could add try-catch for error handling
        // - Private browsing: localStorage might be disabled
        // - Concurrent access: localStorage is synchronous per-tab
    }, [username, preferences]);
    // 📋 DEPENDENCY ARRAY: [username, preferences]
    // Effect re-runs only when these specific values change (not every render)
    // React shallow comparison: New array/object references trigger effect
    //
    // 🔄 AUTO-SAVE WORKFLOW:
    // 1. User changes username: setUsername() → username state updates
    // 2. Component re-renders với new username value
    // 3. useEffect detects username dependency changed → runs effect
    // 4. userData object created với new username + current preferences
    // 5. localStorage.setItem() saves new userData to browser storage
    // 6. Next app load → will restore this updated user data
    //
    // 🎯 PERFORMANCE CONSIDERATIONS:
    // - Runs only on actual changes: React dependency comparison prevents unnecessary saves
    // - Batched updates: React batches multiple state updates → single effect run
    // - Minimal serialization: Small data objects → fast JSON.stringify()
    // - Storage efficiency: Single localStorage key instead of multiple keys

    // 📱 LOAD USER DATA FROM STORAGE - Hydration từ Persistent Storage
    useEffect(() => {
        // useEffect với empty dependencies → Mount effect (runs once)
        // Purpose: Restore user state từ previous browser sessions
        // Timing: Runs after initial render, before user sees default state

        // 🔍 RETRIEVE PERSISTED DATA
        const savedData = localStorage.getItem('userData');
        // localStorage.getItem(): Browser API lấy stored string value
        // Return: JSON string nếu key exists, null nếu key not found
        // 'userData': Same key used trong save effect → consistent storage
        //
        // 🔄 DATA RETRIEVAL SCENARIOS:
        // - First time user: savedData = null (no previous data)
        // - Returning user: savedData = '{"username":"John","preferences":{...}}'
        // - Cleared storage: savedData = null (user/browser cleared data)

        if (savedData) {
            // Guard clause: Only process if we actually have saved data
            // Prevents JSON.parse() errors on null values
            // Early return pattern: Handle edge case first

            try {
                // 🔧 ERROR-SAFE DESERIALIZATION - Robust data parsing
                const { username: savedUsername, preferences: savedPrefs } = JSON.parse(savedData);
                // JSON.parse(): Convert JSON string back to JavaScript object
                // Destructuring assignment với renaming: Avoid variable name conflicts
                // savedUsername: Extracted username từ parsed object
                // savedPrefs: Extracted preferences từ parsed object
                //
                // 🎯 DESTRUCTURING BENEFITS:
                // ✅ Rename variables: Avoid shadowing state variables
                // ✅ Partial extraction: Only get needed properties
                // ✅ Default values: Could add defaults { username = '', preferences = {} }
                // ✅ Type safety: Clear variable names indicate data source
                //
                // 🔄 DESERIALIZATION PROCESS:
                // JSON String → JSON.parse() → JavaScript Object → Destructuring → Variables
                // '{"username":"John"}' → {username:"John"} → savedUsername="John"

                // 🔄 CONDITIONAL STATE RESTORATION - Smart state hydration
                if (savedUsername) {
                    // Guard: Only restore if savedUsername has truthy value
                    // Handles edge cases: null, undefined, empty string
                    setUsername(savedUsername);
                    // Restore username state từ persisted data
                    // Triggers re-render với restored username
                }

                if (savedPrefs) {
                    // Guard: Only restore if savedPrefs is valid object
                    // Prevents setting null/undefined as preferences
                    setPreferences(savedPrefs);
                    // Restore preferences state từ persisted data
                    // Triggers re-render với restored user preferences
                    //
                    // 📊 PREFERENCES VALIDATION:
                    // Could add schema validation here:
                    // - Check required fields: showCompleted, sortBy
                    // - Validate types: boolean, string enums
                    // - Handle migration: Add new fields với defaults
                }

            } catch (error) {
                // 🛡️ ERROR HANDLING - Graceful degradation
                console.error('Failed to parse saved user data:', error);
                // Log error cho debugging nhưng don't crash app
                // Possible causes: Corrupted localStorage, invalid JSON, schema changes
                //
                // 🔄 RECOVERY STRATEGIES:
                // 1. Continue với default state (current approach)
                // 2. Clear corrupted data: localStorage.removeItem('userData')
                // 3. Attempt data migration: Transform old format to new format
                // 4. Show user notification: "Settings restored to defaults"
            }
        }
        // No saved data: Continue với default state values
        // First-time users will see default empty username và default preferences
    }, []);
    // 📋 EMPTY DEPENDENCY ARRAY: []
    // Effect runs exactly once after component mount (not on re-renders)
    // Perfect cho data initialization/hydration operations
    //
    // 🎯 MOUNT EFFECT PATTERN:
    // - Load configuration data
    // - Initialize external libraries  
    // - Subscribe to external data sources
    // - Restore state từ persistent storage
    //
    // ⚡ PERFORMANCE BENEFITS:
    // - Runs once: No repeated localStorage reads
    // - Early execution: Restores state before user interaction
    // - Non-blocking: Async operation không block initial render

    // 📦 CONTEXT VALUE API - Complete User Interface cho Child Components
    const value = {
        // 🎯 CORE USER DATA - Primary state values
        username,              // Current user identity (string: '' | 'username')
        preferences,           // User configuration object { showCompleted, sortBy }

        // ⚡ STATE MUTATORS - Functions để modify user state
        setUsername,           // Direct username setter: setUsername('newName')
        updatePreferences,     // Smart preferences merger: updatePreferences({ field: value })

        // 🔧 COMPUTED HELPERS - Derived values cho convenience
        isConfigured: !!username  // Boolean flag: user has identified themselves?
    };
    // 🏗️ VALUE OBJECT DESIGN PRINCIPLES:
    // 1. Complete API: All user-related data và operations trong single object
    // 2. Consistent naming: Clear, descriptive property names
    // 3. Mixed types: Primitive values, objects, functions, computed values
    // 4. Stable references: Functions don't change between renders
    // 5. Convenience helpers: Computed values để avoid repetitive logic
    //
    // 💡 USAGE PATTERNS trong child components:
    // const { username, isConfigured } = useUser();           // Get identity data
    // const { preferences, updatePreferences } = useUser();   // Get settings API
    // const { setUsername } = useUser();                      // Get username setter
    //
    // 🔧 COMPUTED VALUE EXPLANATION: !!username
    // Double negation: Convert any value to boolean
    // Step 1: !username → true nếu username falsy, false nếu truthy
    // Step 2: !!username → false nếu username falsy, true nếu truthy
    //
    // 📊 BOOLEAN CONVERSION EXAMPLES:
    // !!'' → false (empty string = user not configured)
    // !!'John' → true (non-empty string = user configured)
    // !!null → false, !!undefined → false, !!0 → false
    //
    // 🎯 isConfigured USAGE BENEFITS:
    // ✅ Clean conditionals: if (isConfigured) { ... }
    // ❌ Verbose checks: if (username && username.length > 0) { ... }
    // ✅ Semantic meaning: isConfigured vs !!username
    // ✅ Easy guards: return !isConfigured ? <WelcomeForm /> : <UserDashboard />
    //
    // 🚀 EXTENSIBILITY - Easy to add more computed values:
    // hasPreferences: Object.keys(preferences).length > 0
    // isFirstTime: !isConfigured && !localStorage.getItem('hasVisited')
    // displayName: username || 'Anonymous User'
    // preferenceCount: Object.keys(preferences).length

    // 🌐 CONTEXT PROVIDER RENDERING - Distribute User State to Component Tree
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
    // 🏗️ PROVIDER COMPONENT PATTERN:
    // <UserContext.Provider>: Special component từ createContext()
    // value={value}: Prop chứa all data/functions cần share
    // {children}: React children prop - nested component tree
    //
    // 🔄 PROVIDER TREE ARCHITECTURE:
    // <UserProvider>                    ← This Provider component
    //   <ThemeProvider>                 ← Could nest other providers  
    //     <App>                         ← Application root
    //       <Header>                    ← Can useUser() for username display
    //         <UserProfile />           ← Can useUser() for full user data
    //       </Header>
    //       <Main>
    //         <TaskList />              ← Can useUser() for preferences
    //         <UserSettings />          ← Can useUser() for configuration
    //       </Main>
    //     </App>
    //   </ThemeProvider>
    // </UserProvider>
    //
    // 💡 CONTEXT CONSUMPTION FLOW:
    // 1. Child component calls useUser() hook
    // 2. useContext() traverses up component tree
    // 3. Finds nearest UserContext.Provider (this one)
    // 4. Returns current value prop (our value object)
    // 5. Component automatically re-renders when value changes
    //
    // 🔄 RE-RENDER CASCADE:
    // Username/preferences change → UserProvider re-renders → value object recreated
    // → All consuming components detect context change → re-render với new values
    // → UI updates reflect new user state across entire app
    //
    // 🎯 PROVIDER COMPOSITION BENEFITS:
    // - Clean separation: User concerns isolated trong this provider
    // - Reusable: Provider can wrap different app structures  
    // - Testable: Easy to provide mock values trong tests
    // - Scalable: Multiple providers can be composed together
}

// 🎣 CUSTOM HOOK - Safe User Context Consumer với Validation
export function useUser() {
    // 🏗️ CUSTOM HOOK PATTERN: Encapsulate context consumption logic
    // Benefits: Error handling, type safety, consistent API, developer experience
    // Pattern: useContext + validation + error boundary

    // 📡 CONTEXT VALUE CONSUMPTION
    const context = useContext(UserContext);
    // useContext(UserContext): React hook access nearest Provider value
    // Return: value object từ nearest UserProvider trong component tree
    // Return: undefined nếu no Provider found trong ancestor chain
    //
    // 🔍 CONTEXT RESOLUTION PROCESS:
    // 1. React starts từ calling component position trong tree
    // 2. Traverses UP parent chain looking for UserContext.Provider
    // 3. Returns value prop của first matching Provider found
    // 4. Returns createContext() default value (undefined) nếu no Provider
    //
    // 🎯 PROVIDER LOOKUP EXAMPLES:
    // ✅ Valid: <UserProvider><SomeComponent useUser() /></UserProvider>
    // ❌ Invalid: <SomeComponent useUser() /> (no Provider ancestor)
    // ✅ Nested: <UserProvider><div><div><Component useUser() /></div></div></UserProvider>

    // 🛡️ DEVELOPER EXPERIENCE - Fail Fast Error Boundary
    if (context === undefined) {
        // Guard clause: Validate context before returning
        // context === undefined: Component is outside Provider tree

        throw new Error('useUser must be used within a UserProvider');
        // throw Error: Immediately crash app với descriptive message
        // "Fail fast" philosophy: Detect configuration errors early
        // Clear error message: Developer knows exactly what to fix
        //
        // 🎯 ERROR HANDLING PHILOSOPHY:
        // ❌ Silent failure: return null/default → Hidden bugs, hard to debug
        // ❌ Console warning: Easy to miss, app continues với broken state
        // ✅ Throw error: Impossible to ignore, forces correct usage
        //
        // 🔧 ERROR RECOVERY:
        // Developer sees error → wraps component với UserProvider → error resolved
        // React Error Boundaries có thể catch này và show fallback UI
    }

    // ✅ RETURN VALIDATED CONTEXT
    return context;
    // Return: { username, preferences, setUsername, updatePreferences, isConfigured }
    // Type guaranteed: context definitely not undefined at this point
    // Auto-completion: IDE can provide full type information
    //
    // 💡 RETURN VALUE USAGE PATTERNS:
    // const user = useUser();                              // Get full context
    // const { username } = useUser();                      // Destructure specific values  
    // const { preferences, updatePreferences } = useUser(); // Get settings API
    // const { isConfigured, setUsername } = useUser();     // Get identity API
}

/* 
🎯 CUSTOM HOOK BENEFITS - Why not just useContext directly?

1. 🛡️ ERROR PREVENTION: Automatic validation prevents runtime errors
2. 🔒 ENCAPSULATION: Hide useContext complexity, provide clean API
3. 🔄 CONSISTENCY: Same consumption pattern across all components  
4. 📚 SELF-DOCUMENTING: Hook name clearly indicates what context it accesses
5. 🧪 TESTABILITY: Easy to mock useUser trong component tests
6. 🚀 EXTENSIBILITY: Can add logging, analytics, performance monitoring
7. 💡 DEVELOPER EXPERIENCE: Better error messages, IDE support

📖 USAGE EXAMPLES trong components:

// ✅ CORRECT: Inside UserProvider tree
// function UserProfile() {
//     const { username, isConfigured, setUsername } = useUser();
//     
//     if (!isConfigured) {
//         return <input onChange={e => setUsername(e.target.value)} />;
//     }
//     
//     return <h1>Welcome, {username}!</h1>;
// }

// ✅ CORRECT: Accessing preferences
// function TaskList() {
//     const { preferences, updatePreferences } = useUser();
//     const { showCompleted, sortBy } = preferences;
//     
//     return (
//         <div>
//             <button onClick={() => updatePreferences({ showCompleted: !showCompleted })}>
//                 {showCompleted ? 'Hide' : 'Show'} Completed
//             </button>
//             Task list with filtering based on preferences
//         </div>
//     );
// }

// ❌ INCORRECT: Outside UserProvider (will throw error)
// function BrokenComponent() {
//     const { username } = useUser(); // → Error: useUser must be used within UserProvider
//     return <div>{username}</div>;
// }

🔄 CONTEXT + HOOK ECOSYSTEM:
- ThemeContext + useTheme() → Theme management
- UserContext + useUser() → User data management  
- AuthContext + useAuth() → Authentication state
- NotificationContext + useNotifications() → App notifications
- Each hook provides domain-specific API với consistent patterns
*/