import React from 'react';
import { Card } from 'antd';
import { registerConfig as config } from '@/configs/editor-config';
import EditorBlock from './editor-block';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Grid from '@/components/editor/grid';

export default function TemplateCard(props) {
    const { data, onCardEdit, onCardRemove } = props;

    const content = JSON.parse(data.content);

    const containerStyles = {
        // width: content.container.width * 0.5 + 'px',
        height: content.container.height * 0.4 + 'px'
    };

    return (
        <>
            <Card
                title={data.name}
                bordered={false}
                style={{ margin: '2px', minHeight: '230px', position: 'relative', minWidth: '280px' }}
                bodyStyle={{ padding: '5px' }}
                actions={[
                    <EditOutlined key='edit' onClick={() => onCardEdit(data)} />,
                    <DeleteOutlined key='delete' onClick={() => onCardRemove(data)} />
                ]}>
                <div
                    style={{
                        ...containerStyles,
                        position: 'relative'
                    }}>
                    <Grid />
                    {content?.blocks.map((block, index) => {
                        return <EditorBlock block={block} key={index} config={config} isPreview={true} />;
                    })}
                </div>
            </Card>
        </>
    );
}
