import React, { useState, useEffect } from 'react';
import { Card, Badge } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

export default function InstanceCard(props) {
    const { data, onCardClick } = props;
    const { title, description, id, status, url } = data;

    return (
        <Card
            title={title}
            bordered={false}
            hoverable
            style={{ margin: '10px 5px', height: '230px', position: 'relative' }}
            onClick={() => onCardClick(data)}>
            <div>{description}</div>
            <div>instance id:{id}</div>
            <div style={{ position: 'absolute', left: '30px', bottom: '20px' }}>
                {status == 1 ? (
                    <div>
                        <Badge status='success' /> <span>Running</span>
                    </div>
                ) : (
                    <div>
                        <Badge status='error' /> <span>Stopped</span>
                    </div>
                )}
            </div>
            <div style={{ position: 'absolute', right: '30px', bottom: '20px' }}>
                {url}
                <CopyOutlined
                    style={{
                        marginLeft: 5,
                        fontSize: 16,
                        cursor: 'pointer'
                    }}
                    onClick={e => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(url);
                    }}
                />
            </div>
        </Card>
    );
}
