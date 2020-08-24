import { CONSTANTS } from ".";

export const addCard = (listID, text) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listID },
  };
};
export const deleteCard = (idCard, listID) => {
  return {
    type: CONSTANTS.DELETE_CARD,
    payload: { idCard, listID },
  };
};
export const editCard = (idCard, listID, newText) => {
  return {
    type: CONSTANTS.EDIT_CARD,
    payload: { idCard, listID, newText },
  };
};
