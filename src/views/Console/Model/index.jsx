import React, { useState, useRef } from 'react';
import { Layout, Tag, Table, Input, Button, Space, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';
import { ls } from '@/utils/storage';

const modelList = [
    {
        model: '123',
        key: '123'
    }
];

export default function Model() {
    const { t } = useTranslation();

    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState({});
    const [modalType, setModalType] = useState('add'); // add || edit

    const columns = [
        {
            title: t('Model'),
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: t('地址'),
            dataIndex: 'address',
            key: 'address',
            render(value) {
                return value || '-';
            }
        },
        {
            title: t('电话'),
            dataIndex: 'tel',
            key: 'tel',
            render(value) {
                return value || '-';
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
                                setUserData(rol);
                                setModalType('edit');
                            }}>
                            {t('编辑')}
                        </Button>
                        <Button type='text' danger>
                            {t('禁用')}
                        </Button>
                        {/* <Button
                            type='text'
                            danger
                            onClick={async () => {
                                const res = await deleteUser(rol.id);
                                message.success(res.message);
                                refresh();
                            }}
                            disabled={disabled}>
                            {t('删除')}
                        </Button> */}
                    </div>
                );
            }
        }
    ];
    return (
        <div>
            <Table columns={columns} dataSource={modelList} pagination={{ defaultPageSize: 5 }} rowKey='id' />
        </div>
    );
}
