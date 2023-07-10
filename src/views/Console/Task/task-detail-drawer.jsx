import React, { useState, useEffect } from 'react';
import { Drawer, Button, Form, Input, message, Select, Alert, Divider, Descriptions, Badge, Tag } from 'antd';
import { createTask, getInstanceList } from '@/api/console';
import { getFileInfo } from '@/api/file';
import { useRequest } from '@umijs/hooks';

export default function TaskDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList } = props;
    const { name, instance_id, status, created_at, type } = data;

    const [taskType, setTaskType] = useState();
    const [currentInstanceInfo, setCurrentInstanceInfo] = useState([]);
    const [instanceFileCols, setInstanceFileCols] = useState([]);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const { data: instanceList } = useRequest(async () => {
        const res = await getInstanceList();

        return res.data?.list || [];
    });

    const { run: getFileColumns } = useRequest(
        async file_path => {
            const res = await getFileInfo({ file_path });

            return res.data || [];
        },
        {
            manual: true
        }
    );

    useEffect(() => {
        (async () => {
            const cols = await getFileColumns(currentInstanceInfo?.[0]?.data_file_path);

            setInstanceFileCols(cols);
        })();
    }, [currentInstanceInfo]);

    const onFinish = async () => {
        const values = {
            ...form.getFieldsValue()
        };

        const res = await createTask(values);

        if (res.code === 0) {
            messageApi.success('task created successfully');
            refreshList();
            onClose();
        } else {
            messageApi.error(res.msg);
        }
    };

    return (
        <>
            {contextHolder}
            <Drawer title={isEdit ? 'Create Task' : 'Task Detail'} placement='right' onClose={onClose} open={open}>
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
                            label='Instance'
                            name='instance_id'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose an instance'
                                }
                            ]}>
                            <Select
                                style={{
                                    width: 190
                                }}
                                options={instanceList?.map(item => {
                                    return {
                                        label: item?.title,
                                        value: item?.id,
                                        disabled: item.status === 'not exist'
                                    };
                                })}
                                onChange={e => {
                                    const instance = instanceList.filter(item => {
                                        return item.id === e;
                                    });

                                    setCurrentInstanceInfo(instance);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Type'
                            name='type'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose task type'
                                }
                            ]}>
                            <Select
                                style={{
                                    width: 190
                                }}
                                options={[
                                    {
                                        value: 'training',
                                        label: 'Training Task'
                                    },
                                    {
                                        value: 'deployment',
                                        label: 'Deployment Task'
                                    }
                                ]}
                                onChange={setTaskType}
                            />
                        </Form.Item>

                        {taskType === 'training' && currentInstanceInfo.length !== 0 && (
                            <>
                                <Divider orientation='left' orientationMargin='0' plain>
                                    Training Attributes
                                </Divider>
                                {currentInstanceInfo[0].data_file_name ? (
                                    <Form.Item
                                        label='Label'
                                        name='training_label'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input training label'
                                            }
                                        ]}>
                                        <Select
                                            style={{
                                                width: 190
                                            }}
                                            options={instanceFileCols?.map(item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                };
                                            })}
                                        />
                                    </Form.Item>
                                ) : (
                                    <Alert
                                        message="The instance doesn't have data file"
                                        type='warning'
                                        showIcon
                                        style={{ marginBottom: 10, height: 30 }}
                                    />
                                )}
                            </>
                        )}

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16
                            }}>
                            <Button type='primary' htmlType='submit'>
                                {isEdit ? 'Update' : 'Submit'}
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Descriptions title={name} column={1}>
                        <Descriptions.Item label='Instance ID:'>{instance_id}</Descriptions.Item>
                        <Descriptions.Item label='Type:'>
                            <Tag color={type === 'training' ? 'green' : 'blue'}>{type}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label='Status'>
                            {status === 'running' ? (
                                <div>
                                    <Badge status='success' /> <span>{status}</span>{' '}
                                    {/* <Button
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
                                    </Button> */}
                                </div>
                            ) : status === 'exited' ? (
                                <div>
                                    <Badge status='error' /> <span>{status}</span>
                                    {/* <Button
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
                                    </Button> */}
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
