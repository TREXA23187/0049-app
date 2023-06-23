import { events } from './events';

export default function useMenuDragger(containerRef, data, updateData) {
  let currentComponent = null;
  const dragenter = (e) => {
    e.dataTransfer.dropEffect = 'move';
  };
  const dragover = (e) => {
    e.preventDefault();
  };
  const dragleave = (e) => {
    e.dataTransfer.dropEffect = 'none';
  };
  const drop = (e) => {
    let blocks = data.blocks;

    const newData = {
      ...data,
      blocks: [
        ...blocks,
        {
          top: e.offsetY,
          left: e.offsetX,
          zIndex: 1,
          key: currentComponent.key,
          alignCenter: true,
          index: blocks.length,
          props: {},
          model: {},
        },
      ],
    };
    updateData(newData);

    // currentComponent = null;
  };

  const onDragStart = (e, component) => {
    containerRef.current.addEventListener('dragenter', dragenter);
    containerRef.current.addEventListener('dragover', dragover);
    containerRef.current.addEventListener('dragleave', dragleave);
    containerRef.current.addEventListener('drop', drop);

    currentComponent = component;

    events.emit('start');
  };

  const onDragEnd = (e) => {
    containerRef.current.removeEventListener('dragenter', dragenter);
    containerRef.current.removeEventListener('dragover', dragover);
    containerRef.current.removeEventListener('dragleave', dragleave);
    containerRef.current.removeEventListener('drop', drop);

    events.emit('end');
  };

  return {
    onDragStart,
    onDragEnd,
  };
}
