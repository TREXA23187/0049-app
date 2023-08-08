import React, { useState, useRef, useEffect } from 'react';
import { Col, Row, Button, Tabs, Table, Empty, Alert, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import InstanceCard from './instance-card';
import InstanceDetailDrawer from './instance-detail-drawer';
import { getInstanceList, getImageList, getImageInfo, removeImage } from '@/api/console';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';
import ImageDetailDrawer from './image-detail-drawer';

export default function Console() {
    const { t } = useTranslation();

    const [messageApi, contextHolder] = message.useMessage();

    const [instanceDetailDrawerOpen, setInstanceDetailDrawOpen] = useState(false);
    const [imageDetailDrawerOpen, setImageDetailDrawOpen] = useState(false);

    const [currentCardData, setCurrentCardData] = useState({});
    const [currentImageData, setCurrentImageData] = useState({});

    const [isEditInstanceDrawer, setIsEditInstanceDrawer] = useState(false);
    const [isEditImageDrawer, setIsEditImageDrawer] = useState(false);

    const [showBuildingAlert, setShowBuildingAlert] = useState(false);

    const [currentTab, setCurrentTab] = useState(false);

    let timer = useRef(null);

    const clearTimer = () => {
        clearInterval(timer);
    };

    const onCardClick = data => {
        setIsEditInstanceDrawer(false);
        setInstanceDetailDrawOpen(true);
        setCurrentCardData(data);
    };

    const { data: instanceList, refresh: refreshInstanceList } = useRequest(async () => {
        const res = await getInstanceList();

        return res.data?.list?.reverse() || [];
    });

    const { data: imageList, refresh: refreshImageList, run: runImageList } = useRequest(async () => {
        const res = await getImageList();

        return res.data?.list?.reverse() || [];
    });

    useEffect(() => {
        runImageList();
    }, [currentTab]);

    const columns = [
        {
            title: t('Repository'),
            dataIndex: 'repository',
            key: 'repository'
        },
        {
            title: t('Tag'),
            dataIndex: 'tag',
            key: 'tag',
            render: value => {
                return value.length > 250 ? value.slice(1, 250) + '...' : value;
            }
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: t('Image ID'),
            dataIndex: 'image_id',
            key: 'image_id',
            render(rol) {
                return rol ? rol.slice(0, 20) : '';
            }
        },
        {
            title: t('Size'),
            dataIndex: 'size',
            key: 'size',
            render(rol) {
                return rol ? (rol / (1000 * 1000)).toFixed(2) + 'MB' : '';
            }
        },
        {
            title: t('Action'),
            render(record) {
                return (
                    <div>
                        <Button
                            type='link'
                            onClick={() => {
                                setIsEditImageDrawer(false);
                                setCurrentImageData(record);
                                setImageDetailDrawOpen(true);
                            }}>
                            {t('Detail')}
                        </Button>
                        <Button
                            type='text'
                            danger
                            disabled={record.status === 'in use'}
                            onClick={async () => {
                                const res = await removeImage({ image_id: record.image_id });
                                console.log(res);
                                if (res.code === 0) {
                                    messageApi.success(res.msg);
                                    refreshImageList();
                                } else {
                                    messageApi.error(res.msg);
                                }
                            }}>
                            {t('Remove')}
                        </Button>
                    </div>
                );
            }
        }
    ];

    const tabItems = [
        {
            key: 'instance',
            label: `Instances`,
            children: (
                <>
                    <Row>
                        <Col span={2}>
                            <Button
                                type='primary'
                                style={{ margin: '0 10px' }}
                                onClick={() => {
                                    setCurrentCardData({});
                                    setIsEditInstanceDrawer(true);
                                    setInstanceDetailDrawOpen(true);
                                }}>
                                New Instance
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={12} style={{ height: '80vh', overflow: 'scroll' }}>
                        {instanceList?.map((item, index) => {
                            return (
                                <Col span={8} key={index}>
                                    <InstanceCard onCardClick={onCardClick} data={item} />
                                </Col>
                            );
                        })}
                    </Row>
                    {!instanceList?.length && <Empty />}
                </>
            )
        },
        {
            key: 'image',
            label: `Images`,
            children: (
                <>
                    <Row style={{ marginBottom: '10px' }}>
                        <Col span={2}>
                            <Button
                                type='primary'
                                style={{ margin: '0 10px' }}
                                onClick={() => {
                                    setCurrentImageData({});
                                    setIsEditImageDrawer(true);
                                    setImageDetailDrawOpen(true);
                                }}>
                                New Image
                            </Button>
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={imageList} pagination={{ defaultPageSize: 5 }} rowKey='id' />
                </>
            )
        }
    ];

    return (
        <div style={{ position: 'relative' }}>
            {contextHolder}
            <Tabs defaultActiveKey='1' items={tabItems} type='card' onChange={setCurrentTab} />
            {showBuildingAlert && (
                <Alert
                    message='The image is being built.'
                    type='info'
                    showIcon
                    icon={<LoadingOutlined />}
                    style={{ position: 'absolute', right: 0, top: 0, width: 230 }}
                />
            )}
            <InstanceDetailDrawer
                data={currentCardData}
                isEdit={isEditInstanceDrawer}
                open={instanceDetailDrawerOpen}
                imageList={imageList}
                refreshList={refreshInstanceList}
                onClose={() => {
                    setCurrentCardData({});
                    setInstanceDetailDrawOpen(false);
                }}
            />
            <ImageDetailDrawer
                data={currentImageData}
                isEdit={isEditImageDrawer}
                showBuildingAlert={repository => {
                    setShowBuildingAlert(true);

                    timer = setInterval(async () => {
                        const res = await getImageInfo({ repository });
                        if (res.code === 0 && !res.data) {
                            refreshImageList();
                            setShowBuildingAlert(false);
                            clearTimer();
                        }
                    }, 2000);
                }}
                open={imageDetailDrawerOpen}
                refreshList={refreshImageList}
                onClose={() => {
                    setCurrentImageData({});
                    setImageDetailDrawOpen(false);
                }}
            />
        </div>
    );
}
