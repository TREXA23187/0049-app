import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '@/routes';
import { Layout, FloatButton } from 'antd';
import '@/style/layout.less';
import { useTranslation } from 'react-i18next';

import AppHeader from './AppHeader.jsx';
import avatar from '@/assets/images/user.png';

import { ss, ls } from '@/utils/storage.js';
import ConsoleLayout from './ConsoleLayout.jsx';

const { Content } = Layout;

export default function DefaultLayout(props) {
    const { t } = useTranslation();

    useEffect(() => {
        ss.set('tabList', [{ title: t('首页'), content: '', key: '/index', closable: false }]);
    }, []);

    let auth = ls.get('user')?.role || 0;

    const loginOut = () => {
        localStorage.clear();
        props.history.push('/login');
    };

    return (
        <Layout className='app'>
            <FloatButton.BackTop />
            <Layout style={{ minHeight: '100vh' }}>
                <AppHeader avatar={avatar} loginOut={loginOut} />
                <Content className='content'>
                    <Switch>
                        {routes.map(item => {
                            return (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    exact={item.exact}
                                    render={p => {
                                        if (p.location.pathname.startsWith('/console')) {
                                            return (
                                                <ConsoleLayout>
                                                    <item.component />
                                                </ConsoleLayout>
                                            );
                                        } else {
                                            return <item.component />;
                                        }
                                    }}></Route>
                            );
                        })}
                        <Redirect to='/404' />
                    </Switch>
                </Content>
                {/* <AppFooter /> */}
            </Layout>
        </Layout>
    );
}
