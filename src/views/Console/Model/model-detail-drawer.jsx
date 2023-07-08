import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Badge, Button, Select, Form, Input, message, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createInstance, operateInstance, removeInstance } from '@/api/console';
import { useRequest } from '@umijs/hooks';

export default function ModelDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList } = props;
    const { title, description, instance_id, template_id, model_id, url, created_at } = data;

    const [fileList, setFileList] = useState([]);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const fileUploadProps = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text'
        },
        onChange(info) {
            if (info.file.status === 'done') {
                messageApi.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                messageApi.error(`${info.file.name} file upload failed.`);
            }

            let newFileList = [...info.fileList];

            // 1. Limit the number of uploaded files
            // Only to show two recent uploaded files, and old ones will be replaced by the new
            newFileList = newFileList.slice(-2);

            // 2. Read from response and show file link
            newFileList = newFileList.map(file => {
                if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url;
                }
                return file;
            });
            setFileList(newFileList);
        }
    };

    const onFinish = async () => {
        const res = await createInstance(form.getFieldsValue());

        if (res.code === 0) {
            messageApi.success(`instance created successfully`);
        } else {
            messageApi.error(res.msg);
        }
        refreshList();
    };

    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <>
            {contextHolder}
            <Drawer
                title='Intance Detail'
                placement='right'
                onClose={onClose}
                open={open}
                extra={
                    !isEdit && (
                        <Space>
                            <Button
                                danger
                                size='small'
                                onClick={async () => {
                                    const res = await removeInstance({ id: instance_id });
                                    if (res.code === 0) {
                                        messageApi.success('removed');
                                        refreshList();
                                        onClose();
                                    } else {
                                        messageApi.error('remove failed');
                                    }
                                }}>
                                Remove
                            </Button>
                        </Space>
                    )
                }>
                {isEdit ? (
                    <Form
                        name='basic'
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
                            template: 'default',
                            model: 'dt',
                            ...data
                        }}
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={errorInfo => {
                            console.log('Failed:', errorInfo);
                        }}
                        autoComplete='off'>
                        <Form.Item
                            label='Title'
                            name='title'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input title'
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Description'
                            name='description'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input description'
                                }
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Template' name='template'>
                            <Select
                                options={[
                                    {
                                        value: 'default',
                                        label: 'default'
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy'
                                    }
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label='Model' name='model'>
                            <Select
                                options={[
                                    {
                                        value: 'dt',
                                        label: 'desicion tree'
                                    },
                                    {
                                        value: 'rf',
                                        label: 'randam forest'
                                    }
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label='URL' name='url'>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Data File'
                            name='data_file'
                            valuePropName='fileList'
                            getValueFromEvent={normFile}>
                            <Upload {...fileUploadProps}>
                                {fileList?.length < 1 && <Button icon={<UploadOutlined />}>Click to Upload</Button>}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16
                            }}>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Descriptions title={title} column={1}>
                        <Descriptions.Item label='Description'> {description}</Descriptions.Item>
                        <Descriptions.Item label='Instance ID:'>{instance_id}</Descriptions.Item>
                        <Descriptions.Item label='Template ID'>{template_id}</Descriptions.Item>
                        <Descriptions.Item label='Model'>{model_id}</Descriptions.Item>
                        <Descriptions.Item label='URL'>{url}</Descriptions.Item>
                        <Descriptions.Item label='Status'>
                            {status === 'running' ? (
                                <div>
                                    <Badge status='success' /> <span>{status}</span>{' '}
                                    <Button
                                        danger
                                        loading={loading}
                                        onClick={async () => {
                                            const res = await operate({ instance_id, operation: 'stop' });
                                            if (res.code === 0) {
                                                setStatus('exited');
                                                refreshList();
                                            }
                                        }}
                                        size='small'
                                        style={{ marginLeft: '30px' }}>
                                        stop
                                    </Button>
                                </div>
                            ) : status === 'exited' ? (
                                <div>
                                    <Badge status='error' /> <span>{status}</span>
                                    <Button
                                        type='primary'
                                        loading={loading}
                                        onClick={async () => {
                                            const res = await operate({ instance_id, operation: 'start' });
                                            if (res.code === 0) {
                                                setStatus('running');
                                                refreshList();
                                            }
                                        }}
                                        size='small'
                                        style={{ marginLeft: '30px' }}>
                                        start
                                    </Button>
                                    <Button
                                        danger
                                        loading={loading}
                                        onClick={async () => {
                                            const res = await operate({ instance_id, operation: 'remove' });
                                            if (res.code === 0) {
                                                setStatus('not exist');
                                                refreshList();
                                            }
                                        }}
                                        size='small'
                                        style={{ marginLeft: '10px' }}>
                                        remove
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Badge status='error' /> <span>{status}</span>
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label='created at'>{new Date(created_at).toString()}</Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
}