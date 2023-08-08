import React, { useState, useEffect } from 'react';
import { Drawer, Button, Descriptions, Form, Input, message, Upload, Select, Tag, Typography } from 'antd';
import { BASE_URL } from '@/constants';
import { createModel } from '@/api/console';
import { UploadOutlined } from '@ant-design/icons';
import { downloadFile } from '@/api/file';
import { downloadLink } from '@/utils';
import AddAdvanceItem from './add-advance-item';

const { Text } = Typography;

export default function ModelDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList } = props;
    const { name, type, model_file_name, model_file_path, hyper_parameters, created_at } = data;

    const [fileList, setFileList] = useState([]);
    const [showGithub, setShowGithub] = useState(false);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setShowGithub(data.is_github ?? false);
    }, [data.is_github]);

    useEffect(() => {
        form.setFieldsValue({ ...form.getFieldValue, ...data });
    }, [data]);

    const fileUploadProps = {
        action: `http://${BASE_URL}:3000/api/v1/file/upload?type=model`,
        beforeUpload: file => {
            const isPyFile = file.type === 'text/x-python-script';
            if (!isPyFile) {
                messageApi.error(`${file.name} is not a python script file`);
            }
            return isPyFile || Upload.LIST_IGNORE;
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
                    file.url = file.response.url;
                }
                return file;
            });
            setFileList(newFileList);
        }
    };

    const clearDataAndClose = () => {
        form.resetFields();
        setShowGithub(false);
        setFileList([]);

        onClose();
    };

    const onFinish = async () => {
        const values = {
            ...form.getFieldsValue(),
            is_github: showGithub
        };

        values.model_file_names = values.model_file?.map(file => {
            return file.name;
        }) || [''];

        values.model_file_paths = values.model_file?.map(file => {
            return file.response.data.file_path;
        }) || [''];

        delete values.model_file;

        if (values.hyper_parameters) {
            values.hyper_parameters = values.hyper_parameters.filter(item => item);
            values.hyper_parameters = values.hyper_parameters.reduce((prev, cur) => {
                if (cur['param_label'] && cur['param_value']) {
                    if (cur['param_value'].includes('range')) {
                        prev[cur['param_label']] = { type: 'range', option: [1, 20] };
                    } else {
                        prev[cur['param_label']] = { type: 'select', option: cur['param_value'] };
                    }
                }

                return prev;
            }, {});
            values.hyper_parameters = JSON.stringify(values.hyper_parameters);
        }

        const res = await createModel(values);
        if (res.code === 0) {
            messageApi.success('model created successfully');
        } else {
            messageApi.error(res.msg);
        }

        refreshList();
        clearDataAndClose();
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
                title={isEdit ? 'Create Model' : 'Model Details'}
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
                        form={form}
                        onFinish={onFinish}
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
                                    message: 'Please select model type'
                                }
                            ]}>
                            <Select
                                options={[
                                    { value: 'classification', label: 'Classification' },
                                    { value: 'regression', label: 'Regression' }
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Model File (.py)'
                            name='model_file'
                            valuePropName='fileList'
                            getValueFromEvent={normFile}>
                            <Upload {...fileUploadProps}>
                                {fileList?.length < 1 && <Button icon={<UploadOutlined />}>Click to Upload</Button>}
                            </Upload>
                        </Form.Item>

                        {/* <Form.Item label='Github'>
                        <Switch onChange={setShowGithub} checked={showGithub} />
                    </Form.Item> */}

                        {/* {showGithub && (
                        <Form.Item
                            label='Github Link'
                            name='github_link'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input github link'
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                    )} */}

                        <div style={{ marginBottom: '8px' }}>Hyper Parameters:</div>

                        <AddAdvanceItem />

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
                    <Descriptions title={name} column={1} layout='vertical'>
                        <Descriptions.Item label='Name'>{name}</Descriptions.Item>
                        <Descriptions.Item label='Type'>
                            <Tag color={type === 'classification' ? 'green' : 'blue'}>{type}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label='Hyper Parameters'>
                            {hyper_parameters && (
                                <div>
                                    {Object.keys(JSON.parse(hyper_parameters)).map(key => {
                                        console.log();
                                        return (
                                            <div key={key}>
                                                <Text strong>{key}</Text>:
                                                <Text code>
                                                    {JSON.stringify(JSON.parse(hyper_parameters)[key]['option'])}
                                                </Text>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label='Model File'>
                            <Button
                                type='link'
                                size='small'
                                onClick={async () => {
                                    const res = await downloadFile({
                                        file_name: model_file_name,
                                        file_path: model_file_path
                                    });

                                    if (res.code === -1) {
                                        messageApi.error(res.msg);
                                    } else {
                                        downloadLink(res, model_file_name);
                                    }
                                }}>
                                {model_file_name}
                            </Button>
                        </Descriptions.Item>
                        <Descriptions.Item label='Created At'>{new Date(created_at).toString()}</Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
}
