import React from 'react';
import { useLocation } from 'react-router-dom';
import { getInstanceLinkInfo } from '@/api/console';
import { useRequest } from '@umijs/hooks';
import EditorBlock from './editor-block';
import { registerConfig as config } from '@/configs/editor-config';

export default function Interface() {
    let query = new URLSearchParams(useLocation().search);

    const { data: templateContent } = useRequest(async () => {
        const token = query.get('token');
        const res = await getInstanceLinkInfo({ token });

        if (res.code === 0) {
            return JSON.parse(res.data.template);
        }
    });

    console.log(templateContent);

    return (
        <div
            style={{
                width: templateContent?.container.width + 'px',
                height: templateContent?.container.height + 'px',
                position: 'relative'
            }}>
            {templateContent?.blocks.map((block, index) => {
                return <EditorBlock block={block} key={index} config={config} isPreview={true} />;
            })}
        </div>
    );
}
