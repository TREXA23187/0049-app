import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '@/routes';
import { Layout, FloatButton } from 'antd';
import '@/style/layout.less';

import AppHeader from './AppHeader.jsx';
import avatar from '@/assets/images/user.png';

import ConsoleLayout from './ConsoleLayout.jsx';

const { Content } = Layout;

export default function DefaultLayout(props) {
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
