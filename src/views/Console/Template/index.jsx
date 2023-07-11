import React from 'react';
import { Col, Row, Button, Table, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { getTemplateList, removeTemplate } from '@/api/console';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';

export default function Template() {
    const { t } = useTranslation();
    const history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();

    const { data: templateList, refresh } = useRequest(async () => {
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
            title: t('Action'),
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
                                    messageApi.success(res.msg);
                                    refresh();
                                } else {
                                    messageApi.error(res.msg);
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
            <Row style={{ marginBottom: '10px' }}>
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
            <Table columns={columns} dataSource={templateList} pagination={{ defaultPageSize: 5 }} rowKey='id' />
        </div>
    );
}
