import React, { useState, useEffect } from 'react';
import { Button, InputNumber, Form, Input, ColorPicker, Select, message } from 'antd';
import TableEditor from './TableEditor';
import SwitchEditor from './SwitchEditor';

export default function EditorOperator(props) {
    const { getLastSelectedBlock, data, config, lastSelectedIndex, editData, updateContainer, updateBlock } = props;
    const [content, setContent] = useState([]);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    let formValues = {};

    const onReset = () => {
        if (lastSelectedIndex === -1) {
            formValues['container_width'] = editData?.width;
            formValues['container_height'] = editData?.height;
        } else {
            const block = getLastSelectedBlock();
            let component = config.componentMap[block.key];
            if (component?.props) {
                Object.entries(component.props).forEach(([propName, propConfig]) => {
                    formValues[propConfig.name] = editData.props[propName];
                });
            }
        }

        form.setFieldsValue(formValues);
        formValues = {};
    };

    const onApply = () => {
        if (lastSelectedIndex === -1) {
            const { container_width: width, container_height: height } = form.getFieldsValue();
            updateContainer({
                ...data,
                container: { ...data.container, width, height }
            });
        } else {
            const newProps = {};
            const newModel = {};

            Object.entries(form.getFieldsValue()).forEach(([key, value]) => {
                if (key.startsWith('props_')) {
                    newProps[key.replace('props_', '')] = value;
                } else {
                    newModel[key] = value;
                }
            });

            updateBlock(
                {
                    ...editData,
                    props: { ...editData.props, ...newProps },
                    model: { ...editData.model, ...newModel }
                },
                editData
            );
        }

        messageApi.open({
            type: 'success',
            content: 'Successfully applied!'
        });
    };

    useEffect(() => {
        if (!getLastSelectedBlock() || lastSelectedIndex === -1) {
            formValues['container_width'] = editData?.width;
            formValues['container_height'] = editData?.height;

            setContent([
                <>
                    <Form.Item label='Container Width' name='container_width'>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Container Height' name='container_height'>
                        <InputNumber />
                    </Form.Item>
                </>
            ]);
        } else {
            const block = getLastSelectedBlock();
            let component = config.componentMap[block?.key];

            let contentTmp = [];

            if (component && component.props) {
                const formItems = Object.entries(component.props).map(([propName, propConfig], index) => {
                    formValues[`props_${propConfig.name}`] = editData.props[propName];

                    return (
                        <Form.Item label={propConfig.label} name={`props_${propConfig.name}`} key={propConfig.name}>
                            {{
                                input: () => <Input />,
                                inputNum: () => <InputNumber />,
                                color: () => <ColorPicker format={'hex'} />,
                                select: () => (
                                    <Select
                                        options={propConfig.options.map(opt => {
                                            return {
                                                label: opt.label,
                                                value: opt.value
                                            };
                                        })}
                                    />
                                ),
                                table: () => (
                                    <TableEditor
                                        propConfig={propConfig}
                                        value={form.getFieldValue(`props_${propConfig.name}`)}
                                        updateValue={newValue =>
                                            form.setFieldValue(`props_${propConfig.name}`, newValue)
                                        }
                                    />
                                ),
                                switch: () => (
                                    <SwitchEditor
                                        value={form.getFieldValue(`props_${propConfig.name}`) || false}
                                        updateValue={checked => {
                                            form.setFieldValue(`props_${propConfig.name}`, checked);
                                        }}
                                    />
                                )
                            }[propConfig.type]()}
                        </Form.Item>
                    );
                });

                contentTmp = [...contentTmp, formItems];
            }

            if (component && component.model) {
                contentTmp.push(
                    Object.entries(component.model).map(([modelName, label]) => {
                        formValues[modelName] = editData.model[modelName];

                        return (
                            <Form.Item label={label} name={modelName} key={modelName}>
                                <Input />
                            </Form.Item>
                        );
                    })
                );
            }

            setContent(contentTmp);
        }

        form.setFieldsValue(formValues);

        formValues = {};
    }, [lastSelectedIndex, getLastSelectedBlock()]);

    return (
        <div>
            {/* Attribution */}
            {contextHolder}
            <Form
                name='basic'
                style={{
                    maxWidth: 300
                }}
                form={form}
                autoComplete='off'>
                {content.map((item, index) => {
                    return <div key={index}>{item}</div>;
                })}
                <Form.Item
                    wrapperCol={{
                        offset: 4
                    }}>
                    <Button type='primary' onClick={onApply}>
                        Apply
                    </Button>
                    <Button style={{ marginLeft: '10px' }} onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
