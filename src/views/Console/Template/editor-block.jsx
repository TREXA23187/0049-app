import React, { useRef } from 'react';

export default function EditorBlock(props) {
    const blockRef = useRef();

    const { block } = props;

    const blockStyles = {
        top: `${block.top * 0.4}px`,
        left: `${block.left * 0.4}px`,
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
                ...blockStyles,
                transformOrigin: 'top left',
                transform: 'scale(0.4)'
            }}
            ref={blockRef}>
            {RenderComponent}
        </div>
    );
}
