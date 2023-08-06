import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Checkbox, message } from 'antd';
import { createInstanceLink, getTemplateInfo, updateTemplate } from '@/api/console';

export default function CreateLinkModal(props) {
    const { isModalOpen, handleOk, handleCancel, data } = props;

    const [linkType, setLinkType] = useState('private');

    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const onFinish = async values => {
        const res = await createInstanceLink({ ...values, instance: data.name, template: data.template });

        if (res.code === 0) {
            messageApi.success(res.msg);

            if (res.data.autofill) {
                const templateRes = await getTemplateInfo({ id: res.data.template_id });
                const content = JSON.parse(templateRes.data.content);
                content?.blocks?.forEach(item => {
                    if (item.key === 'button') {
                        item.event.url = res.data.redirection;
                    }
                });

                const updateTemplateRes = await updateTemplate({
                    ...templateRes.data,
                    content: JSON.stringify(content)
                });

                if (updateTemplateRes.code !== 0) {
                    messageApi.error(updateTemplateRes.msg);
                }
            }

            handleOk(res.data.link);
            form.resetFields();
        } else {
            messageApi.error(res.msg);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal title='Create Link' open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                        link_type: linkType,
                        expiration: 1,
                        autofill: true
                    }}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={errorInfo => {
                        console.log('Failed:', errorInfo);
                    }}
                    autoComplete='off'>
                    <Form.Item label='Instance' name='instance'>
                        <span>{data.name}</span>
                    </Form.Item>
                    <Form.Item label='Template' name='template'>
                        <span>{data.template}</span>
                    </Form.Item>

                    <Form.Item label='Link Type' name='link_type'>
                        <Radio.Group
                            onChange={e => {
                                setLinkType(e.target.value);
                            }}>
                            <Radio value='private'>Private Link</Radio>
                            <Radio value='public'>Public Link</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {linkType === 'private' && (
                        <Form.Item label='Expiration' name='expiration'>
                            <Radio.Group>
                                <Radio value={1}>1 Day</Radio>
                                <Radio value={3}>3 Day</Radio>
                                <Radio value={7}>7 Day</Radio>
                            </Radio.Group>
                        </Form.Item>
                    )}

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
