import React, { useEffect } from 'react';
import { Drawer, Descriptions, Button, Select, Form, Input, message } from 'antd';
import { getTaskList, createImage } from '@/api/console';
import { useRequest } from '@umijs/hooks';

export default function ImageDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList, showBuildingAlert } = props;
    const { repository, size, created_at, tag, image_id } = data;

    const { data: taskList, loading } = useRequest(async () => {
        const res = await getTaskList();

        return res.data?.list || [];
    });

    useEffect(() => {
        form.setFieldsValue({ ...form.getFieldValue, ...data });
    }, [data]);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const clearDataAndClose = () => {
        form.resetFields();
        onClose();
    };

    const onFinish = async () => {
        const values = form.getFieldsValue();

        const res = await createImage(values);

        if (res.code === 0) {
            messageApi.success(res.msg);
            refreshList();
            clearDataAndClose();

            showBuildingAlert(values.repository);
        } else {
            messageApi.error(res.msg);
        }
    };

    return (
        <>
            {contextHolder}
            <Drawer
                title={isEdit ? 'Create Image' : 'Image Detail'}
                placement='right'
                onClose={clearDataAndClose}
                open={open}>
                {isEdit ? (
                    <Form
                        name='create_image_form'
                        style={{
                            maxWidth: '85%'
                        }}
                        labelCol={{
                            span: 8
                        }}
                        wrapperCol={{
                            span: 16
                        }}
                        initialValues={{
                            tag: 'latest',
                            ...data
                        }}
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={errorInfo => {
                            console.log('Failed:', errorInfo);
                        }}
                        autoComplete='off'>
                        <Form.Item
                            label='Repository'
                            name='repository'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input repository'
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Task'
                            name='task'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select task'
                                }
                            ]}>
                            <Select
                                options={taskList?.map(item => {
                                    return {
                                        value: item.name,
                                        label: item.name
                                    };
                                })}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Tag'
                            name='tag'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input tag'
                                }
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16
                            }}>
                            <Button type='primary' htmlType='submit' loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Descriptions title={repository} column={1} layout='vertical'>
                        <Descriptions.Item label='Repository'> {repository}</Descriptions.Item>
                        <Descriptions.Item label='Tag'>{tag}</Descriptions.Item>
                        <Descriptions.Item label='Image ID'>{image_id}</Descriptions.Item>
                        <Descriptions.Item label='Size'>
                            {size ? (size / (1000 * 1000)).toFixed(2) + 'MB' : ''}
                        </Descriptions.Item>
                        <Descriptions.Item label='created at'>{new Date(created_at).toString()}</Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
}
