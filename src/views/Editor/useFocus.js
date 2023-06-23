import { useRef } from 'react';

export function useFocus(
  data,
  isPreview,
  menuDropdownRef,
  updateFunc,
  callback
) {
  const { updateData, updateBlock, setLastSelectedIndex } = updateFunc;

  const lastSelectedBlockIndex = useRef(-1);
  const getLastSelectedBlock = () => {
    return data.blocks[lastSelectedBlockIndex.current];
  };

  const getFocusData = () => {
    let focused = [];
    let unfocused = [];

    data.blocks.forEach((block) => {
      (block.focus ? focused : unfocused).push(block);
    });

    return { focused, unfocused };
  };

  const clearBlockFocus = () => {
    const newBlocks = data.blocks.map((block) => {
      block.focus = false;
      return block;
    });

    updateData({
      ...data,
      blocks: newBlocks,
    });
  };

  const blockMouseDown = (e, block) => {
    if (isPreview) return;

    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey) {
      if (getFocusData().focused.length <= 1) {
        block.focus = true;
      } else {
        block.focus = !block.focus;
      }
    } else {
      if (!block.focus) {
        clearBlockFocus();
        block.focus = true;
      }
      // cannot be defocused unless click container
    }

    updateBlock(block);

    lastSelectedBlockIndex.current = block.index;
    setLastSelectedIndex(block.index);
    callback(e);
  };

  const containerMouseDown = (e) => {
    if (isPreview) return;

    if (!menuDropdownRef.current?.contains(e.target)) {
      clearBlockFocus();
      lastSelectedBlockIndex.current = -1;
      setLastSelectedIndex(-1);
    }
  };

  return {
    blockMouseDown,
    containerMouseDown,
    getFocusData,
    getLastSelectedBlock,
    clearBlockFocus,
  };
}
