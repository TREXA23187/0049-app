import React, { useState } from 'react';
import EditorApp from './editor';
import { ConfigProvider } from 'antd';
import jsonData from '@/data/data.json';
import { registerConfig as config } from '@/configs/editor-config';

export default function Editor() {
    const [data, setData] = useState(jsonData);

    const [globalData, setGlobalData] = useState({
        username: 'admin',
        password: 'admin',
        test: 'test'
    });
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00B8FF'
                }
            }}>
            <EditorApp
                data={data}
                updateData={setData}
                config={config}
                globalData={globalData}
                updateGlobalData={setGlobalData}
            />
        </ConfigProvider>
    );
}
