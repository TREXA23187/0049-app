import React, { useState, useEffect } from 'react';
import { Drawer, Button, Form, Input, message, Select, Upload, Divider, Descriptions, Badge, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createTask, getInstanceList, operateTask, getTemplateList, getModelList } from '@/api/console';
import { getFileInfo } from '@/api/file';
import { useRequest } from '@umijs/hooks';

export default function TaskDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList } = props;
    const { name, id, instance_id, status, created_at, type } = data;

    const [taskType, setTaskType] = useState();
    const [fileCols, setFileCols] = useState([]);
    const [currentFilePath, setCurrentFilePath] = useState('');

    const [fileList, setFileList] = useState([]);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const { data: templateList } = useRequest(async data => {
        const res = await getTemplateList();

        return res.data?.list || [];
    });

    const { data: modelList } = useRequest(async () => {
        const res = await getModelList();

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
            const cols = await getFileColumns(currentFilePath);

            setFileCols(cols || []);
        })();
    }, [currentFilePath]);

    const fileUploadProps = {
        action: 'http://localhost:3000/api/v1/file/upload?type=data',
        headers: {
            authorization: 'authorization-text'
        },
        beforeUpload: file => {
            const isCSV = file.type === 'text/csv';
            if (!isCSV) {
                messageApi.error(`${file.name} is not a text file`);
            }
            return isCSV || Upload.LIST_IGNORE;
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
            // newFileList = newFileList.slice(-2);

            // 2. Read from response and show file link
            newFileList = newFileList.map(file => {
                if (file.response) {
                    // Component will show file.url as link
                    setCurrentFilePath(file.response?.data?.file_path);
                    file.url = file.response.url;
                }
                return file;
            });
            setFileList(newFileList);
        }
    };

    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish = async () => {
        const values = form.getFieldsValue();
        values.data_file_names =
            values.data_file?.map(file => {
                return file.name;
            }) || [];

        delete values.data_file;

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

                        {taskType === 'training' && (
                            <>
                                <Divider orientation='left' orientationMargin='0' plain>
                                    Training Attributes
                                </Divider>

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
                                <Form.Item
                                    label='Data File'
                                    name='data_file'
                                    valuePropName='fileList'
                                    getValueFromEvent={normFile}>
                                    <Upload {...fileUploadProps}>
                                        {fileList?.length < 1 && (
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        )}
                                    </Upload>
                                </Form.Item>

                                {fileList.length > 0 && (
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
                                            options={fileCols?.map(item => {
                                                return {
                                                    value: item,
                                                    label: item
                                                };
                                            })}
                                        />
                                    </Form.Item>
                                )}
                            </>
                        )}

                        {taskType === 'deployment' && (
                            <>
                                <Divider orientation='left' orientationMargin='0' plain>
                                    Deployment Attributes
                                </Divider>

                                <Form.Item
                                    label='Template'
                                    name='template'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose a template'
                                        }
                                    ]}>
                                    <Select
                                        options={templateList.map(item => {
                                            return {
                                                value: item.name,
                                                label: item.name
                                            };
                                        })}
                                    />
                                </Form.Item>
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
                                    <Button
                                        type='primary'
                                        onClick={async () => {
                                            const res = await operateTask({
                                                task_id: id.toString(),
                                                operation: 'start'
                                            });
                                            console.log(res);
                                            // if (res.code === 0) {
                                            //     // setStatus('running');
                                            //     refreshList();
                                            // }
                                        }}
                                        size='small'
                                        style={{ marginLeft: '30px' }}>
                                        start
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
