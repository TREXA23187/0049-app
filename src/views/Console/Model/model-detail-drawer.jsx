import React, { useState } from 'react';
import { Drawer, Descriptions, Button, Switch, Form, Input, message, Upload } from 'antd';
import { createModel } from '@/api/console';
import { UploadOutlined } from '@ant-design/icons';

export default function ModelDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList } = props;
    console.log(data);
    const { is_github } = data;

    const [fileList, setFileList] = useState([]);
    const [showGithub, setShowGithub] = useState(false);

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
        console.log(form.getFieldsValue());
        const values = {
            ...form.getFieldsValue(),
            is_github: showGithub
        };

        const res = await createModel(values);
        if (res.code === 0) {
            messageApi.success('model created successfully');
        } else {
            messageApi.error(res.msg);
        }
        refreshList();
        onClose();
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
            <Drawer title={isEdit ? 'Edit Model' : 'Create Model'} placement='right' onClose={onClose} open={open}>
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
                        label='Model File'
                        name='model_file'
                        valuePropName='fileList'
                        getValueFromEvent={normFile}>
                        <Upload {...fileUploadProps}>
                            {fileList?.length < 1 && <Button icon={<UploadOutlined />}>Click to Upload</Button>}
                        </Upload>
                    </Form.Item>

                    <Form.Item label='Github' valuePropName='is_github'>
                        <Switch onChange={setShowGithub} />
                    </Form.Item>

                    {showGithub && (
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
            </Drawer>
        </>
    );
}
