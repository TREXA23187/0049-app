import React, { useState } from 'react';
import { Col, Row, Button } from 'antd';
import InstanceCard from './instance-card';
import DetailDrawer from './detail-drawer';
import { getInstanceList } from '@/api/console';
import { useRequest } from '@umijs/hooks';

export default function Console() {
    const [drawerOpen, setDrawOpen] = useState(false);
    const [currentCardData, setCurrentCardData] = useState({});
    const [isEditDrawer, setIsEditDrawer] = useState(false);

    const onCardClick = data => {
        setIsEditDrawer(false);
        setDrawOpen(true);
        setCurrentCardData(data);
    };

    const { data: instanceList, refresh, run } = useRequest(async () => {
        const res = await getInstanceList();

        return res.data?.list?.reverse();
    });

    return (
        <>
            <Row>
                <Col span={2}>
                    <Button
                        type='primary'
                        style={{ margin: '0 10px' }}
                        onClick={() => {
                            setCurrentCardData({});
                            setIsEditDrawer(true);
                            setDrawOpen(true);
                        }}>
                        New Instance
                    </Button>
                </Col>
            </Row>
            <Row gutter={12}>
                {instanceList?.map((item, index) => {
                    return (
                        <Col span={8} key={index}>
                            <InstanceCard onCardClick={onCardClick} data={item} />
                        </Col>
                    );
                })}
            </Row>

            <DetailDrawer
                data={currentCardData}
                isEdit={isEditDrawer}
                open={drawerOpen}
                refreshList={refresh}
                onClose={() => {
                    setCurrentCardData({});
                    setDrawOpen(false);
                }}
            />
        </>
    );
}
