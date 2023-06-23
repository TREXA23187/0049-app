import classNames from 'classnames';
import React from 'react';
import './index.css';

export default function BlockResize(props) {
  const { block, component, updateBlock } = props;

  const { width, height } = component.resize || {};

  const blockResizeLeftClass = classNames({
    'block-resize': true,
    'block-resize-left': true,
  });
  const blockResizeRightClass = classNames({
    'block-resize': true,
    'block-resize-right': true,
  });
  const blockResizeTopClass = classNames({
    'block-resize': true,
    'block-resize-top': true,
  });
  const blockResizeBottomClass = classNames({
    'block-resize': true,
    'block-resize-bottom': true,
  });
  const blockResizeTopLeftClass = classNames({
    'block-resize': true,
    'block-resize-top-left': true,
  });
  const blockResizeTopRightClass = classNames({
    'block-resize': true,
    'block-resize-top-right': true,
  });
  const blockResizeBottomLeftClass = classNames({
    'block-resize': true,
    'block-resize-bottom-left': true,
  });
  const blockResizeBottomRightClass = classNames({
    'block-resize': true,
    'block-resize-bottom-right': true,
  });

  let data = {};
  const onmousemove = (e) => {
    let { clientX, clientY } = e;
    let {
      startX,
      startY,
      startWidth,
      startHeight,
      startLeft,
      startTop,
      direction,
    } = data;

    if (direction.horizontal === 'center') {
      clientX = startX;
    }

    if (direction.vertical === 'center') {
      clientY = startY;
    }

    let durX = clientX - startX;
    let durY = clientY - startY;

    if (direction.horizontal === 'start') {
      durX = -durX;
      block.left = startLeft - durX;
    }

    if (direction.vertical === 'start') {
      durY = -durY;
      block.top = startTop - durY;
    }

    const width = startWidth + durX;
    const height = startHeight + durY;

    block.width = width;
    block.height = height;
    block.hasResize = true;
    updateBlock(block);
  };
  const onmouseup = () => {
    document.removeEventListener('mousemove', onmousemove);
    document.removeEventListener('mouseup', onmouseup);
  };
  const onmousedown = (e, direction) => {
    e.stopPropagation();

    data = {
      startx: e.clientX,
      startY: e.clientY,
      startWidth: block.width,
      startHeight: block.height,
      startLeft: block.left,
      startTop: block.top,
      direction,
    };
    document.addEventListener('mousemove', onmousemove);
    document.addEventListener('mouseup', onmouseup);
  };

  return (
    <>
      {width && (
        <>
          <div
            className={blockResizeLeftClass}
            onMouseDown={(e) =>
              onmousedown(e, { horizontal: 'start', vertical: 'center' })
            }
          ></div>
          <div
            className={blockResizeRightClass}
            onMouseDown={(e) =>
              onmousedown(e, { horizontal: 'end', vertical: 'center' })
            }
          ></div>
        </>
      )}

      {height && (
        <>
          <div
            className={blockResizeTopClass}
            onMouseDown={(e) =>
              onmousedown(e, { horizontal: 'center', vertical: 'start' })
            }
          ></div>
          <div
            className={blockResizeBottomClass}
            onMouseDown={(e) =>
              onmousedown(e, { horizontal: 'center', vertical: 'end' })
            }
          ></div>
        </>
      )}

      {width && height && (
        <>
          <div
            className={blockResizeTopLeftClass}
            onMouseDown={(e) =>
              onmousedown(e, { horizontal: 'start', vertical: 'start' })
            }
          ></div>
          <div
            className={blockResizeTopRightClass}
            onMouseDown={(e) =>
              onmousedown(e, { horizontal: 'end', vertical: 'start' })
            }
          ></div>
          <div
            className={blockResizeBottomLeftClass}
            onMouseDown={(e) =>
              onmousedown(e, { horizontal: 'start', vertical: 'end' })
            }
          ></div>
          <div
            className={blockResizeBottomRightClass}
            onMouseDown={(e) =>
              onmousedown(e, { horizontal: 'end', vertical: 'end' })
            }
          ></div>
        </>
      )}
    </>
  );
}
