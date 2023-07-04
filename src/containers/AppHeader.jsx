import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Dropdown, Layout, Avatar, Badge } from 'antd';
import {
    BellOutlined,
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
                    <AppstoreOutlined /> {t('控制台')}
                </span>
            )
        },
        {
            type: 'divider'
        },
        {
            key: '2',
            type: 'group',
            label: t('用户设置'),
            children: [
                {
                    key: '2-1',
                    label: (
                        <span>
                            <EditOutlined /> {t('个人设置')}
                        </span>
                    )
                },
                {
                    key: '2-2',
                    label: (
                        <span>
                            <SettingOutlined /> {t('系统设置')}
                        </span>
                    ),
                    children: [
                        {
                            key: '2-2-1',
                            label: (
                                <span>
                                    <SettingOutlined /> {t('语言设置')}
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
                    <LogoutOutlined /> {t('退出登录')}
                </span>
            )
        }
    ];

    return (
        <Header className='header' style={{ height: '50px' }}>
            <div className='left'>
                {location.pathname != '/index' && (
                    <ArrowLeftOutlined
                        onClick={() => {
                            history.goBack();
                            // history.push('/index');
                        }}
                    />
                )}
            </div>
            <div className='right'>
                <div className='mr15'>
                    <a rel='noopener noreferrer' href='/' target='_blank'>
                        <GithubOutlined style={{ color: '#000' }} />
                    </a>
                </div>
                <div className='mr15'>
                    <Badge dot={true} offset={[-2, 0]}>
                        <a href='/' style={{ color: '#000' }}>
                            <BellOutlined />
                        </a>
                    </Badge>
                </div>
                <div>
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
