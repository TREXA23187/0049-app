import React from 'react';
import { HomeOutlined } from '@ant-design/icons';

const menus = [
    {
        key: '/index',
        title: 'index',
        icon: <HomeOutlined />
    }
];

export const routesNameMap = {
    '/index': 'index'
};

export default menus;
