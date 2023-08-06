import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import deepcopy from 'deepcopy';
import { post } from '@/utils/request';

// import BlockResize from './block-resize';

export default function EditorBlock(props) {
    const blockRef = useRef();

    const {
        block,
        isPreview,
        updateBlock,
        onMouseDown,
        onContextMenu,
        globalData,
        updateGlobalData,
        globalResult,
        updateGlobalResult
    } = props;

    const blockStyles = {
        top: `${block.top}px`,
        left: `${block.left}px`,
        zIndex: block.zIndex
    };

    useEffect(() => {
        let { offsetWidth, offsetHeight } = blockRef.current;

        let newBlock = block;
        if (block.alignCenter) {
            newBlock = {
                ...block,
                left: block.left - offsetWidth / 2,
                top: block.top - offsetHeight / 2,
                alignCenter: false
            };
        }

        newBlock = {
            ...newBlock,
            width: offsetWidth,
            height: offsetHeight
        };

        updateBlock(newBlock);
    }, []);

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
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

                if (block.key === 'upload_image') {
                    prev[modelName] = { ...prev[modelName], onPreview };
                }
            }
            return prev;
        }, {}),
        event: Object.keys(component.event || {}).reduce((prev, eventName) => {
            let propName = block.event[eventName];

            if (propName) {
                prev[eventName] = {
                    onClick: async () => {
                        // const instance = axios.create({
                        //     baseURL: block.event.url,
                        //     timeout: 30000
                        // });

                        const res = await post('api/v1/users/mock', globalData);
                        updateGlobalResult(res);
                    }
                };
            }
            return prev;
        }, {}),
        globalResult: globalResult
    });

    const blockClassName = classNames({
        'editor-block-focus': block.focus,
        'editor-block': !block.focus,
        'editor-block-preview': isPreview
    });

    const { width, height } = component.resize || {};

    return (
        <div
            className={blockClassName}
            style={blockStyles}
            ref={blockRef}
            onMouseDown={onMouseDown}
            onContextMenu={onContextMenu}>
            {RenderComponent}

            {/* {block.focus && (width || height) && (
        <BlockResize
          block={block}
          component={component}
          updateBlock={updateBlock}
        />
      )} */}
        </div>
    );
}
