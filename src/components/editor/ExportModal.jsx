import React from 'react';
import { Button, Modal, Input, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function ExportModal(props) {
  const { option, setOption, isModalOpen, handleOk, handleCancel } = props;
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Modal
      title={option.title}
      open={isModalOpen}
      footer={
        option.footer ? (
          <>
            <Button onClick={handleCancel} danger>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (option.callback) {
                  option.callback(option.content);
                } else {
                  handleOk();
                }
              }}
              type='primary'
            >
              OK
            </Button>
          </>
        ) : null
      }
      onCancel={handleCancel}
      onOk={handleOk}
      style={{ position: 'relative' }}
    >
      <TextArea
        style={{ height: '180px', resize: 'none', cursor: 'text' }}
        value={option.content}
        onChange={(e) => setOption({ ...option, content: e.target.value })}
        disabled={option.isExport}
        bordered={!option.isExport}
      />

      {contextHolder}
      {option.isExport && (
        <CopyOutlined
          style={{
            position: 'absolute',
            right: 20,
            bottom: 15,
            fontSize: 16,
            cursor: 'pointer',
          }}
          onClick={() => {
            navigator.clipboard.writeText(option.content);
            messageApi.open({
              type: 'success',
              content: 'Copy successfully',
            });
          }}
        />
      )}
    </Modal>
  );
}
