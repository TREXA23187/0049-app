import React, { useRef } from 'react';

export default function EditorBlock(props) {
    const blockRef = useRef();

    const { block } = props;

    const blockStyles = {
        top: `${block.top}px`,
        left: `${block.left}px`,
        zIndex: block.zIndex
    };

    const component = props.config.componentMap[block.key];
    const RenderComponent = component.render({
        size: block.hasResize ? { width: block.width, height: block.height } : {},
        props: block.props
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
