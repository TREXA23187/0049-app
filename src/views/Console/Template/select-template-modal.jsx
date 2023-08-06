import React, { useState } from 'react';
import { Button, Modal, Card, Select, Space, Typography } from 'antd';
import EditorBlock from './editor-block';
import { registerConfig as config } from '@/configs/editor-config';
import { useHistory } from 'react-router-dom';
import { useRequest } from '@umijs/hooks';
import { getTaskList } from '@/api/console';

const generateContentFromTask = cols => {
    const blocks = [];

    let maxItemLen = 0;
    let currentIndex = 0;
    cols.forEach(item => {
        maxItemLen = Math.max(maxItemLen, item.length);
    });

    cols.forEach((item, i) => {
        const top = 50 * (i + 1);
        const left = 100;

        const textBlock = {
            top: top,
            left: left,
            zIndex: 1,
            key: 'text',
            alignCenter: false,
            index: currentIndex,
            props: { text: item + ' : ' },
            model: {},
            event: {},
            width: 71,
            height: 17,
            focus: false
        };
        currentIndex++;
        blocks.push(textBlock);

        const inputBlock = {
            top: top - 6,
            left: left + 50 + maxItemLen * 5,
            zIndex: 1,
            key: 'input',
            alignCenter: false,
            index: currentIndex,
            props: {},
            model: { default: item },
            event: {},
            width: 180,
            height: 32,
            focus: false
        };
        currentIndex++;
        blocks.push(inputBlock);
    });

    const buttonBlock = {
        top: 50 * cols.length + 50,
        left: 150,
        zIndex: 1,
        key: 'button',
        alignCenter: false,
        index: currentIndex,
        props: { text: 'submit' },
        model: {},
        event: {},
        width: 120,
        height: 32,
        focus: false
    };
    currentIndex++;
    blocks.push(buttonBlock);

    const resultBlock = {
        top: 50,
        left: 350 + maxItemLen * 5,
        zIndex: 1,
        key: 'result',
        alignCenter: false,
        index: currentIndex,
        props: {},
        model: {},
        event: {},
        width: 200,
        height: 44,
        focus: false
    };
    blocks.push(resultBlock);

    const content = { container: { width: 800, height: 500 }, blocks: blocks };

    return content;
};

export default function SelectTemplateModal(props) {
    const history = useHistory();

    const { isModalOpen, handleOk, handleCancel } = props;

    const [isInputFromTask, setIsInputFromTask] = useState(false);
    const [selectInputFromTask, setSelectInputFromTask] = useState('');

    const { data: taskList, refresh } = useRequest(async () => {
        const res = await getTaskList();

        return res.data?.list || [];
    });

    const blankContent = { container: { width: 800, height: 500 }, blocks: [] };
    const inputFromTaskContent = {
        container: { width: 800, height: 500 },
        blocks: [
            {
                top: 50,
                left: 100,
                zIndex: 1,
                key: 'text',
                alignCenter: false,
                index: 0,
                props: { text: 'label 1' },
                model: {},
                event: {},
                width: 71,
                height: 17,
                focus: false
            },
            {
                top: 45,
                left: 150,
                zIndex: 1,
                key: 'input',
                alignCenter: false,
                index: 1,
                props: {},
                model: {},
                event: {},
                width: 180,
                height: 32,
                focus: false
            },
            {
                top: 100,
                left: 100,
                zIndex: 1,
                key: 'text',
                alignCenter: false,
                index: 2,
                props: { text: 'label 2' },
                model: {},
                event: {},
                width: 43,
                height: 17,
                focus: false
            },
            {
                top: 95,
                left: 150,
                zIndex: 1,
                key: 'input',
                alignCenter: false,
                index: 3,
                props: {},
                model: {},
                event: {},
                width: 180,
                height: 32,
                focus: false
            },
            {
                top: 150,
                left: 150,
                zIndex: 1,
                key: 'button',
                alignCenter: false,
                index: 4,
                props: { text: 'submit' },
                model: {},
                event: {},
                width: 120,
                height: 32,
                focus: false
            },
            {
                top: 50,
                left: 350,
                zIndex: 1,
                key: 'result',
                alignCenter: false,
                index: 5,
                props: {},
                model: {},
                event: {},
                width: 200,
                height: 44,
                focus: false
            }
        ]
    };
    return (
        <>
            <Modal
                title='Basic Modal'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
                footer={null}>
                <div style={{ display: 'flex', padding: '10px 5px' }}>
                    <div
                        style={{
                            width: '48%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                        <Card
                            hoverable
                            style={{ width: '100%', minHeight: '100px', position: 'relative' }}
                            onClick={() => history.push('/console/template/editor?sider=false')}>
                            {blankContent?.blocks.map((block, index) => {
                                return <EditorBlock block={block} key={index} config={config} isPreview={true} />;
                            })}
                        </Card>
                        <div>Blank Template</div>
                    </div>
                    <div
                        style={{
                            width: '48%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginLeft: '4%'
                        }}>
                        {isInputFromTask ? (
                            <>
                                <div style={{ width: '100%', marginTop: '10px' }}>
                                    <Typography.Text>From task: </Typography.Text>
                                    <Select
                                        style={{ width: '60%', marginLeft: '10px' }}
                                        options={taskList?.map(item => {
                                            return {
                                                value: item.training_data_label,
                                                label: item.name
                                            };
                                        })}
                                        onChange={setSelectInputFromTask}
                                    />
                                </div>
                                <Space style={{ marginTop: '10px' }}>
                                    <Button
                                        danger
                                        style={{ width: '80px' }}
                                        onClick={() => {
                                            setIsInputFromTask(false);
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type='primary'
                                        style={{ width: '80px' }}
                                        onClick={() => {
                                            const templateContent = generateContentFromTask(
                                                JSON.parse(selectInputFromTask)
                                            );

                                            history.push(
                                                `/console/template/editor?sider=false&content=${JSON.stringify(
                                                    templateContent
                                                )}`
                                            );
                                        }}>
                                        OK
                                    </Button>
                                </Space>
                            </>
                        ) : (
                            <>
                                <Card
                                    hoverable
                                    style={{ width: '100%', minHeight: '100px', position: 'relative' }}
                                    onClick={() => setIsInputFromTask(true)}>
                                    {inputFromTaskContent?.blocks.map((block, index) => {
                                        return (
                                            <EditorBlock block={block} key={index} config={config} isPreview={true} />
                                        );
                                    })}
                                </Card>
                                <div>Input from Task</div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}
