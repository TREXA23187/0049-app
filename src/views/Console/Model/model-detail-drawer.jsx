import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Badge, Button, Switch, Form, Input, message, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';

export default function ModelDetailDrawer(props) {
    const { data, open, isEdit, onClose, refreshList } = props;
    const { title } = data;

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
        // const res = await createInstance(form.getFieldsValue());
        // if (res.code === 0) {
        //     messageApi.success(`instance created successfully`);
        // } else {
        //     messageApi.error(res.msg);
        // }
        // refreshList();
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
            <Drawer title='Model Detail' placement='right' onClose={onClose} open={open}>
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

                        <Form.Item label='Github' valuePropName='checked'>
                            <Switch onChange={setShowGithub} />
                        </Form.Item>

                        {showGithub && (
                            <Form.Item label='Github Link' name='github_link'>
                                <Input />
                            </Form.Item>
                        )}

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
                        <Descriptions.Item label='Description'> {123}</Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
}
