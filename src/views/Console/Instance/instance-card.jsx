import React from 'react';
import { Card, Badge, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { BASE_URL } from '@/constants';

export default function InstanceCard(props) {
    const { data, onCardClick } = props;
    const { title, description, instance_id, status, url } = data;

    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <Card
                title={title}
                bordered={false}
                hoverable
                style={{ margin: '10px 5px', height: '230px', position: 'relative', minWidth: '280px' }}
                onClick={() => onCardClick(data)}>
                <div>{description}</div>
                <div>instance id:{instance_id.slice(0, 12)}</div>
                <div style={{ position: 'absolute', left: '30px', bottom: '20px' }}>
                    {status === 'running' ? (
                        <div>
                            <Badge status='success' /> <span>{status}</span>
                        </div>
                    ) : (
                        <div>
                            <Badge status='error' /> <span>{status}</span>
                        </div>
                    )}
                </div>
                <div style={{ position: 'absolute', right: '30px', bottom: '20px' }}>
                    {`${BASE_URL}:${url.split(':')[1]}`}
                    <CopyOutlined
                        style={{
                            marginLeft: 5,
                            fontSize: 16,
                            cursor: 'pointer'
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(url);
                            messageApi.success('copied');
                        }}
                    />
                </div>
            </Card>
        </>
    );
}
