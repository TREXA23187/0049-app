import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Checkbox } from 'antd';
import { createInstanceLink } from '@/api/console';

export default function CreateLinkModal(props) {
    const { isModalOpen, handleOk, handleCancel, data } = props;

    const onFinish = async values => {
        const res = await createInstanceLink({ ...values, instance: data.name, template: data.template });
        console.log(res);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Modal title='Create Link' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    name='basic'
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    style={{
                        width: '90%',
                        padding: '10px'
                    }}
                    initialValues={{
                        link_type: 'public',
                        autofill: true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'>
                    <Form.Item label='Instance' name='instance'>
                        <span>{data.name}</span>
                    </Form.Item>
                    <Form.Item label='Template' name='template'>
                        <span>{data.template}</span>
                    </Form.Item>

                    <Form.Item label='Link Type' name='link_type'>
                        <Radio.Group>
                            <Radio value='public'>Public Link</Radio>
                            <Radio value='private'>Private Link</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name='autofill'
                        valuePropName='checked'
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        <Checkbox>Autofill the Submit URL</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        <Button type='primary' htmlType='submit'>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
