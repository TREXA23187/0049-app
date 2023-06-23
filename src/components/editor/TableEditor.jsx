import React, { useState } from 'react';
import { Button, Tag } from 'antd';
import TableModal from './TableModal';

export default function TableEditor(props) {
  const { propConfig, value, updateValue } = props;
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [data, setData] = useState(value || []);

  const handleOk = (newData) => {
    setIsTableModalOpen(false);
    setData(newData);
    updateValue(newData);
  };

  const handleCancel = () => {
    setIsTableModalOpen(false);
  };

  return (
    <>
      <TableModal
        config={propConfig}
        data={data}
        updateData={setData}
        isModalOpen={isTableModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <div>
        {(!data || data.length === 0) && (
          <Button onClick={() => setIsTableModalOpen(true)}>Add</Button>
        )}

        {(data || []).map((item, index) => {
          return (
            <Tag
              key={index}
              color='processing'
              style={{ cursor: 'pointer' }}
              onClick={() => setIsTableModalOpen(true)}
            >
              {item[propConfig.table.key]}
            </Tag>
          );
        })}
      </div>
    </>
  );
}
