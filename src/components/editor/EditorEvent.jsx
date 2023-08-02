import React, { useState, useEffect } from 'react';
import { Button, InputNumber, Form, Input, ColorPicker, Select, message } from 'antd';
import TableEditor from './TableEditor';
import SwitchEditor from './SwitchEditor';

export default function EditorEvent(props) {
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
            updateBlock(
                {
                    ...editData,
                    event: form.getFieldsValue()
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
        } else {
            const block = getLastSelectedBlock();
            let component = config.componentMap[block?.key];

            let contentTmp = [];

            if (component && component.event) {
                contentTmp.push(
                    Object.entries(component.event).map(([eventName, label]) => {
                        formValues[eventName] = editData.event[eventName];

                        return (
                            <Form.Item label={label} name={eventName} key={eventName}>
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
                layout='vertical'
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
