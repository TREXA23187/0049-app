import React from 'react';
import { Card, Badge, Typography } from 'antd';
import { BASE_URL } from '@/constants';

const { Text } = Typography;

export default function InstanceCard(props) {
    const { data, onCardClick } = props;
    const { title, description, instance_id, status, url, task_type } = data;

    return (
        <>
            <Badge.Ribbon text={task_type} color={task_type === 'training' ? 'green' : 'blue'}>
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
                    {task_type === 'training' && (
                        <div style={{ position: 'absolute', right: '30px', bottom: '20px' }}>
                            <Text copyable>{`${BASE_URL}:${url.split(':')[1]}`}</Text>
                        </div>
                    )}
                </Card>
            </Badge.Ribbon>
        </>
    );
}
