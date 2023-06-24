import { Button, Input, Progress, Upload, Descriptions, Select, Table } from 'antd';
import ImgCrop from 'antd-img-crop';

function createEditorConfig() {
    const componentList = [];
    const componentMap = {};

    return {
        componentList,
        componentMap,
        register: component => {
            componentList.push(component);
            componentMap[component.key] = component;
        }
    };
}

export let registerConfig = createEditorConfig();

const createInputProp = (label, name) => {
    return {
        type: 'input',
        label,
        name
    };
};
const createInputNumProp = (label, name) => {
    return {
        type: 'inputNum',
        label,
        name
    };
};
const createColorProp = (label, name) => {
    return {
        type: 'color',
        label,
        name
    };
};
const createSelectProp = (label, name, options) => {
    return {
        type: 'select',
        label,
        name,
        options
    };
};
const createTableProp = (label, name, table) => {
    return {
        type: 'table',
        label,
        name,
        table
    };
};
const createSwitchProp = (label, name, isRadio) => {
    return {
        type: 'switch',
        label,
        name,
        isRadio
    };
};

registerConfig.register({
    label: 'text',
    preview: () => 'text preview',
    render: ({ props }) => {
        let colorHex = props.color;

        const hexString = colorHex ? (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()) : '#000';

        return <span style={{ color: hexString, fontSize: props.size }}>{props.text || 'render text'}</span>;
    },
    key: 'text',
    props: {
        text: createInputProp('content text', 'text'),
        color: createColorProp('font color', 'color'),
        size: createSelectProp('font size', 'size', [
            { label: '15px', value: '15px' },
            { label: '20px', value: '20px' },
            { label: '25px', value: '25px' }
        ])
    }
});

registerConfig.register({
    label: 'button',
    resize: {
        width: true,
        height: true
    },
    preview: () => <Button>button preview</Button>,
    render: ({ props, size }) => (
        <Button type={props.type} size={props.size} style={{ width: size.width + 'px', height: size.height + 'px' }}>
            {props.text || 'render button'}
        </Button>
    ),
    key: 'button',
    props: {
        text: createInputProp('button text', 'text'),
        type: createSelectProp('button type', 'type', [
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'ghost', value: 'ghost' },
            { label: 'dashed', value: 'dashed' },
            { label: 'link', value: 'link' },
            { label: 'text', value: 'text' }
        ]),
        size: createSelectProp('button size', 'size', [
            { label: 'default', value: '' },
            { label: 'small', value: 'small' },
            { label: 'medium', value: 'medium' },
            { label: 'large', value: 'large' }
        ]),
        submit: createSwitchProp('submit button', 'submit', true)
    }
});

registerConfig.register({
    label: 'input',
    resize: {
        width: true
    },
    preview: () => <Input placeholder='input preview'></Input>,
    render: ({ model, size }) => (
        <Input placeholder='render input' {...model?.default} style={{ width: size.width + 'px' }}></Input>
    ),
    key: 'input',
    model: {
        default: 'Bound Field'
    }
});

registerConfig.register({
    label: 'select',
    preview: () => <Select style={{ width: 180 }} defaultValue={'select preview'} />,
    render: ({ props, model }) => {
        return (
            <Select
                style={{ width: 180 }}
                defaultValue={'render select'}
                options={props.options || []}
                {...model?.default}
            />
        );
    },
    key: 'select',
    props: {
        options: createTableProp('options', 'options', {
            options: [
                { label: 'label', field: 'label' },
                { label: 'value', field: 'value' }
            ],
            key: 'label'
        })
    },
    model: {
        default: 'Bound Field'
    }
});

registerConfig.register({
    label: 'upload image',
    preview: () => <Upload listType='picture-card'>+ Upload</Upload>,
    render: ({ props, model }) => {
        const maxCount = props.max_image_num || 1;
        let fileList = model.default?.value || [];
        fileList = fileList.slice(0, maxCount);

        return (
            <ImgCrop rotationSlider>
                <Upload
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    listType='picture-card'
                    maxCount={maxCount}
                    fileList={fileList}
                    disabled={fileList.length >= maxCount}
                    {...model?.default}>
                    {fileList.length < maxCount && '+ Upload'}
                </Upload>
            </ImgCrop>
        );
    },
    key: 'upload_image',
    props: {
        max_image_num: createInputNumProp('max image num', 'max_image_num')
    },
    model: {
        default: 'Bound Field'
    }
});

const columns = [
    {
        title: 'Col_1',
        dataIndex: 'col_1',
        key: 'col_1'
    },
    {
        title: 'Col_2',
        dataIndex: 'col_2',
        key: 'col_2'
    }
];
const data = [
    {
        key: '1',
        col_1: 'content_1',
        col_2: 'content_2'
    }
];

registerConfig.register({
    label: 'table',
    preview: () => <Table style={{ width: '180px' }} columns={columns} dataSource={data} pagination={false} />,
    render: () => <Table style={{ width: '180px' }} columns={columns} dataSource={data} pagination={false} />,
    key: 'table',
    model: {
        default: 'Bound Field'
    }
});

registerConfig.register({
    label: 'progress',
    preview: () => <Progress percent={30} style={{ width: '180px' }} />,
    render: () => <Progress percent={30} style={{ width: '180px' }} />,
    key: 'progress',
    model: {
        default: 'Bound Field'
    }
});

registerConfig.register({
    label: 'description',
    preview: () => (
        <Descriptions title='Description'>
            <Descriptions.Item label='Label'>Value</Descriptions.Item>
        </Descriptions>
    ),
    render: () => (
        <Descriptions title='Description' size='small' style={{ width: '200px' }}>
            <Descriptions.Item label='Label'>Value</Descriptions.Item>
        </Descriptions>
    ),
    key: 'description'
});
