import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select } from 'antd';

export default function AddAdvanceItem() {
    return (
        <>
            <Form.List name='hyper_parameters'>
                {(fields, { add, remove }) => {
                    return (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 3
                                    }}
                                    align='baseline'>
                                    <Form.Item {...restField} name={[name, 'param_label']}>
                                        <Input
                                            placeholder='Label'
                                            style={{
                                                width: 100
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing label'
                                                }
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item {...restField} label='Values' name={[name, 'param_value']}>
                                        <Select
                                            style={{
                                                width: 140
                                            }}
                                            mode='tags'
                                            options={[
                                                { label: 'range', value: 'range' },
                                                { label: 'input options', value: 'select', disabled: true }
                                            ]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing value'
                                                }
                                            ]}
                                        />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: '50px' }} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type='dashed'
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    style={{ marginLeft: '30%', width: '210px' }}>
                                    Add Field
                                </Button>
                            </Form.Item>
                        </>
                    );
                }}
            </Form.List>
        </>
    );
}
