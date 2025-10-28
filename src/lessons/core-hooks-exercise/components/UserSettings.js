// ⚙️ USERSETTINGS COMPONENT - Cài đặt chi tiết cho user
import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';

/**
 * 🎯 COMPONENT MỤC ĐÍCH:
 * - Cài đặt chi tiết user profile
 * - Theme và UI preferences
 * - Data management (export/import/reset)
 * - Advanced productivity settings
 */

const UserSettings = () => {
    const { username, preferences, setUsername, updatePreferences } = useUser();
    const { theme, toggleTheme } = useTheme();

    // 📝 LOCAL FORM STATE
    const [formData, setFormData] = useState({
        name: username || '',
        email: preferences.email || '',
        avatar: preferences.avatar || ''
    }); const [isEditing, setIsEditing] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    console.log('⚙️ RENDER - UserSettings');

    // 💾 SAVE USER PROFILE
    const handleSaveProfile = () => {
        setUsername(formData.name.trim());
        updatePreferences({
            email: formData.email.trim(),
            avatar: formData.avatar
        });
        setIsEditing(false);
    };

    // ❌ CANCEL EDIT
    const handleCancelEdit = () => {
        setFormData({
            name: username || '',
            email: preferences.email || '',
            avatar: preferences.avatar || ''
        });
        setIsEditing(false);
    };

    // 🔄 RESET USER DATA
    const handleResetUser = () => {
        setUsername('');
        updatePreferences({
            showCompleted: true,
            sortBy: 'date',
            email: '',
            avatar: ''
        });
        setShowResetConfirm(false);
        setIsEditing(false);
    };

    // 📤 EXPORT USER DATA
    const handleExportData = () => {
        const dataToExport = {
            username,
            preferences,
            theme,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob(
            [JSON.stringify(dataToExport, null, 2)],
            { type: 'application/json' }
        );

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `task-manager-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 📥 IMPORT USER DATA
    const handleImportData = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (importedData.username) {
                    setUsername(importedData.username);
                }
                if (importedData.preferences) {
                    updatePreferences(importedData.preferences);
                }
                alert('✅ Import dữ liệu thành công!');
            } catch (error) {
                alert('❌ Lỗi import dữ liệu. File không hợp lệ.');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="user-settings">
            {/* 👤 PROFILE SECTION */}
            <div className="settings-section">
                <h3>👤 Thông tin cá nhân</h3>

                {isEditing ? (
                    <div className="profile-form">
                        <div className="form-group">
                            <label>Tên hiển thị:</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    name: e.target.value
                                })}
                                placeholder="Nhập tên của bạn..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    email: e.target.value
                                })}
                                placeholder="email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Avatar (emoji):</label>
                            <input
                                type="text"
                                value={formData.avatar}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    avatar: e.target.value
                                })}
                                placeholder="😊"
                                maxLength="2"
                            />
                        </div>

                        <div className="form-actions">
                            <button onClick={handleSaveProfile} className="save-btn">
                                💾 Lưu
                            </button>
                            <button onClick={handleCancelEdit} className="cancel-btn">
                                ❌ Hủy
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-display">
                        <div className="profile-info">
                            <span className="user-avatar-large">
                                {preferences.avatar || '👤'}
                            </span>
                            <div>
                                <p><strong>Tên:</strong> {username || 'Chưa cập nhật'}</p>
                                <p><strong>Email:</strong> {preferences.email || 'Chưa cập nhật'}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="edit-btn"
                        >
                            ✏️ Chỉnh sửa
                        </button>
                    </div>
                )}
            </div>

            {/* 🎨 THEME SETTINGS */}
            <div className="settings-section">
                <h3>🎨 Giao diện</h3>

                <div className="theme-controls">
                    <button onClick={toggleTheme} className="theme-toggle-btn">
                        {theme === 'light' ? '🌙 Chuyển Dark Mode' : '☀️ Chuyển Light Mode'}
                    </button>

                    <label className="setting-checkbox">
                        <input
                            type="checkbox"
                            checked={user.preferences?.autoDarkMode ?? false}
                            onChange={(e) => updateUser({
                                preferences: {
                                    ...user.preferences,
                                    autoDarkMode: e.target.checked
                                }
                            })}
                        />
                        <span>🌙 Tự động chuyển Dark Mode (6PM - 6AM)</span>
                    </label>
                </div>
            </div>

            {/* 🔔 NOTIFICATION SETTINGS */}
            <div className="settings-section">
                <h3>🔔 Thông báo</h3>

                <label className="setting-checkbox">
                    <input
                        type="checkbox"
                        checked={preferences.autoDarkMode ?? false}
                        onChange={(e) => updatePreferences({
                            autoDarkMode: e.target.checked
                        })}
                    />
                    <span>Bật thông báo</span>
                </label>

                <label className="setting-checkbox">
                    <input
                        type="checkbox"
                        checked={preferences.notifications ?? true}
                        onChange={(e) => updatePreferences({
                            notifications: e.target.checked
                        })}
                    />
                    <span>🔊 Thông báo âm thanh</span>
                </label>
            </div>

            {/* 💾 DATA MANAGEMENT */}
            <div className="settings-section">
                <h3>💾 Quản lý dữ liệu</h3>

                <div className="data-actions">
                    <button onClick={handleExportData} className="export-btn">
                        📤 Export dữ liệu
                    </button>

                    <label className="import-btn">
                        📥 Import dữ liệu
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImportData}
                            style={{ display: 'none' }}
                        />
                    </label>

                    <button
                        onClick={() => setShowResetConfirm(true)}
                        className="reset-btn"
                    >
                        🔄 Reset tất cả
                    </button>
                </div>
            </div>

            {/* ⚠️ RESET CONFIRMATION MODAL */}
            {showResetConfirm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>⚠️ Xác nhận Reset</h3>
                        <p>Bạn có chắc muốn reset tất cả dữ liệu không?<br />
                            Hành động này không thể hoàn tác!</p>
                        <div className="modal-actions">
                            <button
                                onClick={handleResetUser}
                                className="confirm-btn"
                            >
                                ✅ Xác nhận
                            </button>
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="cancel-btn"
                            >
                                ❌ Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSettings;

/*
💡 KIẾN THỨC REACT:

🎯 FORM HANDLING:
- Local state cho form data
- Controlled inputs với value/onChange
- Form validation và error handling

🎨 MODAL PATTERNS:
- Conditional rendering cho modal
- Overlay và modal positioning
- Event handling cho modal interactions

📁 FILE OPERATIONS:
- FileReader API để đọc files
- Blob và URL.createObjectURL để export
- JSON parsing với error handling

⚙️ ADVANCED PATTERNS:
- Multiple context consumption
- Complex state updates
- User preference management

🔐 DATA SAFETY:
- Confirmation dialogs cho destructive actions
- Data validation before import
- Error handling với user feedback
*/