import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Nhạc Hoa Thịnh Hành',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/4/a/1/6/4a167556eddb73b296d9151a9e3c2b9a.jpg'
        },
        {
            id: 2,
            name: 'Nhạc Trẻ',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/9/4/9/2/94924c692e9097ab2244528428b4ce7f.jpg'
        },
        {
            id: 3,
            name: 'Rap Việt',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/d/3/9/a/d39a96b0d460153501d69d3a59fa21d8.jpg'
        }
    ];

    return (
        <div>
            <h3>🔥 Album List</h3>
            {/* ⬇️ Truyền albumList data xuống AlbumList component qua props */}
            <AlbumList albumList={albumList} />
        </div>
    );
}

AlbumFeature.propTypes = {};

export default AlbumFeature;