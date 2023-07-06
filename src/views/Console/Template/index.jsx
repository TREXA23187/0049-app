import React, { useState } from 'react';
import { Col, Row, Button, Table } from 'antd';
import { useHistory } from 'react-router-dom';
import { getTemplateList } from '@/api/console';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';

export default function Template() {
    const { t } = useTranslation();
    const history = useHistory();

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
                            type='text'
                            style={{ color: 'blue' }}
                            onClick={() => {
                                console.log(rol);
                                history.push(`/console/template/editor?sider=false&data=${rol.content}`);
                            }}>
                            {t('Edit')}
                        </Button>
                        <Button
                            type='text'
                            danger
                            onClick={async () => {
                                // const res = await deleteUser(rol.id);
                                // message.success(res.message);
                                refresh();
                            }}>
                            {t('Remove')}
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div>
            {' '}
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
