import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Input, Form, Button, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ls } from '@/utils/storage';
// import { encrypt } from '@/utils/crypt';
import { login } from '@/api/user';
import { useTranslation } from 'react-i18next';
import '@/style/view-style/login.less';

const Login = props => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmitFinish = async values => {
        setLoading(true);
        let { username, password } = values;
        // const key = '751f621ea5c8f930';
        // const iv = '2624750004598718';
        // const res = await login({ username, password: encrypt(password, key, iv) });
        const res = await login({ username, password });

        if (res.code === 0) {
            ls.set('user', res.data);
            setLoading(false);
            messageApi.success(res.msg);
            props.history.push('/index');
        } else {
            setLoading(false);
            messageApi.error(res.msg);
        }
    };

    return (
        <Layout className='login animated fadeIn'>
            {contextHolder}
            <div className='model'>
                <div className='login-form'>
                    <h3>{t('0049 APP')}</h3>
                    <Divider />
                    <Form onFinish={handleSubmitFinish}>
                        <Form.Item
                            // label="Username"
                            name='username'
                            rules={[{ required: true, message: t('please input username') }]}>
                            <Input
                                placeholder={t('username')}
                                prefix={<UserOutlined className='site-form-item-icon' />}
                            />
                        </Form.Item>
                        <Form.Item
                            // label="Password"
                            name='password'
                            rules={[{ required: true, message: t('please input password') }]}>
                            <Input.Password
                                type='password'
                                placeholder={t('password')}
                                prefix={<LockOutlined className='site-form-item-icon' />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='login-form-button'
                                // style={{ width: '45%' }}
                                loading={loading}>
                                {t('Sign in')}
                            </Button>
                            {/* <Button
                                type='dashed'
                                htmlType='submit'
                                className='login-form-button'
                                style={{ width: '45%', marginLeft: '10%', backgroundColor: '#F5F5F5' }}
                                loading={loading}>
                                {t('注册')}
                            </Button> */}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(Login);
