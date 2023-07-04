import React, { useState } from 'react';
import { Layout, Col, Row, Button } from 'antd';
import InstanceCard from './instance-card';
import DetailDrawer from './detail-drawer';

export default function Console() {
    const [drawerOpen, setDrawOpen] = useState(false);
    const [currentCardData, setCurrentCardData] = useState({});

    const onCardClick = data => {
        console.log(data);
        setDrawOpen(true);
        setCurrentCardData(data);
    };

    const cardList = [
        {
            title: 'Iris',
            description: 'Card content',
            instance_id: '1231231',
            template_id: '56999031',
            model: 'random forest',
            url: '127.0.0.1:5005',
            created_time: '2023-06-30'
        },
        {
            title: 'Iris',
            description: 'Card content',
            instance_id: '1231231',
            template_id: '56999031',
            model: 'random forest',
            url: '127.0.0.1:5005'
        },
        {
            title: 'Iris',
            description: 'Card content',
            instance_id: '1231231',
            template_id: '56999031',
            model: 'random forest',
            url: '127.0.0.1:5005'
        },
        {
            title: 'Iris',
            description: 'Card content',
            instance_id: '1231231',
            template_id: '56999031',
            model: 'random forest',
            url: '127.0.0.1:5005'
        }
    ];

    return (
        <>
            <Row>
                <Col span={2}>
                    <Button type='primary' style={{ margin: '0 10px' }}>
                        New Instance
                    </Button>
                </Col>
            </Row>
            <Row gutter={12}>
                {cardList.map((item, index) => {
                    return (
                        <Col span={8} key={index}>
                            <InstanceCard onCardClick={onCardClick} data={item} />
                        </Col>
                    );
                })}
            </Row>

            <DetailDrawer data={currentCardData} open={drawerOpen} onClose={() => setDrawOpen(false)} />
        </>
    );
}
