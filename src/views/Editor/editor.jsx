import React, { useState, useRef } from 'react';
import { Layout, theme, message, Button, Tabs } from 'antd';
import {
    RollbackOutlined,
    ExportOutlined,
    ImportOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined,
    CloseOutlined,
    EditOutlined,
    EyeOutlined,
    CopyOutlined,
    ClearOutlined
} from '@ant-design/icons';
import EditorBlock from './editor-block';
import './index.css';
import useMenuDragger from './useMenuDragger';
import { useFocus } from './useFocus';
import { useBlockDragger } from './useBlockDragger';
import { useCommand } from './useCommand';
import ExportModal from '@/components/editor/ExportModal';
import MenuDropdown from '@/components/editor/MenuDropdown';
import EditorOperator from '@/components/editor/EditorOperator';
import Grid from '../../components/editor/grid';

const { Header, Content, Sider, Footer } = Layout;

export default function EditorApp(props) {
    const { data, config, updateData, globalData, updateGlobalData } = props;

    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [exportModalOption, setExportModalOption] = useState({});
    const [isPreview, setIsPreview] = useState(false);
    const [canEdit, setCanEdit] = useState(true);
    const [isShowMenuDropdown, setIsShowMenuDropdown] = useState(false);
    const [menuDropdownStyle, setMenuDropdownStyle] = useState({
        top: 0,
        left: 0
    });
    const [menuDropdownOption, setMenuDropdownOption] = useState({});
    const [lastSelectedIndex, setLastSelectedIndex] = useState(-1);

    const menuDropdownRef = useRef();

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const [messageApi, contextHolder] = message.useMessage();

    const containerStyles = {
        width: data.container.width + 'px',
        height: data.container.height + 'px'
    };

    const updateBlock = newBlock => {
        const newBlocks = data.blocks;
        newBlocks[newBlock.index] = newBlock;

        const newData = {
            ...data,
            blocks: newBlocks
        };

        updateData(newData);
    };

    const containerRef = useRef();
    // 1. Menu drag and drop function
    const { onDragStart, onDragEnd } = useMenuDragger(containerRef, data, updateData);

    // 2. Get Focus
    const { blockMouseDown, containerMouseDown, getFocusData, getLastSelectedBlock, clearBlockFocus } = useFocus(
        data,
        isPreview,
        menuDropdownRef,
        {
            updateData,
            updateBlock,
            setLastSelectedIndex
        },
        e => {
            mousedown(e);
        }
    );

    // 3. Drag Elements
    const { mousedown, markLine } = useBlockDragger(getFocusData, getLastSelectedBlock, data, {
        updateBlock
    });

    const handleOk = () => {
        try {
            const importJson = JSON.parse(exportModalOption.content);
            commands.updateContainer(importJson);
            setIsExportModalOpen(false);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Invalid JSON'
            });
        }
    };

    const handleCancel = () => {
        setIsExportModalOpen(false);
    };

    const onContextMenuBlock = (e, block) => {
        e.preventDefault();

        setIsShowMenuDropdown(true);
        setMenuDropdownStyle({ top: block.top + block.height, left: block.left });
        setMenuDropdownOption({
            content: [
                {
                    label: 'Delete',
                    key: 'delete',
                    icon: <CloseOutlined />,
                    onClick: () => {
                        commands.delete();
                        setIsShowMenuDropdown(false);
                    }
                },
                {
                    label: 'Copy',
                    key: 'copy',
                    icon: <CopyOutlined />,
                    keyboard: 'ctrl+c',
                    onClick: () => commands.copy()
                },
                {
                    label: 'Top',
                    key: 'top',
                    icon: <VerticalAlignTopOutlined />,
                    onClick: () => commands.placeTop()
                },
                {
                    label: 'Bottom',
                    key: 'bottom',
                    icon: <VerticalAlignBottomOutlined />,
                    onClick: () => commands.placeBottom()
                },
                {
                    label: 'Watch',
                    key: 'watch',
                    icon: <EyeOutlined />,
                    onClick: () => {
                        setExportModalOption({
                            title: 'Element JSON',
                            content: JSON.stringify(block),
                            isExport: true
                        });
                        setIsExportModalOpen(true);
                    }
                },
                {
                    label: 'Import',
                    key: 'import',
                    icon: <ImportOutlined />,
                    onClick: () => {
                        setExportModalOption({
                            title: 'Import Element JSON',
                            content: '',
                            footer: true,
                            isExport: false,
                            callback: text => {
                                text = JSON.parse(text);
                                commands.updateBlock(text, block);

                                setIsExportModalOpen(false);
                            }
                        });
                        setIsExportModalOpen(true);
                    }
                }
            ]
        });
    };

    const { commands } = useCommand(data, getFocusData, {
        updateData
    });
    const buttons = [
        {
            label: 'Undo',
            icon: <RollbackOutlined />,
            handler: () => {
                commands.undo();
            }
        },
        {
            label: 'Redo',
            icon: <RollbackOutlined rotate={180} />,
            handler: () => commands.redo()
        },
        {
            label: 'Export',
            icon: <ExportOutlined />,
            handler: () => {
                setExportModalOption({
                    title: 'Export JSON',
                    content: JSON.stringify(data),
                    isExport: true
                });
                setIsExportModalOpen(true);
            }
        },
        {
            label: 'Import',
            icon: <ImportOutlined />,
            handler: () => {
                setExportModalOption({
                    title: 'Import JSON',
                    content: '',
                    footer: true,
                    isExport: false
                });
                setIsExportModalOpen(true);
            }
        },
        {
            label: 'Top',
            icon: <VerticalAlignTopOutlined />,
            handler: () => commands.placeTop()
        },
        {
            label: 'Bottom',
            icon: <VerticalAlignBottomOutlined />,
            handler: () => commands.placeBottom()
        },
        {
            label: 'Copy',
            icon: <CopyOutlined />,
            handler: () => commands.copy()
        },
        {
            label: 'Delete',
            icon: <CloseOutlined />,
            handler: () => commands.delete()
        },
        {
            label: 'Clear',
            icon: <ClearOutlined />,
            handler: () => commands.clear()
        },
        {
            label: () => {
                return isPreview ? 'Edit' : 'Preview';
            },
            icon: () => {
                return isPreview ? <EditOutlined /> : <EyeOutlined />;
            },
            handler: () => {
                setIsPreview(!isPreview);
                clearBlockFocus();
            }
        },
        {
            label: 'Close',
            icon: <CloseOutlined />,
            handler: () => {
                setIsPreview(true);
                setCanEdit(false);
                clearBlockFocus();
            }
        }
    ];

    const rightSiderTabItems = [
        {
            key: '1',
            label: `Attribute`,
            children: (
                <div style={{ padding: '10px' }}>
                    <div className='demo-logo-vertical' />
                    <EditorOperator
                        getLastSelectedBlock={getLastSelectedBlock}
                        lastSelectedIndex={lastSelectedIndex}
                        data={data}
                        config={config}
                        editData={lastSelectedIndex > -1 ? getLastSelectedBlock() : data.container}
                        updateContainer={newContainer => {
                            commands.updateContainer(newContainer);
                        }}
                        updateBlock={(newBlock, oldBlock) => {
                            commands.updateBlock(newBlock, oldBlock);
                        }}
                        globalData={globalData}
                        updateGlobalData={updateGlobalData}
                    />
                </div>
            )
        },
        {
            key: '2',
            label: `Event`,
            children: `Content of Tab Event`
        }
    ];

    return !canEdit ? (
        <div>
            <div
                style={{
                    ...containerStyles,
                    position: 'relative'
                }}
                ref={containerRef}
                onMouseDown={containerMouseDown}>
                {data.blocks.map((block, index) => {
                    return (
                        <EditorBlock
                            block={block}
                            key={index}
                            config={config}
                            isPreview={true}
                            updateBlock={updateBlock}
                            onMouseDown={e => blockMouseDown(e, block)}
                            globalData={globalData}
                            updateGlobalData={updateGlobalData}
                        />
                    );
                })}
            </div>
            <div style={{ position: 'absolute', right: 10, top: 10 }}>
                <Button type='primary' onClick={() => setCanEdit(true)} ghost>
                    Back to Edit
                </Button>
                <div>{JSON.stringify(globalData)}</div>
            </div>
        </div>
    ) : (
        <Layout
            style={{
                minHeight: '100vh'
            }}
            hasSider>
            <Sider theme='light' width={'20%'}>
                <div style={{ overflow: 'scroll', height: '670px' }}>
                    {config.componentList.map((component, index) => {
                        return (
                            <div
                                className='editor-left-item'
                                draggable
                                onDragStart={e => {
                                    onDragStart(e, component);
                                }}
                                onDragEnd={onDragEnd}
                                key={index}>
                                <span>{component.label}</span>
                                <div>{component.preview(0)}</div>
                            </div>
                        );
                    })}
                </div>
            </Sider>

            {contextHolder}
            <ExportModal
                isModalOpen={isExportModalOpen}
                setIsModalOpen={setIsExportModalOpen}
                option={exportModalOption}
                setOption={setExportModalOption}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '4px'
                        }}>
                        {buttons.map((btn, index) => {
                            const icon = typeof btn.icon == 'function' ? btn.icon() : btn.icon;
                            const label = typeof btn.label == 'function' ? btn.label() : btn.label;

                            return (
                                <div className='editor-top-button' onClick={btn.handler} key={index}>
                                    <span style={{ height: '20px' }}>{icon}</span>
                                    <span>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '20px 16px',
                        position: 'relative',
                        minHeight: '500px'
                    }}>
                    <div
                        style={{
                            padding: 14,
                            background: colorBgContainer,
                            minHeight: '100%'
                        }}
                        ref={containerRef}
                        onMouseDown={containerMouseDown}>
                        {!isPreview && <Grid />}
                        <div
                            style={{
                                ...containerStyles
                            }}>
                            {data.blocks.map((block, index) => {
                                return (
                                    <EditorBlock
                                        block={block}
                                        key={index}
                                        config={config}
                                        isPreview={isPreview}
                                        updateBlock={updateBlock}
                                        onMouseDown={e => blockMouseDown(e, block)}
                                        onContextMenu={e => onContextMenuBlock(e, block)}
                                        globalData={globalData}
                                        updateGlobalData={updateGlobalData}
                                    />
                                );
                            })}
                        </div>
                        <div>
                            {markLine.x !== null && <div className='line-x' style={{ left: markLine.x + 'px' }}></div>}
                            {markLine.y !== null && <div className='line-y' style={{ top: markLine.y + 'px' }}></div>}
                        </div>
                        <MenuDropdown
                            option={menuDropdownOption}
                            isShow={isShowMenuDropdown}
                            setIsShow={setIsShowMenuDropdown}
                            menuDropdownStyle={menuDropdownStyle}
                            menuDropdownRef={menuDropdownRef}
                        />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center'
                    }}>
                    ©2023 Created by Trex
                </Footer>
            </Layout>

            <Sider theme='light' width={'20%'}>
                <Tabs defaultActiveKey='1' items={rightSiderTabItems} style={{ padding: '20px' }}></Tabs>
            </Sider>
        </Layout>
    );
}
