import React, { useState } from 'react';
import { Button, Modal, Table, Space, Input } from 'antd';
import deepcopy from 'deepcopy';

export default function TableModal(props) {
  const { config, data, isModalOpen, handleOk, handleCancel } = props;

  const [editData, setEditData] = useState(
    data.map((item, index) => {
      item.key = index;
      return item;
    }) || []
  );

  let columns = [
    {
      title: '',
      dataIndex: 'key',
      rowScope: 'row',
    },
  ];

  const optionColumns = config.table.options.map((item, index) => {
    return {
      title: item.label,
      dataIndex: item.label,
      key: index,
      render: (_, record) => {
        return (
          <Input
            value={record[item.label]}
            onChange={(e) => {
              const copyData = deepcopy(editData);
              copyData[record.key][item.label] = e.target.value;
              setEditData(copyData);
            }}
          />
        );
      },
    };
  });

  columns = [...columns, ...optionColumns];

  columns.push({
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Button
          type='text'
          danger
          onClick={() => {
            const newEditData = deepcopy(editData);
            newEditData.splice(record.key, 1);
            setEditData(newEditData);
          }}
        >
          Delete
        </Button>
      </Space>
    ),
  });

  return (
    <Modal
      title={config.label}
      open={isModalOpen}
      footer={
        <>
          <Button
            onClick={() => {
              setEditData(data || []);
              handleCancel();
            }}
            danger
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleOk(editData);
            }}
            type='primary'
          >
            OK
          </Button>
        </>
      }
      onCancel={handleCancel}
      style={{ position: 'relative' }}
    >
      <Space style={{ marginBottom: 8 }}>
        <Button
          onClick={() => setEditData([...editData, { key: editData.length }])}
        >
          Add
        </Button>
        {/* <Button>Reset</Button> */}
      </Space>
      <Table columns={columns} dataSource={editData} />
    </Modal>
  );
}
