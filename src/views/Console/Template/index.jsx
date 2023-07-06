import React, { useState } from 'react';
import { Col, Row, Button, Table, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { getTemplateList } from '@/api/console';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';
import { removeTemplate } from '../../../api/console';

export default function Template() {
    const { t } = useTranslation();
    const history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();

    const { data: templateList, refresh, run } = useRequest(async () => {
        const res = await getTemplateList();

        return res.data?.list;
    });

    const columns = [
        {
            title: t('Title'),
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: t('Content'),
            dataIndex: 'content',
            key: 'content',
            render: value => {
                return value.length > 250 ? value.slice(1, 250) + '...' : value;
            }
        },
        {
            title: t('操作'),
            render(rol) {
                return (
                    <div>
                        <Button
                            type='link'
                            onClick={() => {
                                console.log(rol);
                                history.push(`/console/template/editor?sider=false&data=${rol.content}`);
                            }}
                            disabled={rol.title === 'default'}>
                            {t('Edit')}
                        </Button>
                        <Button
                            type='text'
                            danger
                            onClick={async () => {
                                const res = await removeTemplate({ id: rol.id });
                                if (res.code === 0) {
                                    messageApi.success('removed');
                                    refresh();
                                } else {
                                    messageApi.error('remove failed');
                                }
                            }}
                            disabled={rol.title === 'default'}>
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
                            history.push('/console/template/editor?sider=false');
                        }}>
                        New Template
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={templateList}
                pagination={{ defaultPageSize: 5 }}
                rowKey='id'
                style={{ maxHeight: '100px' }}
            />
        </div>
    );
}
