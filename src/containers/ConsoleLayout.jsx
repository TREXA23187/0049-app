import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import routes from '@/routes';
import { Layout, FloatButton, Menu } from 'antd';
import '@/style/layout.less';
import { useTranslation } from 'react-i18next';
import { CloudServerOutlined, BuildOutlined, LayoutOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}

const items = [
    getItem('Instance List', '/console/instance', <CloudServerOutlined />),
    getItem('Template List', '/console/template', <LayoutOutlined />),
    getItem('Model List', '/console/model', <BuildOutlined />)
];

export default function ConsoleLayout(props) {
    const { t } = useTranslation();
    const history = useHistory();

    const menuClick = e => {
        history.push(e.key);
    };

    return (
        <Layout style={{ minHeight: 'calc(100vh - 70px)' }}>
            <FloatButton.BackTop />
            <Sider width={'15%'} style={{ marginRight: '20px' }}>
                <Menu
                    onClick={menuClick}
                    style={{
                        height: '100%'
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    items={items}
                />
            </Sider>
            <Content className='content'>
                <Switch>
                    {routes.map(item => {
                        return (
                            <Route
                                key={item.path}
                                path={item.path}
                                exact={item.exact}
                                render={() => <item.component />}></Route>
                        );
                    })}
                    <Redirect to='/404' />
                </Switch>
            </Content>
        </Layout>
    );
}
