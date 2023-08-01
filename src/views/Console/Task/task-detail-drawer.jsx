import React, { useState, useEffect } from 'react';
import { Drawer, Button, Form, Input, message, Select, Upload, Divider, Descriptions, Badge, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BASE_URL } from '@/constants';
import { createTask, getTemplateList, getModelList, getTaskList } from '@/api/console';
import { getFileInfo } from '@/api/file';
import { useRequest } from '@umijs/hooks';
import { downloadFile } from '@/api/file';
import { downloadLink } from '@/utils';

function statusBadge(rol) {
    if (rol === 'pending') {
        return (
            <div>
                <Badge status='default' /> <span>{rol}</span>
            </div>
        );
    } else if (rol === 'running') {
        return (
            <div>
                <Badge status='processing' /> <span>{rol}</span>
            </div>
        );
    } else if (rol === 'completed') {
        return (
            <div>
                <Badge status='success' /> <span>{rol}</span>
            </div>
        );
    } else {
        return (
            <div>
                <Badge status='error' /> <span>{rol}</span>
            </div>
        );
    }
}

export default function TaskDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList } = props;
    const {
        name,
        model,
        template,
        status,
        created_at,
        type,
        data_file_name,
        data_file_path,
        trained_model_file_name,
        trained_model_file_path
    } = data;

    const [taskType, setTaskType] = useState();
    const [modelType, setModelType] = useState();
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

    const { data: taskList } = useRequest(async () => {
        const res = await getTaskList();

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

    useEffect(() => {
        form.setFieldsValue({ ...form.getFieldValue, ...data });
    }, [data]);

    const fileUploadProps = {
        action: `http://${BASE_URL}:3000/api/v1/file/upload?type=data`,
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

    const clearDataAndClose = () => {
        form.resetFields();
        onClose();
    };

    const onFinish = async () => {
        const values = form.getFieldsValue();

        if (taskType == 'training') {
            values.data_file_names =
                values.data_file?.map(file => {
                    return file.name;
                }) || [];

            values.data_file_paths =
                values.data_file?.map(file => {
                    return file.response.data.file_path;
                }) || [];

            delete values.data_file;
        }

        if (taskType == 'deployment') {
            const trained_model = JSON.parse(values.trained_model);
            values.trained_model_file_name = trained_model.name;
            values.trained_model_file_path = trained_model.path;

            delete values.trained_model;
        }

        const res = await createTask(values);

        if (res.code === 0) {
            messageApi.success('task created successfully');

            refreshList();
            clearDataAndClose();
        } else {
            messageApi.error(res.msg);
        }
    };

    return (
        <>
            {contextHolder}
            <Drawer
                title={isEdit ? 'Create Task' : 'Task Detail'}
                placement='right'
                onClose={clearDataAndClose}
                open={open}>
                {isEdit ? (
                    <Form
                        name='basic'
                        style={{
                            maxWidth: '85%'
                        }}
                        labelCol={{
                            span: 10
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

                                <Form.Item label='Model Type' name='model_type'>
                                    <Select
                                        options={[
                                            { value: 'classification', label: 'Classification' },
                                            { value: 'regression', label: 'Regression' }
                                        ]}
                                        onChange={setModelType}
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
                                        options={modelList
                                            .filter(model => !modelType || model.type === modelType)
                                            .map(item => {
                                                return {
                                                    value: item.name,
                                                    label: item.name
                                                };
                                            })}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Data File (.csv)'
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
                                <Form.Item
                                    label='Trained Model'
                                    name='trained_model'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose a trained model'
                                        }
                                    ]}>
                                    <Select
                                        options={taskList.map(item => {
                                            return {
                                                value: JSON.stringify({
                                                    name: item.trained_model_file_name,
                                                    path: item.trained_model_file_path
                                                }),
                                                label: item.trained_model_file_name
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
                        <Descriptions.Item label='Type:'>
                            <Tag color={type === 'training' ? 'green' : 'blue'}>{type}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label='Status'>{statusBadge(status)}</Descriptions.Item>
                        {type === 'training' ? (
                            <Descriptions.Item label='Model:'>{model}</Descriptions.Item>
                        ) : (
                            <Descriptions.Item label='Template:'>{template}</Descriptions.Item>
                        )}
                        <Descriptions.Item label='Created At'>{new Date(created_at).toString()}</Descriptions.Item>
                        {type === 'training' && (
                            <Descriptions.Item label='Data File'>
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
                                            downloadLink(res, data_file_name);
                                        }
                                    }}>
                                    {data_file_name}
                                </Button>
                            </Descriptions.Item>
                        )}
                        {type === 'training' && (
                            <Descriptions.Item label='Trained Model'>
                                {trained_model_file_path && (
                                    <Button
                                        type='link'
                                        size='small'
                                        onClick={async () => {
                                            const res = await downloadFile({
                                                file_name: trained_model_file_name,
                                                file_path: trained_model_file_path
                                            });

                                            if (res.code === -1) {
                                                messageApi.error(res.msg);
                                            } else {
                                                downloadLink(res, trained_model_file_name);
                                            }
                                        }}>
                                        {trained_model_file_name}
                                    </Button>
                                )}
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
}
