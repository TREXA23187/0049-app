import React from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';

export default function SignUpModal(props) {
    const { t } = useTranslation();
    const { isModalOpen, handleOk, handleCancel } = props;

    const [form] = Form.useForm();

    return (
        <Modal
            title='Sign Up'
            open={isModalOpen}
            footer={null}
            style={{ position: 'relative' }}
            onCancel={handleCancel}>
            <Form
                name='sign_up_form'
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
                style={{
                    maxWidth: 400
                }}
                form={form}
                onFinish={() => handleOk({ ...form.getFieldsValue(), role: 'user' })}>
                <Form.Item
                    label='Username'
                    name='user_name'
                    rules={[{ required: true, message: t('please input username') }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: t('please input password') }]}>
                    <Input.Password type='password' />
                </Form.Item>
                <Form.Item>
                    <div style={{ width: 400 }}>
                        <Button style={{ width: 120, marginLeft: 100 }} danger onClick={handleCancel}>
                            {t('Cancel')}
                        </Button>
                        <Button htmlType='submit' type='primary' style={{ width: 120, marginLeft: '10%' }}>
                            {t('Sign up')}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}
