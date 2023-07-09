import React, { useState, useRef } from 'react';
import { Table, Button, Space, message, Row, Col } from 'antd';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';
import { getModelList } from '@/api/console';
import ModelDetailDrawer from './model-detail-drawer';
import { DownloadOutlined } from '@ant-design/icons';

export default function Model() {
    const { t } = useTranslation();

    const [messageApi, contextHolder] = message.useMessage();

    const [drawerOpen, setDrawOpen] = useState(false);
    const [currentModelData, setCurrentModelData] = useState({});
    const [isEditDrawer, setIsEditDrawer] = useState(false);

    const { data: modelList, refresh } = useRequest(async () => {
        const res = await getModelList();

        return res.data?.list;
    });

    const columns = [
        {
            title: t('Name'),
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: t('Code Flie'),
            dataIndex: 'file_path',
            key: 'file_path',
            render(rol, record) {
                return rol ? (
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        {rol}
                        {!record.is_default && (
                            <DownloadOutlined
                                style={{ position: 'absolute', right: 2, fontSize: 16, cursor: 'pointer' }}
                            />
                        )}
                    </div>
                ) : (
                    '-'
                );
            }
        },
        {
            title: t('Github Link'),
            dataIndex: 'github_link',
            key: 'github_link',
            render(rol) {
                return rol || '-';
            }
        },
        {
            title: t('Action'),
            render(rol, record) {
                return (
                    <div>
                        <Button
                            type='link'
                            onClick={() => {
                                // history.push(`/console/template/editor?sider=false&data=${rol.content}`);
                            }}
                            disabled={record.is_default}>
                            {t('Edit')}
                        </Button>
                        <Button
                            type='text'
                            danger
                            onClick={async () => {
                                // const res = await removeTemplate({ id: rol.id });
                                // if (res.code === 0) {
                                //     messageApi.success('removed');
                                //     refresh();
                                // } else {
                                //     messageApi.error('remove failed');
                                // }
                            }}
                            disabled={record.is_default}>
                            {t('Remove')}
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div>
            {contextHolder}
            <Row>
                <Col span={2}>
                    <Button
                        type='primary'
                        style={{ margin: '0 10px' }}
                        onClick={() => {
                            setIsEditDrawer(true);
                            setDrawOpen(true);
                        }}>
                        New Model
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={modelList} pagination={{ defaultPageSize: 5 }} rowKey='id' />
            <ModelDetailDrawer
                data={currentModelData}
                open={drawerOpen}
                isEdit={isEditDrawer}
                refreshList={refresh}
                onClose={() => {
                    setCurrentModelData({});
                    setDrawOpen(false);
                }}
            />
        </div>
    );
}
