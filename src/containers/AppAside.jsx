import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Dropdown, Avatar } from 'antd';
import {
    GithubOutlined,
    EditOutlined,
    LogoutOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import SideMenu from '@/components/SideMenu';
import { changeLocale } from '@/locale/utils';
import { ls } from '@/utils/storage';
import { useTranslation } from 'react-i18next';

const { Sider } = Layout;

const userInfo = ls.get('user') ?? { username: 'visitor' };

const AppAside = props => {
    const { t } = useTranslation();
    let { menuToggle, menu, updateTabs, avatar, loginOut, menuClick } = props;

    const items = [
        {
            key: '1',
            type: 'group',
            label: t('用户设置'),
            children: [
                {
                    key: '1-1',
                    label: (
                        <span>
                            <EditOutlined /> {t('个人设置')}
                        </span>
                    )
                },
                {
                    key: '1-2',
                    label: (
                        <span>
                            <SettingOutlined /> {t('系统设置')}
                        </span>
                    ),
                    children: [
                        {
                            key: '1-2-1',
                            label: (
                                <span>
                                    <SettingOutlined /> {t('语言设置')}
                                </span>
                            ),
                            children: [
                                {
                                    key: '2-1',
                                    label: <span onClick={() => changeLocale('zh')}>简体中文</span>
                                },
                                {
                                    key: '2-2',
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
            key: '2',
            label: (
                <span onClick={loginOut}>
                    <LogoutOutlined /> {t('退出登录')}
                </span>
            )
        }
    ];

    return (
        <Sider className='aside' trigger={null} collapsible collapsed={menuToggle} style={{ position: 'relative' }}>
            <div className='logo' style={{ margin: '30px 0' }}>
                <a rel='noopener noreferrer' href='/'>
                    <GithubOutlined type='github' style={{ fontSize: '3.8rem', color: '#fff' }} />
                </a>
            </div>
            <SideMenu menu={menu} collapsed={menuToggle} updateTabs={updateTabs}></SideMenu>
            <div style={{ width: '100%', height: 50, backgroundColor: '#20242d', position: 'absolute', bottom: 0 }}>
                <div style={{ width: '65%', height: '100%' }}>
                    {!menuToggle && (
                        <Dropdown menu={{ items }} placement='topLeft' arrow>
                            <div style={{ cursor: 'pointer' }}>
                                <Avatar src={avatar} alt='avatar' style={{ position: 'absolute', left: 10, top: 7 }} />
                                <span style={{ position: 'absolute', left: 50, top: 12 }}>{userInfo.username}</span>
                            </div>
                        </Dropdown>
                    )}
                </div>
                <div style={{ position: 'absolute', right: menuToggle ? 30 : 10, top: 15 }}>
                    {menuToggle ? (
                        <MenuUnfoldOutlined onClick={menuClick} style={{ fontSize: 20 }} />
                    ) : (
                        <MenuFoldOutlined onClick={menuClick} style={{ fontSize: 20 }} />
                    )}
                </div>
            </div>
        </Sider>
    );
};

AppAside.propTypes = {
    menuToggle: PropTypes.bool,
    menu: PropTypes.array.isRequired
};

export default AppAside;
