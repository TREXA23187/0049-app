import React from 'react';
import { Switch } from 'antd';

export default function SwitchEditor(props) {
  const { propConfig, value, updateValue } = props;

  return (
    <Switch checked={value} onChange={(checked) => updateValue(checked)} />
  );
}
