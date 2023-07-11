import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Badge, Button, Select, Form, Input, message, Space } from 'antd';
import { createInstance, operateInstance, removeInstance, getTemplateList, getModelList } from '@/api/console';
import { downloadFile } from '@/api/file';
import { useRequest } from '@umijs/hooks';

export default function DetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList } = props;
    const { title, description, instance_id, template, model, url, created_at, data_file_name, data_file_path } = data;

    const [status, setStatus] = useState(data.status);

    useEffect(() => {
        setStatus(data.status);
    }, [data]);

    const { loading, run: operate } = useRequest(
        async data => {
            const res = await operateInstance(data);

            return res;
        },
        {
            manual: true
        }
    );

    const { data: templateList } = useRequest(async data => {
        const res = await getTemplateList();

        return res.data?.list || [];
    });

    const { data: modelList } = useRequest(async () => {
        const res = await getModelList();

        return res.data?.list || [];
    });

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async () => {
        const values = form.getFieldsValue();
        values.data_file_names =
            values.data_file?.map(file => {
                return file.name;
            }) || [];

        delete values.data_file;

        const res = await createInstance(values);

        if (res.code === 0) {
            messageApi.success(`instance created successfully`);
            refreshList();
            onClose();
        } else {
            messageApi.error(res.msg);
        }
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
                                options={templateList.map(item => {
                                    return {
                                        value: item.title,
                                        label: item.title
                                    };
                                })}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Model'
                            name='model'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose a model'
                                }
                            ]}>
                            <Select
                                options={modelList.map(item => {
                                    return {
                                        value: item.name,
                                        label: item.name
                                    };
                                })}
                            />
                        </Form.Item>

                        <Form.Item label='URL' name='url'>
                            <Input />
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
                        <Descriptions.Item label='Template'>{template}</Descriptions.Item>
                        <Descriptions.Item label='Model'>{model}</Descriptions.Item>
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
                        <Descriptions.Item label='data file'>
                            <Button
                                type='link'
                                size='small'
                                onClick={async () => {
                                    const res = await downloadFile({
                                        file_name: data_file_name,
                                        file_path: data_file_path
                                    });

                                    if (res.code === -1) {
                                        messageApi.error(res.msg);
                                    } else {
                                        const blob = new Blob([res], {
                                            type: 'application/octet-stream'
                                        });

                                        const link = document.createElement('a');

                                        link.download = data_file_name;

                                        link.href = URL.createObjectURL(blob);
                                        document.body.appendChild(link);
                                        link.click();

                                        URL.revokeObjectURL(link.href);
                                        document.body.removeChild(link);
                                    }
                                }}>
                                {data_file_name}
                            </Button>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
}
