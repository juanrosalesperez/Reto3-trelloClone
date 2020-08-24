import { CONSTANTS } from ".";

export const addList = (title) => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: title,
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  };
};

export const deleteList = (listID, state, index) => {
  console.log(listID);
  console.log(state);
  console.log(index);
  state.splice(index, 1);
  return {
    type: CONSTANTS.DELETE_LIST,
    state: state,
  };
};
