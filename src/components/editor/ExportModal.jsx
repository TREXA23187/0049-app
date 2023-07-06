import React, { useState } from 'react';
import { Button, Modal, Input, message, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function ExportModal(props) {
    const { option, setOption, isModalOpen, handleOk, handleCancel } = props;
    const [messageApi, contextHolder] = message.useMessage();

    const [exportTitle, setExportTitle] = useState('');

    return (
        <Modal
            title={option.title}
            open={isModalOpen}
            footer={
                <>
                    <Button onClick={handleCancel} danger>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (option.callback) {
                                option.isExport
                                    ? option.callback(exportTitle, option.content)
                                    : option.callback(option.content);
                            } else {
                                handleOk();
                            }
                        }}
                        type='primary'>
                        OK
                    </Button>
                </>
            }
            onCancel={handleCancel}
            onOk={handleOk}
            style={{ position: 'relative', minHeight: '400px' }}>
            {option.isExport && (
                <Space>
                    <span>title:</span>
                    <Input
                        style={{ width: '300px' }}
                        value={exportTitle}
                        onChange={e => {
                            setExportTitle(e.target.value);
                        }}
                    />
                </Space>
            )}
            <TextArea
                style={{ minHeight: '250px', resize: 'none', cursor: 'text' }}
                value={option.content}
                onChange={e => setOption({ ...option, content: e.target.value })}
                disabled={option.isExport}
                bordered={!option.isExport}
            />

            {contextHolder}
        </Modal>
    );
}
