import React, { useState } from 'react';
import { Table, Button, message, Row, Col, Tag, Badge } from 'antd';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';
import { getTaskList, removeTask } from '@/api/console';
import TaskDetailDrawer from './task-detail-drawer';

export default function Task() {
    const { t } = useTranslation();

    const [messageApi, contextHolder] = message.useMessage();

    const [drawerOpen, setDrawOpen] = useState(false);
    const [currentTaskData, setCurrentTaskData] = useState({});
    const [isEditDrawer, setIsEditDrawer] = useState(false);

    const { data: taskList, refresh } = useRequest(async () => {
        const res = await getTaskList();

        return res.data?.list || [];
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
            render(rol) {
                return <Tag color={rol === 'training' ? 'green' : 'blue'}>{rol}</Tag>;
            }
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
            render(rol) {
                if (rol === 'pending') {
                    return (
                        <div>
                            <Badge status='default' /> <span>{rol}</span>
                        </div>
                    );
                } else if (rol === 'running') {
                    return (
                        <div>
                            <Badge status='processing' /> <span>{rol}</span>
                        </div>
                    );
                } else if (rol === 'completed') {
                    return (
                        <div>
                            <Badge status='success' /> <span>{rol}</span>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <Badge status='error' /> <span>{rol}</span>
                        </div>
                    );
                }
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
                                setCurrentTaskData(record);
                                setDrawOpen(true);
                                setIsEditDrawer(false);
                            }}>
                            {t('Detail')}
                        </Button>
                        <Button
                            type='text'
                            danger
                            onClick={async () => {
                                const res = await removeTask({ id: rol.id });
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
                        New Task
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={taskList} pagination={{ defaultPageSize: 5 }} rowKey='id' />
            <TaskDetailDrawer
                data={currentTaskData}
                open={drawerOpen}
                isEdit={isEditDrawer}
                refreshList={refresh}
                onClose={() => {
                    setDrawOpen(false);
                }}
            />
        </div>
    );
}
