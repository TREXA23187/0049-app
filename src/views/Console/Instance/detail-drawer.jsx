import React, { useState, useEffect } from 'react';
import { Drawer, Descriptions, Badge } from 'antd';

export default function DetailDrawer(props) {
    const { data, open, onClose } = props;
    const { title, description, instance_id, template_id, model, is_running, url, created_time } = data;

    return (
        <Drawer title='Intance Detail' placement='right' onClose={onClose} open={open}>
            <Descriptions title={title} column={1} layout='vertical'>
                <Descriptions.Item label='description'> {description}</Descriptions.Item>
                <Descriptions.Item label='instance id:'>{instance_id}</Descriptions.Item>
                <Descriptions.Item label='template id'>{template_id}</Descriptions.Item>
                <Descriptions.Item label='model'>{model}</Descriptions.Item>
                <Descriptions.Item label='url'>{url}</Descriptions.Item>
                <Descriptions.Item label='status'>
                    {is_running ? (
                        <div>
                            <Badge status='success' /> <span>Running</span>
                        </div>
                    ) : (
                        <div>
                            <Badge status='error' /> <span>Stopped</span>
                        </div>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label='created time'>{created_time}</Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
}
