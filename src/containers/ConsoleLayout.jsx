import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import routes from '@/routes';
import { Layout, FloatButton, Menu } from 'antd';
import '@/style/layout.less';
import { CloudServerOutlined, BuildOutlined, LayoutOutlined, DashboardOutlined } from '@ant-design/icons';

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
    getItem('Task List', '/console/task', <DashboardOutlined />),
    getItem('Template List', '/console/template', <LayoutOutlined />),
    getItem('Model List', '/console/model', <BuildOutlined />)
];

export default function ConsoleLayout(props) {
    const history = useHistory();
    const location = useLocation();

    let query = new URLSearchParams(location.search);

    const [currentMenu, setCurrentMenu] = useState(location.pathname);

    const menuClick = e => {
        history.push(e.key);
    };

    return (
        <Layout style={{ minHeight: 'calc(100vh - 70px)' }}>
            <FloatButton.BackTop />
            {query.get('sider') != 'false' && (
                <Sider width={'15%'} style={{ marginRight: '20px' }}>
                    <Menu
                        onClick={menuClick}
                        style={{
                            height: '100%',
                            minWidth: '160px'
                        }}
                        mode='inline'
                        items={items}
                        selectedKeys={[currentMenu]}
                    />
                </Sider>
            )}
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
