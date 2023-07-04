import React, { useState, useEffect } from 'react';
import { Card, Badge } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

export default function RepoCard(props) {
    const { data, onCardClick } = props;
    const { title, description, instance_id, is_running, url } = data;

    return (
        <Card
            title={title}
            bordered={false}
            hoverable
            style={{ margin: '10px 5px', height: '230px', position: 'relative' }}
            onClick={() => onCardClick(data)}>
            <div>{description}</div>
            <div>instance id:{instance_id}</div>
            <div style={{ position: 'absolute', left: '30px', bottom: '20px' }}>
                {is_running ? (
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
