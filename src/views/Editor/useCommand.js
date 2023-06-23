import { useEffect, useState } from 'react';
import deepcopy from 'deepcopy';
import { events } from './events';

export function useCommand(data, getFocusData, updateFunc) {
  const { updateData } = updateFunc;

  const [queue, setQueue] = useState([]); // store operation commands
  const [current, setCurrent] = useState(-1); // Forward and backward require a pointer

  const [before, setBefore] = useState(null);

  const state = {
    commands: {}, // command -> handler
    commandArray: [],
    destroyArray: [],
  };

  const registry = (command) => {
    state.commandArray.push(command);

    state.commands[command.name] = (...args) => {
      const { redo, undo } = command.execute(...args);
      redo();

      if (!command.pushQueue) {
        return;
      }

      if (queue.length > 0) {
        setQueue(queue.slice(0, current + 1));
      }

      queue.push({ redo, undo });

      setCurrent(current + 1);
      setQueue(queue);
    };
  };

  useEffect(() => {
    registry({
      name: 'redo',
      keyboard: 'ctrl+y',
      execute() {
        return {
          redo() {
            let item = queue[current + 1];
            if (item) {
              item.redo?.();
              setCurrent(current + 1);
            }
          },
        };
      },
    });

    registry({
      name: 'undo',
      keyboard: 'ctrl+z',
      execute() {
        return {
          redo() {
            if (current == -1) {
              return;
            }

            let item = queue[current];
            if (item) {
              item.undo?.();
              setCurrent(current - 1);
            }
          },
        };
      },
    });

    registry({
      name: 'drag',
      pushQueue: true,
      init() {
        const start = () => {
          setBefore(deepcopy(data.blocks));
        };
        const end = () => {
          state.commands.drag();
        };
        events.on('start', start);
        events.on('end', end);

        return () => {
          events.off('start', start);
          events.off('end', end);
        };
      },
      execute() {
        let after = data.blocks;

        return {
          redo() {
            updateData({ ...data, blocks: after });
          },
          undo() {
            updateData({ ...data, blocks: before });
          },
        };
      },
    });

    registry({
      name: 'updateContainer',
      pushQueue: true,
      execute(newData) {
        let beforeData = deepcopy(data);
        let afterData = newData;

        return {
          redo() {
            updateData(afterData);
          },
          undo() {
            updateData(beforeData);
          },
        };
      },
    });

    registry({
      name: 'placeTop',
      pushQueue: true,
      execute() {
        let beforeBlock = deepcopy(data.blocks);
        setBefore(beforeBlock);

        let after = (() => {
          let { focused, unfocused } = getFocusData();

          let maxZIndex = unfocused.reduce((prev, block) => {
            return Math.max(prev, block.zIndex);
          }, -Infinity);

          focused.forEach((block) => (block.zIndex = maxZIndex + 1));

          return [...focused, ...unfocused];
        })();

        return {
          redo() {
            updateData({ ...data, blocks: after });
          },
          undo() {
            updateData({ ...data, blocks: beforeBlock });
          },
        };
      },
    });

    registry({
      name: 'placeBottom',
      pushQueue: true,
      execute() {
        let beforeBlock = deepcopy(data.blocks);
        setBefore(beforeBlock);
        let after = (() => {
          let { focused, unfocused } = getFocusData();

          let minZIndex =
            unfocused.reduce((prev, block) => {
              return Math.min(prev, block.zIndex);
            }, Infinity) - 1;

          if (minZIndex < 0) {
            const dur = Math.abs(minZIndex);
            minZIndex = 0;
            unfocused.forEach((block) => (block.zIndex += dur));
          }

          focused.forEach((block) => (block.zIndex = minZIndex));

          return [...focused, ...unfocused];
        })();

        return {
          redo() {
            updateData({ ...data, blocks: after });
          },
          undo() {
            updateData({ ...data, blocks: beforeBlock });
          },
        };
      },
    });

    registry({
      name: 'copy',
      keyboard: 'ctrl+c',
      pushQueue: true,
      execute() {
        let beforeBlock = deepcopy(data.blocks);
        setBefore(beforeBlock);

        let after = (() => {
          let { focused, unfocused } = getFocusData();

          let copyBlocks = [];
          focused.forEach((block) => {
            copyBlocks.push(Object.assign({}, block));
          });

          const length = data.blocks.length;
          for (let i = 0; i < copyBlocks.length; i++) {
            copyBlocks[i].index = length + i;
            copyBlocks[i].top += 20;
            copyBlocks[i].left += 20;
          }

          return [...data.blocks, ...copyBlocks];
        })();

        return {
          redo() {
            updateData({ ...data, blocks: after });
          },
          undo() {
            updateData({ ...data, blocks: beforeBlock });
          },
        };
      },
    });

    registry({
      name: 'clear',
      pushQueue: true,
      execute() {
        let beforeBlock = deepcopy(data.blocks);
        setBefore(beforeBlock);

        let after = [];

        return {
          redo() {
            updateData({ ...data, blocks: after });
          },
          undo() {
            updateData({ ...data, blocks: beforeBlock });
          },
        };
      },
    });

    registry({
      name: 'delete',
      pushQueue: true,
      execute() {
        let beforeBlock = deepcopy(data.blocks);
        setBefore(beforeBlock);
        let after = getFocusData().unfocused;

        return {
          redo() {
            updateData({ ...data, blocks: after });
          },
          undo() {
            updateData({ ...data, blocks: beforeBlock });
          },
        };
      },
    });

    registry({
      name: 'updateBlock',
      pushQueue: true,
      execute(newBlock, oldBlock) {
        let beforeBlock = deepcopy(data.blocks);
        setBefore(beforeBlock);

        let after = (() => {
          let blocks = [...data.blocks];
          const index = blocks.indexOf(oldBlock);
          if (index > -1) {
            blocks.splice(index, 1, newBlock);
          }

          return blocks;
        })();

        return {
          redo() {
            updateData({ ...data, blocks: after });
          },
          undo() {
            updateData({ ...data, blocks: beforeBlock });
          },
        };
      },
    });

    const keyboardEvent = (() => {
      const keyCodes = {
        67: 'c',
        90: 'z',
        89: 'y',
      };

      const onKeyDown = (e) => {
        const { ctrlKey, metaKey, keyCode } = e;
        let keyString = [];
        if (ctrlKey || metaKey) keyString.push('ctrl');
        keyString.push(keyCodes[keyCode]);
        keyString = keyString.join('+');

        state.commandArray.forEach(({ keyboard, name }) => {
          if (!keyboard) {
            return;
          }

          if (keyboard == keyString) {
            state.commands[name]();
            e.preventDefault();
          }
        });
      };

      const init = () => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
          window.removeEventListener('keydown', onKeyDown);
        };
      };
      return init;
    })();

    (() => {
      // Keyboard shortcuts
      state.destroyArray.push(keyboardEvent());

      state.commandArray.forEach((command) => {
        command.init && state.destroyArray.push(command.init());
      });
    })();

    return () => {
      state.destroyArray.forEach((fn) => fn && fn());
    };
  });

  return state;
}
