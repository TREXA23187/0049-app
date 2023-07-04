import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AsyncLoadable from '@/utils/AsyncLoadable';
import 'animate.css';
import './style/base.less';
import './style/App.less';

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';

// 公共模块
const DefaultLayout = AsyncLoadable(() => import(/* webpackChunkName: 'default' */ './containers'));

// 基础页面
const View404 = AsyncLoadable(() => import(/* webpackChunkName: '404' */ './views/Others/404'));
const View500 = AsyncLoadable(() => import(/* webpackChunkName: '500' */ './views/Others/500'));
const Login = AsyncLoadable(() => import(/* webpackChunkName: 'login' */ './views/Login'));

const App = () => {
    const [locale, setLocal] = useState(enUS);

    const changeLocale = e => {
        const localeValue = e.target.value;
        setLocal(localeValue);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00B8FF'
                }
            }}
            locale={locale}>
            <Router>
                <Switch>
                    <Route path='/' exact render={() => <Redirect to='/index' />} />
                    <Route path='/500' component={View500} />
                    <Route path='/login' component={Login} />
                    <Route path='/404' component={View404} />
                    <Route render={() => <DefaultLayout />} />
                </Switch>
            </Router>
        </ConfigProvider>
    );
};

export default App;
