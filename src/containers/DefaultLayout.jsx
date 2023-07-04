import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '@/routes';
import { Layout, FloatButton, Tabs } from 'antd';
import '@/style/layout.less';
import { useTranslation } from 'react-i18next';

import AppHeader from './AppHeader.jsx';
import AppAside from './AppAside.jsx';
import AppFooter from './AppFooter.jsx';
import menus from '@/routes/menus';
import avatar from '@/assets/images/user.png';

import { ss, ls } from '@/utils/storage.js';

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
                                    render={p =>
                                        !item.auth || item.auth.indexOf(auth) !== -1 ? (
                                            <item.component />
                                        ) : (
                                            <Redirect to='/404' {...p} />
                                        )
                                    }></Route>
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
