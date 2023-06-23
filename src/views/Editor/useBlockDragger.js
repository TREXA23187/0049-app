import { useState } from 'react';
import { events } from './events';

export function useBlockDragger(
  getFocusData,
  getLastSelectedBlock,
  data,
  updateFunc
) {
  const { updateBlock } = updateFunc;

  //   const [x, setX] = useState(null);
  //   const [y, setY] = useState(null);
  const [markLine, setMarkLine] = useState({ x: null, y: null });

  let dragState = {
    startX: 0,
    startY: 0,
    dragging: false, // is in dragging
  };
  const mousedown = (e) => {
    const { width: BWidth, height: BHeight } = getLastSelectedBlock();

    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: getLastSelectedBlock().left,
      startTop: getLastSelectedBlock().top,
      dragging: false,
      startPos: getFocusData().focused.map(({ top, left }) => ({
        top,
        left,
      })),
      lines: (() => {
        const { unfocused } = getFocusData();

        let lines = { x: [], y: [] };
        [
          ...unfocused,
          {
            top: 0,
            left: 0,
            width: data.container.width,
            height: data.container.height,
          },
        ].forEach((block) => {
          const {
            top: ATop,
            left: ALeft,
            width: AWidth,
            height: AHeight,
          } = block;

          lines.y.push({ showTop: ATop, top: ATop }); // top to top
          lines.y.push({ showTop: ATop, top: ATop - BHeight }); // top to bottom
          lines.y.push({
            showTop: ATop + AHeight / 2,
            top: ATop + AHeight / 2 - BHeight / 2,
          }); // mid to mid
          lines.y.push({
            showTop: ATop + AHeight,
            top: ATop + AHeight,
          }); // bottom to top
          lines.y.push({
            showTop: ATop + AHeight,
            top: ATop + AHeight - BHeight,
          }); // bottom to bottom

          lines.x.push({ showLeft: ALeft, left: ALeft }); // left to left
          lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }); // right to left
          lines.x.push({
            showLeft: ALeft + AWidth / 2,
            left: ALeft + AWidth / 2 - BWidth / 2,
          }); // mid to mid
          lines.x.push({
            showLeft: ALeft + AWidth,
            left: ALeft + AWidth - BWidth,
          }); // right to right
          lines.x.push({
            showLeft: ALeft,
            left: ALeft - BWidth,
          }); // left to right
        });

        return lines;
      })(),
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };

  const mousemove = (e) => {
    let { clientX: moveX, clientY: moveY } = e;

    if (!dragState.dragging) {
      dragState.dragging = true;
      events.emit('start');
    }

    // calculate lines
    let left = moveX - dragState.startX + dragState.startLeft;
    let top = moveY - dragState.startY + dragState.startTop;

    // show lines close to 5px
    for (let i = 0; i < dragState.lines.y.length; i++) {
      const { top: t, showTop: s } = dragState.lines.y[i];
      const { left: l, showLeft: sLeft } = dragState.lines.x[i];

      if (Math.abs(t - top) < 5) {
        if (Math.abs(l - left) < 5) {
          setMarkLine({ x: sLeft, y: s });
          moveX = dragState.startX - dragState.startLeft + l;
        } else {
          setMarkLine({ ...markLine, y: s });
        }
        moveY = dragState.startY - dragState.startTop + t;
        break;
      }
    }

    for (let i = 0; i < dragState.lines.x.length; i++) {
      const { left: l, showLeft: s } = dragState.lines.x[i];
      const { top: t, showTop: sTop } = dragState.lines.y[i];

      if (Math.abs(l - left) < 5) {
        if (Math.abs(t - top) < 5) {
          setMarkLine({ y: sTop, x: s });
          moveY = dragState.startY - dragState.startTop + t;
        } else {
          setMarkLine({ ...markLine, x: s });
        }

        moveX = dragState.startX - dragState.startLeft + l;
        break;
      }
    }

    let durX = moveX - dragState.startX;
    let durY = moveY - dragState.startY;

    getFocusData().focused.forEach((block, index) => {
      block.left = dragState.startPos[index].left + durX;
      block.top = dragState.startPos[index].top + durY;

      updateBlock(block);
    });
  };

  const mouseup = (e) => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);

    setMarkLine({ x: null, y: null });

    if (dragState.dragging) {
      events.emit('end');
    }
  };

  return {
    mousedown,
    markLine,
  };
}
