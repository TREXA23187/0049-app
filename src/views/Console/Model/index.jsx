import React, { useState } from 'react';
import { Table, Button, message, Row, Col, Tag, Space } from 'antd';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';
import { getModelList, removeModel } from '@/api/console';
import { downloadFile } from '@/api/file';
import { downloadLink } from '@/utils';
import ModelDetailDrawer from './model-detail-drawer';

export default function Model() {
    const { t } = useTranslation();

    const [messageApi, contextHolder] = message.useMessage();

    const [drawerOpen, setDrawOpen] = useState(false);
    const [currentModelData, setCurrentModelData] = useState({});
    const [isEditDrawer, setIsEditDrawer] = useState(false);

    const { data: modelList, refresh } = useRequest(async () => {
        const res = await getModelList();

        return res.data?.list.reverse();
    });

    const columns = [
        {
            title: t('Name'),
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: t('Type'),
            dataIndex: 'type',
            key: 'type',
            render(rol, record) {
                const cunstomTag = record.is_default ? null : <Tag color='orange'>custom</Tag>;
                return (
                    <Space>
                        {rol === 'classification' ? <Tag color='green'>{rol}</Tag> : <Tag color='blue'>{rol}</Tag>}
                        {cunstomTag}
                    </Space>
                );
            }
        },
        {
            title: t('Model Flie'),
            dataIndex: 'model_file_name',
            key: 'model_file_name',
            render(rol, record) {
                return (
                    rol && (
                        <div>
                            <Button
                                type='link'
                                onClick={async () => {
                                    const { model_file_name, model_file_path } = record;

                                    const res = await downloadFile({
                                        file_path: model_file_path
                                    });

                                    if (res.code === -1) {
                                        messageApi.error(res.msg);
                                    } else {
                                        downloadLink(res, model_file_name);
                                    }
                                }}>
                                {rol}
                            </Button>
                        </div>
                    )
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
                                setCurrentModelData(record);
                                setDrawOpen(true);
                                setIsEditDrawer(false);
                            }}
                            disabled={record.is_default}>
                            {t('Detail')}
                        </Button>
                        <Button
                            type='text'
                            danger
                            onClick={async () => {
                                const res = await removeModel({ id: rol.id });
                                if (res.code === 0) {
                                    messageApi.success(res.msg);
                                    refresh();
                                } else {
                                    messageApi.error(res.msg);
                                }
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
            <Row style={{ marginBottom: '10px' }}>
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
                onClose={() => setDrawOpen(false)}
            />
        </div>
    );
}
