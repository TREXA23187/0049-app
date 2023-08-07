import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
    {
        title: 'Component',
        dataIndex: 'component',
        key: 'component',
        render: (rol, { tag_color }) => (
            <Tag color={tag_color} key={rol}>
                {rol.toUpperCase()}
            </Tag>
        )
    },
    {
        title: 'Function',
        dataIndex: 'function',
        key: 'function'
    },
    {
        title: 'Attribution',
        dataIndex: 'attribution',
        key: 'attribution'
    },
    {
        title: 'Event',
        key: 'event',
        dataIndex: 'event'
    }
];
const data = [
    {
        component: 'text',
        function: 'Labelling and explaining',
        attribution: 'text content, font color, font size',
        event: 'None',
        tag_color: 'grey'
    },
    {
        component: 'button',
        function: 'Submitting the input data',
        attribution: 'button text, button type, button size',
        event: 'Submit',
        tag_color: 'blue'
    },
    {
        component: 'input',
        function: 'Inputting data',
        attribution: 'bound field',
        event: 'None',
        tag_color: 'green'
    },
    {
        component: 'result',
        function: 'Presenting results',
        attribution: 'None',
        event: 'Response',
        tag_color: 'orange'
    }
];
export default function TemplateEditorTable() {
    return <Table columns={columns} dataSource={data} pagination={false} />;
}
