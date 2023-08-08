import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Dropdown, Layout, Avatar, Image } from 'antd';
import {
    ContainerOutlined,
    EditOutlined,
    GithubOutlined,
    LogoutOutlined,
    ArrowLeftOutlined,
    SettingOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { changeLocale } from '@/locale/utils';
import { ls } from '@/utils/storage';
import { useTranslation } from 'react-i18next';
import AppLogo from '@/assets/images/app.png';

const { Header } = Layout;

const AppHeader = props => {
    let { avatar, loginOut } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();

    const userInfo = ls.get('user');
    if (!userInfo) {
        history.push('/login');
    }

    const items = [
        {
            key: '1',
            label: (
                <span onClick={() => history.push('/console/instance')}>
                    <AppstoreOutlined /> {t('Console')}
                </span>
            )
        },
        {
            type: 'divider'
        },
        {
            key: '2',
            type: 'group',
            label: t('User Settings'),
            children: [
                {
                    key: '2-1',
                    label: (
                        <span>
                            <EditOutlined /> {t('Personal')}
                        </span>
                    )
                },
                {
                    key: '2-2',
                    label: (
                        <span>
                            <SettingOutlined /> {t('System')}
                        </span>
                    ),
                    children: [
                        {
                            key: '2-2-1',
                            label: (
                                <span>
                                    <SettingOutlined /> {t('Language')}
                                </span>
                            ),
                            children: [
                                {
                                    key: '2-2-1-1',
                                    label: <span onClick={() => changeLocale('zh')}>简体中文</span>
                                },
                                {
                                    key: '2-2-1-2',
                                    label: <span onClick={() => changeLocale('en')}>English</span>
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            type: 'divider'
        },
        {
            key: '3',
            label: (
                <span onClick={loginOut}>
                    <LogoutOutlined /> {t('Sign out')}
                </span>
            )
        }
    ];

    return (
        <Header className='header' style={{ height: '50px' }}>
            <div className='left'>
                <Image
                    src={AppLogo}
                    style={{ cursor: 'pointer', width: '50px' }}
                    onClick={() => history.push('/index')}
                    preview={false}
                />

                {location.pathname !== '/index' && (
                    <ArrowLeftOutlined
                        onClick={() => {
                            history.goBack();
                            // history.push('/index');
                        }}
                    />
                )}
            </div>
            <div className='right'>
                <div style={{ marginRight: 20 }}>
                    <a href='/docs' style={{ color: '#000' }}>
                        <ContainerOutlined style={{ marginRight: 5, fontSize: 15 }} />
                        <span>Docs</span>
                    </a>
                </div>
                <div className='mr15'>
                    <a rel='noopener noreferrer' href='/' target='_blank'>
                        <GithubOutlined style={{ color: '#000', fontSize: 15 }} />
                    </a>
                </div>
                <div style={{ marginLeft: 10 }}>
                    <Dropdown menu={{ items }} placement='bottomLeft' arrow>
                        <div style={{ cursor: 'pointer' }}>
                            <Avatar src={avatar} alt='avatar' className='mr15' />
                            <span>{userInfo?.nick_name}</span>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </Header>
    );
};

export default AppHeader;
