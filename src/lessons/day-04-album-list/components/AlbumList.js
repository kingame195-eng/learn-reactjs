import React from 'react';
import PropTypes from 'prop-types';
import './AlbumList.scss';

// 🎵 Component AlbumList - Nhận albumList từ parent và render danh sách
function AlbumList({ albumList }) {  // Destructuring props để lấy albumList
    return (
        <ul className="album-list">
            {/* 🔄 Dùng map() để biến đổi array albumList thành array JSX elements */}
            {albumList.map(album => (
                <li key={album.id}>  {/* key giúp React theo dõi từng item */}
                    <div>
                        <h4>{album.name}</h4>  {/* Hiển thị tên album */}
                        <img src={album.thumbnailUrl} alt={album.name} width="100" />  {/* Hiển thị ảnh */}
                    </div>
                </li>
            ))}
        </ul>
    );
}

// 🛡️ PropTypes validation - Kiểm tra kiểu dữ liệu của props
AlbumList.propTypes = {
    albumList: PropTypes.arrayOf(PropTypes.shape({  // albumList phải là array của objects
        id: PropTypes.number.isRequired,             // id bắt buộc, kiểu number
        name: PropTypes.string.isRequired,           // name bắt buộc, kiểu string
        thumbnailUrl: PropTypes.string.isRequired    // thumbnailUrl bắt buộc, kiểu string
    })).isRequired  // albumList prop là bắt buộc
};

export default AlbumList;