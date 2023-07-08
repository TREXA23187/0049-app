import React, { useState, useRef } from 'react';
import { Table, Button, Space, message, Row, Col } from 'antd';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';

const modelList = [
    {
        name: '123',
        key: '123'
    }
];

export default function Model() {
    const { t } = useTranslation();

    const [messageApi, contextHolder] = message.useMessage();

    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState({});
    const [modalType, setModalType] = useState('add'); // add || edit

    const columns = [
        {
            title: t('Name'),
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: t('Content'),
            dataIndex: 'content',
            key: 'content'
        },
        {
            title: t('操作'),
            render(rol) {
                return (
                    <div>
                        <Button
                            type='link'
                            onClick={() => {
                                // history.push(`/console/template/editor?sider=false&data=${rol.content}`);
                            }}
                            disabled={rol.title === 'default'}>
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
                    <Button type='primary' style={{ margin: '0 10px' }} onClick={() => {}}>
                        New Model
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={modelList} pagination={{ defaultPageSize: 5 }} />
        </div>
    );
}
