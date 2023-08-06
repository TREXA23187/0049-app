import deepcopy from 'deepcopy';
import React, { useRef } from 'react';
import { sendInterfaceData } from '@/api/console';

export default function EditorBlock(props) {
    const blockRef = useRef();

    const { block, globalData, updateGlobalData, globalResult, updateGlobalResult } = props;

    const blockStyles = {
        top: `${block.top}px`,
        left: `${block.left}px`,
        zIndex: block.zIndex
    };

    const component = props.config.componentMap[block.key];
    const RenderComponent = component.render({
        size: block.hasResize ? { width: block.width, height: block.height } : {},
        props: block.props,
        model: Object.keys(component.model || {}).reduce((prev, modelName) => {
            let propName = block.model[modelName];

            if (propName) {
                prev[modelName] = {
                    value: globalData[propName],
                    onChange: e => {
                        let newValue;
                        if (block.key === 'input') {
                            newValue = e.target.value;
                        } else if (block.key === 'upload_image') {
                            const { fileList } = e;
                            newValue = fileList;
                        } else {
                            newValue = e;
                        }
                        const newGlobalData = deepcopy(globalData);
                        newGlobalData[propName] = newValue;
                        updateGlobalData(newGlobalData);
                    }
                };
            }
            return prev;
        }, {}),
        event: Object.keys(component.event || {}).reduce((prev, eventName) => {
            let propName = block.event[eventName];

            if (propName) {
                prev[eventName] = {
                    onClick: async () => {
                        const res = await sendInterfaceData({ data: globalData, url: propName });
                        if (res.code === 0) {
                            updateGlobalResult({ result: JSON.parse(res.data) });
                        }
                    }
                };
            }
            return prev;
        }, {}),
        globalResult: globalResult
    });

    return (
        <div
            className='editor-block'
            style={{
                blockStyles
            }}
            ref={blockRef}>
            {RenderComponent}
        </div>
    );
}
