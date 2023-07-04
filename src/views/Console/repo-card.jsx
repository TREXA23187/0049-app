import React, { useState, useEffect } from 'react';
import { Card, Badge } from 'antd';

export default function RepoCard(props) {
    const { data, onEdit } = props;
    const { title, content, instance_id, is_running } = data;

    return (
        <Card title={title} bordered={false} hoverable style={{ margin: '10px 5px', height: '250px' }} onClick={onEdit}>
            <div>{content}</div>
            <div>instance id:{instance_id}</div>
            <div>
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
        </Card>
    );
}
