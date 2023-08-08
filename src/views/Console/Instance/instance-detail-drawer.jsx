import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Badge, Button, Select, Form, Input, message, Space, Typography } from 'antd';
import { LinkOutlined, DownloadOutlined } from '@ant-design/icons';
import { createInstance, operateInstance, removeInstance, getInstanceLogs } from '@/api/console';
import { useRequest } from '@umijs/hooks';
import { BASE_URL } from '@/constants';
import { downloadLink } from '@/utils';
import CreateLinkModal from './create-link-modal';

const { Text } = Typography;

export default function InstanceDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList, imageList } = props;
    const { name, description, instance_id, task, url, created_at, task_type } = data;

    const [status, setStatus] = useState(data.status);
    const [link, setLink] = useState(data.link || '');

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setStatus(data.status);
        setLink(data.link);
    }, [data]);

    useEffect(() => {
        form.setFieldsValue({ ...form.getFieldValue, ...data });
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

    const clearDataAndClose = () => {
        form.resetFields();
        onClose();
    };

    const onFinish = async () => {
        const values = form.getFieldsValue();

        const res = await createInstance(values);

        if (res.code === 0) {
            messageApi.success(`instance created successfully`);

            refreshList();
            clearDataAndClose();
        } else {
            messageApi.error(res.msg);
        }
    };

    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

    const handleCreateLinkModelOk = newLink => {
        setLink(newLink);
        refreshList();
        setIsCreateLinkModalOpen(false);
    };

    return (
        <>
            {contextHolder}
            <CreateLinkModal
                isModalOpen={isCreateLinkModalOpen}
                handleOk={handleCreateLinkModelOk}
                data={data}
                handleCancel={() => setIsCreateLinkModalOpen(false)}
                refreshList={refreshList}
                updateLink={setLink}
            />
            <Drawer
                title={isEdit ? 'Create Instance' : 'Instance Detail'}
                placement='right'
                onClose={clearDataAndClose}
                open={open}
                extra={
                    !isEdit &&
                    status === 'not exist' && (
                        <Space>
                            <Button
                                danger
                                size='small'
                                onClick={async () => {
                                    const res = await removeInstance({ id: instance_id });
                                    if (res.code === 0) {
                                        messageApi.success('removed');
                                        refreshList();
                                        clearDataAndClose();
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
                        name='create_instance_form'
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
                            label='Name'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name'
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

                        <Form.Item
                            label='Image'
                            name='image'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select image'
                                }
                            ]}>
                            <Select
                                options={imageList?.map(item => {
                                    return {
                                        value: item.repository,
                                        label: item.repository
                                    };
                                })}
                            />
                        </Form.Item>

                        {/* <Form.Item label='URL' name='url'>
                            <Input />
                        </Form.Item> */}

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
                    <Descriptions title={name} column={1} layout='vertical'>
                        <Descriptions.Item label='Description'> {description}</Descriptions.Item>
                        <Descriptions.Item label='Instance ID:'>{instance_id}</Descriptions.Item>
                        <Descriptions.Item label='Task'>{task}</Descriptions.Item>
                        <Descriptions.Item label='URL'>
                            {task_type === 'training' ? (
                                <Text copyable>{`${BASE_URL}:${url?.split(':')[1]}`}</Text>
                            ) : (
                                <>
                                    {link && <Text copyable>{link.replace('127.0.0.1', BASE_URL)}</Text>}
                                    <Button
                                        type='link'
                                        size='small'
                                        onClick={() => {
                                            setIsCreateLinkModalOpen(true);
                                        }}>
                                        Create Link
                                        <LinkOutlined />
                                    </Button>
                                </>
                            )}
                        </Descriptions.Item>
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
                        <Descriptions.Item label='Created at'>{new Date(created_at).toString()}</Descriptions.Item>
                        <Descriptions.Item label='Log File'>
                            <Button
                                type='link'
                                size='small'
                                onClick={async () => {
                                    const res = await getInstanceLogs({ instance_id });
                                    if (res.code === -1) {
                                        messageApi.error(res.msg);
                                    } else {
                                        downloadLink(res, 'logs.txt');
                                    }
                                }}>
                                Download Log File
                                <DownloadOutlined />
                            </Button>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
}
