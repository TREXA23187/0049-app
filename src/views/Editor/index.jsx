import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditorApp from './editor';
import jsonData from '@/data/data.json';
import { registerConfig as config } from '@/configs/editor-config';

export default function Editor() {
    let query = new URLSearchParams(useLocation().search);

    const [data, setData] = useState(JSON.parse(query.get('data')) || jsonData);
    const [globalData, setGlobalData] = useState({
        test: 'test'
    });

    return (
        <div style={{ height: '75%' }}>
            <EditorApp
                data={data}
                updateData={setData}
                config={config}
                globalData={globalData}
                updateGlobalData={setGlobalData}
            />
        </div>
    );
}
