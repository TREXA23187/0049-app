import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';
import { getInstanceLinkInfo } from '@/api/console';
import { useRequest } from '@umijs/hooks';
import EditorBlock from './editor-block';
import { registerConfig as config } from '@/configs/editor-config';

export default function Interface(props) {
    const query = new URLSearchParams(useLocation().search);

    const [messageApi, contextHolder] = message.useMessage();

    const [globalData, setGlobalData] = useState({});
    const [globalResult, setGlobalResult] = useState({});

    const { data: templateContent } = useRequest(async () => {
        const token = query.get('token');
        const instance = props.match.params.instance;

        const res = await getInstanceLinkInfo({ instance, token });

        if (res.code === 0) {
            return JSON.parse(res.data);
        } else {
            messageApi.error(res.msg);
            return null;
        }
    });

    return (
        <>
            {contextHolder}
            <div>
                <div
                    style={{
                        width: templateContent?.container.width + 'px',
                        height: templateContent?.container.height + 'px',
                        position: 'relative'
                    }}>
                    {templateContent?.blocks.map((block, index) => {
                        return (
                            <EditorBlock
                                block={block}
                                key={index}
                                config={config}
                                isPreview={true}
                                globalData={globalData}
                                updateGlobalData={setGlobalData}
                                globalResult={globalResult}
                                updateGlobalResult={setGlobalResult}
                            />
                        );
                    })}
                </div>
            </div>
            {/* <div style={{ position: 'relative' }}>
                <div
                    style={{
                        width: templateContent?.container.width + 'px',
                        height: templateContent?.container.height + 'px'
                        // position: 'relative'
                    }}>
                    {templateContent?.blocks.map((block, index) => {
                        return <EditorBlock block={block} key={index} config={config} isPreview={true} />;
                    })}
                </div>
            </div> */}
        </>
    );
}
