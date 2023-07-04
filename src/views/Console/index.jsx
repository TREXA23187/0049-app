import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row, Button, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import RepoCard from './repo-card';

export default function Console() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const cardList = [
        {
            title: 'Iris',
            content: 'Card content',
            instance_id: '1231231'
        },
        {
            title: 'Card title',
            content: 'Card content',
            is_running: true
        },
        {
            title: 'Card title',
            content: 'Card content'
        },
        {
            title: 'Card title',
            content: 'Card content'
        },
        {
            title: 'Card title',
            content: 'Card content'
        }
    ];

    return (
        <Layout>
            <Row gutter={12}>
                {cardList.map((item, index) => {
                    return (
                        <Col span={8} key={index}>
                            <RepoCard onEdit={showDrawer} data={item} />
                        </Col>
                    );
                })}
            </Row>

            <Drawer title='Basic Drawer' placement='right' onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </Layout>
    );
}
