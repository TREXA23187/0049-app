import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EditorApp from './editor';
import jsonData from '@/data/data.json';
import { registerConfig as config } from '@/configs/editor-config';
import { useRequest } from '@umijs/hooks';
import { getTemplateInfo } from '@/api/console';

export default function Editor() {
    let query = new URLSearchParams(useLocation().search);

    const { data: templateContent } = useRequest(async () => {
        const templateId = JSON.parse(query.get('template'));

        if (templateId) {
            const res = await getTemplateInfo({ id: templateId });
            return res.data?.content;
        }

        return '';
    });

    useEffect(() => {
        if (templateContent) {
            setData(JSON.parse(templateContent));
        }
    }, [templateContent]);

    const [data, setData] = useState(jsonData);
    const [globalData, setGlobalData] = useState({});

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
